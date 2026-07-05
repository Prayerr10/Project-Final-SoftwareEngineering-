import worker from "../../worker";
import {
	type AppRole,
	type AuthenticatedUser,
	type DbRole,
	createSessionCookie,
	createSessionToken,
} from "../../worker/auth";

const TEST_AUTH_SECRET = "test-only-secret-for-vitest-session-signing";

const appToDbRole: Record<AppRole, DbRole> = {
	REPORTER: "pelapor",
	ADMINISTRATOR: "administrator",
	TECHNICIAN: "teknisi",
	FACILITY_MANAGER: "manajer_fasilitas",
};

const displayNameByRole: Record<AppRole, string> = {
	REPORTER: "Pelapor Test",
	ADMINISTRATOR: "Administrator Test",
	TECHNICIAN: "Teknisi Test",
	FACILITY_MANAGER: "Manajer Fasilitas Test",
};

function appRoleFromRaw(role: unknown): AppRole | null {
	if (
		role === "REPORTER" ||
		role === "ADMINISTRATOR" ||
		role === "TECHNICIAN" ||
		role === "FACILITY_MANAGER"
	) {
		return role;
	}

	return null;
}

async function readJsonBody(request: Request) {
	if (request.method === "GET" || request.method === "HEAD") {
		return null;
	}

	const contentType = request.headers.get("Content-Type") ?? "";

	if (!contentType.includes("application/json")) {
		return null;
	}

	try {
		return (await request.clone().json()) as Record<string, unknown>;
	} catch {
		return null;
	}
}

async function inferRole(request: Request) {
	const url = new URL(request.url);
	const queryRole = appRoleFromRaw(url.searchParams.get("role"));

	if (queryRole) {
		return queryRole;
	}

	const body = await readJsonBody(request);
	const bodyRole = appRoleFromRaw(body?.role);

	return bodyRole ?? "REPORTER";
}

async function inferTechnicianId(request: Request) {
	const url = new URL(request.url);
	const queryTechnicianId = url.searchParams.get("technicianId");

	if (queryTechnicianId) {
		return queryTechnicianId;
	}

	const taskMatch = url.pathname.match(/^\/api\/technicians\/([^/]+)\/tasks$/);

	if (taskMatch) {
		return decodeURIComponent(taskMatch[1]);
	}

	const body = await readJsonBody(request);

	if (typeof body?.technicianId === "string" && body.technicianId.trim()) {
		return body.technicianId.trim();
	}

	return "tech-1";
}

async function withSession(request: Request, role: AppRole) {
	const technicianId =
		role === "TECHNICIAN" ? await inferTechnicianId(request) : null;
	const user: AuthenticatedUser = {
		id: technicianId ?? `test-${appToDbRole[role]}`,
		username: `${appToDbRole[role]}_test`,
		role: appToDbRole[role],
		appRole: role,
		displayName: displayNameByRole[role],
		technicianId,
	};
	const token = await createSessionToken(user, TEST_AUTH_SECRET);
	const headers = new Headers(request.headers);
	headers.set("Cookie", createSessionCookie(token, request.url));

	return new Request(request, { headers });
}

export async function fetchWithSession(
	request: Request,
	env: Env,
	role?: AppRole,
) {
	const resolvedRole = role ?? (await inferRole(request));

	return worker.fetch(await withSession(request, resolvedRole), {
		...env,
		AUTH_SECRET: TEST_AUTH_SECRET,
	});
}

export function testAuthEnv(env: Env) {
	return {
		...env,
		AUTH_SECRET: TEST_AUTH_SECRET,
	};
}
