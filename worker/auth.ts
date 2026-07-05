export const AUTH_COOKIE_NAME = "csr_session";
export const PASSWORD_HASH_ALGORITHM = "PBKDF2-SHA256";
// Cloudflare Workers WebCrypto currently supports PBKDF2 up to 100,000 iterations.
export const PASSWORD_HASH_ITERATIONS = 100_000;
export const PASSWORD_HASH_LENGTH_BITS = 256;
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

export type DbRole =
	| "pelapor"
	| "administrator"
	| "teknisi"
	| "manajer_fasilitas";

export type AppRole =
	| "REPORTER"
	| "ADMINISTRATOR"
	| "TECHNICIAN"
	| "FACILITY_MANAGER";

export type AuthenticatedUser = {
	id: string;
	username: string;
	role: DbRole;
	appRole: AppRole;
	displayName: string;
	technicianId: string | null;
};

type SessionPayload = {
	sub: string;
	username: string;
	role: DbRole;
	displayName: string;
	exp: number;
};

const roleMap: Record<DbRole, AppRole> = {
	pelapor: "REPORTER",
	administrator: "ADMINISTRATOR",
	teknisi: "TECHNICIAN",
	manajer_fasilitas: "FACILITY_MANAGER",
};

const textEncoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array) {
	let binary = "";

	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}

	return btoa(binary)
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
	const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
	const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
	const binary = atob(padded);
	const bytes = new Uint8Array(binary.length);

	for (let index = 0; index < binary.length; index += 1) {
		bytes[index] = binary.charCodeAt(index);
	}

	return bytes;
}

function encodeJson(value: unknown) {
	return bytesToBase64Url(textEncoder.encode(JSON.stringify(value)));
}

function decodeJson<T>(value: string): T {
	return JSON.parse(new TextDecoder().decode(base64UrlToBytes(value))) as T;
}

function timingSafeEqual(left: string, right: string) {
	const leftBytes = textEncoder.encode(left);
	const rightBytes = textEncoder.encode(right);
	let diff = leftBytes.length ^ rightBytes.length;
	const length = Math.max(leftBytes.length, rightBytes.length);

	for (let index = 0; index < length; index += 1) {
		diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
	}

	return diff === 0;
}

async function importPasswordKey(password: string) {
	return crypto.subtle.importKey(
		"raw",
		textEncoder.encode(password),
		"PBKDF2",
		false,
		["deriveBits"],
	);
}

async function importHmacKey(secret: string) {
	return crypto.subtle.importKey(
		"raw",
		textEncoder.encode(secret),
		{
			name: "HMAC",
			hash: "SHA-256",
		},
		false,
		["sign"],
	);
}

async function signPayload(payload: string, secret: string) {
	const key = await importHmacKey(secret);
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		textEncoder.encode(payload),
	);

	return bytesToBase64Url(new Uint8Array(signature));
}

export function toAppRole(role: DbRole): AppRole {
	return roleMap[role];
}

export function toPublicUser(user: {
	id: string;
	username: string;
	role: DbRole;
	displayName: string;
}): AuthenticatedUser {
	const appRole = toAppRole(user.role);

	return {
		id: user.id,
		username: user.username,
		role: user.role,
		appRole,
		displayName: user.displayName,
		technicianId: appRole === "TECHNICIAN" ? user.id : null,
	};
}

export function generateSalt() {
	const salt = new Uint8Array(16);
	crypto.getRandomValues(salt);

	return bytesToBase64Url(salt);
}

export async function hashPassword(password: string, salt: string) {
	const key = await importPasswordKey(password);
	const bits = await crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			hash: "SHA-256",
			salt: textEncoder.encode(salt),
			iterations: PASSWORD_HASH_ITERATIONS,
		},
		key,
		PASSWORD_HASH_LENGTH_BITS,
	);

	return bytesToBase64Url(new Uint8Array(bits));
}

export async function verifyPassword(
	password: string,
	salt: string,
	expectedHash: string,
) {
	const actualHash = await hashPassword(password, salt);

	return timingSafeEqual(actualHash, expectedHash);
}

export async function createSessionToken(
	user: AuthenticatedUser,
	secret: string,
	now = Date.now(),
) {
	const payload: SessionPayload = {
		sub: user.id,
		username: user.username,
		role: user.role,
		displayName: user.displayName,
		exp: Math.floor(now / 1000) + SESSION_TTL_SECONDS,
	};
	const encodedPayload = encodeJson(payload);
	const signature = await signPayload(encodedPayload, secret);

	return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(
	token: string,
	secret: string,
	now = Date.now(),
): Promise<AuthenticatedUser | null> {
	const [encodedPayload, signature, extra] = token.split(".");

	if (!encodedPayload || !signature || extra !== undefined) {
		return null;
	}

	const expectedSignature = await signPayload(encodedPayload, secret);

	if (!timingSafeEqual(signature, expectedSignature)) {
		return null;
	}

	try {
		const payload = decodeJson<SessionPayload>(encodedPayload);

		if (!Object.hasOwn(roleMap, payload.role)) {
			return null;
		}

		if (payload.exp <= Math.floor(now / 1000)) {
			return null;
		}

		return toPublicUser({
			id: payload.sub,
			username: payload.username,
			role: payload.role,
			displayName: payload.displayName,
		});
	} catch {
		return null;
	}
}

export function readCookie(header: string | null, name: string) {
	if (!header) {
		return null;
	}

	for (const part of header.split(";")) {
		const [cookieName, ...cookieValueParts] = part.trim().split("=");

		if (cookieName === name) {
			return cookieValueParts.join("=");
		}
	}

	return null;
}

export function createSessionCookie(token: string, requestUrl: string) {
	const url = new URL(requestUrl);
	const secure = url.protocol === "https:" ? "; Secure" : "";

	return `${AUTH_COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}${secure}`;
}

export function expireSessionCookie(requestUrl: string) {
	const url = new URL(requestUrl);
	const secure = url.protocol === "https:" ? "; Secure" : "";

	return `${AUTH_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`;
}
