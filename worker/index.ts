interface Env {
	DB: D1Database;
}

type CreateRequestInput = {
	role?: string;
	title?: string;
	description?: string;
	location?: string;
	category?: string;
	reporterName?: string;
	reporterType?: string;
};

const STATUSES = [
	"SUBMITTED",
	"UNDER_REVIEW",
	"ASSIGNED",
	"IN_PROGRESS",
	"RESOLVED",
	"CLOSED",
] as const;

const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

function json(data: unknown, status = 200) {
	return Response.json(data, { status });
}

function validationError(fields: Record<string, string>) {
	return json(
		{
			error: {
				code: "VALIDATION_ERROR",
				message: "Input tidak valid.",
				fields,
			},
		},
		422,
	);
}

function notFound() {
	return json(
		{
			error: {
				code: "NOT_FOUND",
				message: "Laporan tidak ditemukan.",
			},
		},
		404,
	);
}

function requiredText(value: unknown) {
	return typeof value === "string" && value.trim().length > 0;
}

type RequestSummaryRow = {
	id: string;
	request_number: string;
	title: string;
	location: string;
	category: string;
	priority: string;
	priority_suggestion: string | null;
	status: string;
	reporter_name: string;
	reporter_type: string;
};

type RequestDetailRow = RequestSummaryRow & {
	description: string;
	created_at: string;
	updated_at: string;
};

function toApiRequest(row: RequestSummaryRow) {
	return {
		id: row.id,
		requestNumber: row.request_number,
		title: row.title,
		location: row.location,
		category: row.category,
		priority: row.priority,
		prioritySuggestion: row.priority_suggestion,
		status: row.status,
		reporterName: row.reporter_name,
		reporterType: row.reporter_type,
	};
}

function toApiRequestDetail(row: RequestDetailRow) {
	return {
		...toApiRequest(row),
		description: row.description,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

function toApiStatusHistory(row: {
	id: string;
	from_status: string | null;
	to_status: string;
	changed_by_role: string;
	note: string;
	created_at: string;
}) {
	return {
		id: row.id,
		fromStatus: row.from_status,
		toStatus: row.to_status,
		changedByRole: row.changed_by_role,
		note: row.note,
		createdAt: row.created_at,
	};
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const requestDetailMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)$/,
		);

		if (url.pathname === "/api/health" && request.method === "GET") {
			await env.DB.prepare("SELECT 1 AS ready").first();

			return json({
				status: "healthy",
				service: "campus-maintenance",
				checks: {
					api: "ok",
					d1: "ok",
				},
			});
		}

		if (url.pathname === "/api/requests" && request.method === "GET") {
			const search = url.searchParams.get("search")?.trim() || null;
			const status = url.searchParams.get("status")?.trim() || null;
			const priority = url.searchParams.get("priority")?.trim() || null;
			const fields: Record<string, string> = {};

			if (status && !STATUSES.includes(status as (typeof STATUSES)[number])) {
				fields.status = "Status filter tidak didukung.";
			}

			if (
				priority &&
				!PRIORITIES.includes(priority as (typeof PRIORITIES)[number])
			) {
				fields.priority = "Priority filter tidak didukung.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const result = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type
				FROM service_requests
				WHERE (
					? IS NULL
					OR LOWER(request_number) LIKE '%' || LOWER(?) || '%'
					OR LOWER(title) LIKE '%' || LOWER(?) || '%'
					OR LOWER(location) LIKE '%' || LOWER(?) || '%'
					OR LOWER(category) LIKE '%' || LOWER(?) || '%'
					OR LOWER(reporter_name) LIKE '%' || LOWER(?) || '%'
				)
				AND (? IS NULL OR status = ?)
				AND (? IS NULL OR priority = ?)
				ORDER BY created_at DESC
			`)
				.bind(
					search,
					search,
					search,
					search,
					search,
					search,
					status,
					status,
					priority,
					priority,
				)
				.all();

			const data = result.results.map((row) =>
				toApiRequest(row as RequestSummaryRow),
			);

			return json({
				data,
				meta: {
					page: 1,
					pageSize: 20,
					total: data.length,
					empty: data.length === 0,
				},
			});
		}

		if (requestDetailMatch && request.method === "GET") {
			const requestId = decodeURIComponent(requestDetailMatch[1]);
			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, description, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, created_at, updated_at
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const historyResult = await env.DB.prepare(`
				SELECT id, from_status, to_status, changed_by_role, note, created_at
				FROM request_status_history
				WHERE request_id = ?
				ORDER BY created_at ASC
			`)
				.bind(requestId)
				.all();

			return json({
				data: {
					...toApiRequestDetail(requestRow as RequestDetailRow),
					statusHistory: historyResult.results.map((row) =>
						toApiStatusHistory(
							row as {
								id: string;
								from_status: string | null;
								to_status: string;
								changed_by_role: string;
								note: string;
								created_at: string;
							},
						),
					),
				},
			});
		}

		if (url.pathname === "/api/requests" && request.method === "POST") {
			const input = (await request.json()) as CreateRequestInput;
			const fields: Record<string, string> = {};

			if (input.role !== "REPORTER") {
				fields.role = "Role REPORTER wajib digunakan untuk membuat laporan.";
			}

			if (!requiredText(input.reporterName)) {
				fields.reporterName = "Nama pelapor wajib diisi.";
			}

			if (!["STUDENT", "LECTURER"].includes(input.reporterType ?? "")) {
				fields.reporterType = "Tipe pelapor harus STUDENT atau LECTURER.";
			}

			if (!requiredText(input.title)) {
				fields.title = "Judul wajib diisi.";
			}

			if (!requiredText(input.description)) {
				fields.description = "Deskripsi wajib diisi.";
			}

			if (!requiredText(input.location)) {
				fields.location = "Lokasi wajib diisi.";
			}

			if (!requiredText(input.category)) {
				fields.category = "Kategori wajib diisi.";
			}

			if (requiredText(input.description) && input.description!.trim().length < 20) {
				fields.description = "Deskripsi minimal 20 karakter.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const id = crypto.randomUUID();
			const historyId = crypto.randomUUID();
			const requestNumber = `CSR-${Date.now()}`;
			const now = new Date().toISOString();
			const priority = "MEDIUM";
			const prioritySuggestion =
				input.reporterType === "LECTURER" ? "HIGH" : null;
			const status = "SUBMITTED";
			const reporterName = input.reporterName!.trim();
			const reporterType = input.reporterType!;
			const title = input.title!.trim();
			const description = input.description!.trim();
			const location = input.location!.trim();
			const category = input.category!.trim();

			await env.DB.prepare(`
				INSERT INTO service_requests
				(id, request_number, title, description,
				location, category, priority, priority_suggestion, status,
				reporter_name, reporter_type, created_at, updated_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			`)
				.bind(
					id,
					requestNumber,
					title,
					description,
					location,
					category,
					priority,
					prioritySuggestion,
					status,
					reporterName,
					reporterType,
					now,
					now,
				)
				.run();

			await env.DB.prepare(`
				INSERT INTO request_status_history
				(id, request_id, from_status, to_status, changed_by_role, note, created_at)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`)
				.bind(
					historyId,
					id,
					null,
					status,
					"REPORTER",
					"Laporan dibuat oleh Pelapor.",
					now,
				)
				.run();

			return json(
				{
					data: {
						id,
						requestNumber,
						title,
						location,
						category,
						priority,
						prioritySuggestion,
						status,
						reporterName,
						reporterType,
					},
				},
				201,
			);
		}

		return json({ error: "Alamat API tidak ditemukan." }, 404);
	},
} satisfies ExportedHandler<Env>;
