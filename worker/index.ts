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

type ReviewRequestInput = {
	role?: string;
	note?: string;
};

type ClassificationRequestInput = {
	role?: string;
	category?: string;
	priority?: string;
};

type AssignmentRequestInput = {
	role?: string;
	technicianId?: string;
	note?: string;
};

type TechnicianActionInput = {
	role?: string;
	technicianId?: string;
	note?: string;
};

type CommentInput = {
	role?: string;
	body?: string;
};

type ConfirmResolutionInput = {
	role?: string;
	confirmationNote?: string;
};

type CloseRequestInput = {
	role?: string;
	note?: string;
	manualOverride?: boolean;
	manualOverrideNote?: string | null;
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
const CATEGORIES = [
	"Internet",
	"AC",
	"Peralatan Kelas",
	"Kebersihan",
	"Lainnya",
] as const;

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

function forbidden() {
	return json(
		{
			error: {
				code: "FORBIDDEN",
				message: "Role aktif tidak boleh melakukan aksi ini.",
			},
		},
		403,
	);
}

function invalidStatusTransition(
	currentStatus: string,
	allowedStatuses: string[],
) {
	return json(
		{
			error: {
				code: "INVALID_STATUS_TRANSITION",
				message: `Status laporan tidak dapat diubah dari ${currentStatus}.`,
				currentStatus,
				allowedStatuses,
			},
		},
		409,
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
	reviewed_at?: string | null;
	reviewed_by_role?: string | null;
};

type RequestDetailRow = RequestSummaryRow & {
	description: string;
	created_at: string;
	updated_at: string;
};

type AssignmentRow = {
	id: string;
	request_id: string;
	technician_id: string;
	assigned_by_role: string;
	assigned_at: string;
	accepted_at: string | null;
	is_current: number;
};

type ReporterConfirmationRow = {
	id: string;
	request_id: string;
	confirmed_by_role: string;
	confirmation_note: string | null;
	confirmed_at: string;
};

type TechnicianTaskRow = RequestSummaryRow & {
	assignment_id: string;
	technician_id: string;
	technician_name: string;
	assigned_at: string;
	accepted_at: string | null;
};

type CountRow = {
	label: string;
	total: number;
};

type TechnicianWorkloadRow = {
	technician_id: string;
	technician_name: string;
	specialization: string | null;
	total_current_assignments: number;
	assigned_count: number;
	in_progress_count: number;
	resolved_count: number;
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
		reviewedAt: row.reviewed_at ?? null,
		reviewedByRole: row.reviewed_by_role ?? null,
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

function toApiAssignment(row: AssignmentRow) {
	return {
		id: row.id,
		requestId: row.request_id,
		technicianId: row.technician_id,
		assignedByRole: row.assigned_by_role,
		assignedAt: row.assigned_at,
		acceptedAt: row.accepted_at,
		isCurrent: row.is_current === 1,
	};
}

function toApiTechnicianTask(row: TechnicianTaskRow) {
	return {
		...toApiRequest(row),
		assignment: {
			id: row.assignment_id,
			technicianId: row.technician_id,
			technicianName: row.technician_name,
			assignedAt: row.assigned_at,
			acceptedAt: row.accepted_at,
		},
	};
}

function toCountMap(rows: CountRow[]) {
	return new Map(
		rows.map((row) => [row.label, Number(row.total)] as const),
	);
}

function toCountSeries(labels: readonly string[], rows: CountRow[]) {
	const counts = toCountMap(rows);

	return labels.map((label) => ({
		label,
		count: counts.get(label) ?? 0,
	}));
}

function toApiTechnicianWorkload(row: TechnicianWorkloadRow) {
	return {
		technicianId: row.technician_id,
		technicianName: row.technician_name,
		specialization: row.specialization,
		sourceData: {
			totalCurrentAssignments: Number(row.total_current_assignments),
			byActiveStatus: {
				assigned: Number(row.assigned_count),
				inProgress: Number(row.in_progress_count),
				resolved: Number(row.resolved_count),
			},
		},
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

function toApiComment(row: {
	id: string;
	request_id: string;
	author_role: string;
	body: string;
	visibility: string;
	created_at: string;
}) {
	return {
		id: row.id,
		requestId: row.request_id,
		authorRole: row.author_role,
		body: row.body,
		visibility: row.visibility,
		createdAt: row.created_at,
	};
}

function toApiReporterConfirmation(row: ReporterConfirmationRow) {
	return {
		id: row.id,
		requestId: row.request_id,
		confirmedByRole: row.confirmed_by_role,
		confirmationNote: row.confirmation_note,
		confirmedAt: row.confirmed_at,
	};
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const requestDetailMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)$/,
		);
		const requestReviewMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/review$/,
		);
		const requestClassificationMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/classification$/,
		);
		const requestAssignmentMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/assignment$/,
		);
		const technicianTasksMatch = url.pathname.match(
			/^\/api\/technicians\/([^/]+)\/tasks$/,
		);
		const requestAcceptMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/accept$/,
		);
		const requestProgressMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/progress$/,
		);
		const requestResolveMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/resolve$/,
		);
		const requestCommentsMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/comments$/,
		);
		const requestInternalNotesMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/internal-notes$/,
		);
		const requestConfirmResolutionMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/confirm-resolution$/,
		);
		const requestCloseMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/close$/,
		);
		const requestReopenMatch = url.pathname.match(
			/^\/api\/requests\/([^/]+)\/reopen$/,
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

		if (url.pathname === "/api/dashboard/summary" && request.method === "GET") {
			const role = url.searchParams.get("role")?.trim();

			if (role !== "FACILITY_MANAGER" && role !== "ADMINISTRATOR") {
				return forbidden();
			}

			const totalRow = (await env.DB.prepare(`
				SELECT COUNT(*) AS total
				FROM service_requests
			`).first()) as { total: number } | null;

			const statusResult = await env.DB.prepare(`
				SELECT status AS label, COUNT(*) AS total
				FROM service_requests
				GROUP BY status
			`).all();

			const priorityResult = await env.DB.prepare(`
				SELECT priority AS label, COUNT(*) AS total
				FROM service_requests
				GROUP BY priority
			`).all();

			const categoryResult = await env.DB.prepare(`
				SELECT category AS label, COUNT(*) AS total
				FROM service_requests
				GROUP BY category
			`).all();

			const workloadResult = await env.DB.prepare(`
				SELECT technicians.id AS technician_id,
					technicians.name AS technician_name,
					technicians.specialization,
					COUNT(service_requests.id) AS total_current_assignments,
					SUM(CASE WHEN service_requests.status = 'ASSIGNED' THEN 1 ELSE 0 END) AS assigned_count,
					SUM(CASE WHEN service_requests.status = 'IN_PROGRESS' THEN 1 ELSE 0 END) AS in_progress_count,
					SUM(CASE WHEN service_requests.status = 'RESOLVED' THEN 1 ELSE 0 END) AS resolved_count
				FROM technicians
				LEFT JOIN request_assignments
					ON request_assignments.technician_id = technicians.id
					AND request_assignments.is_current = 1
				LEFT JOIN service_requests
					ON service_requests.id = request_assignments.request_id
					AND service_requests.status IN ('ASSIGNED', 'IN_PROGRESS', 'RESOLVED')
				WHERE technicians.is_active = 1
				GROUP BY technicians.id, technicians.name, technicians.specialization
				ORDER BY technicians.name ASC
			`).all();

			return json({
				data: {
					totalRequests: Number(totalRow?.total ?? 0),
					byStatus: toCountSeries(
						STATUSES,
						statusResult.results as unknown as CountRow[],
					),
					byPriority: toCountSeries(
						PRIORITIES,
						priorityResult.results as unknown as CountRow[],
					),
					byCategory: toCountSeries(
						CATEGORIES,
						categoryResult.results as unknown as CountRow[],
					),
					technicianWorkload: workloadResult.results.map((row) =>
						toApiTechnicianWorkload(row as unknown as TechnicianWorkloadRow),
					),
					workloadBasis:
						"Source data: current assignments grouped by active request statuses; final workload formula remains OPEN-07.",
					openQuestions: ["OPEN-07", "OPEN-10"],
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
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
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
			const role = url.searchParams.get("role")?.trim() || null;

			if (role === "FACILITY_MANAGER") {
				return forbidden();
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, description, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role,
				created_at, updated_at
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

			const commentsResult = await env.DB.prepare(`
				SELECT id, request_id, author_role, body, visibility, created_at
				FROM request_comments
				WHERE request_id = ?
				ORDER BY created_at ASC
			`)
				.bind(requestId)
				.all();
			const internalNotesResult =
				role === "ADMINISTRATOR" || role === "TECHNICIAN"
					? await env.DB.prepare(`
						SELECT id, request_id, author_role, body, visibility, created_at
						FROM request_internal_notes
						WHERE request_id = ?
						ORDER BY created_at ASC
					`)
							.bind(requestId)
							.all()
					: null;
			const confirmationRow = (await env.DB.prepare(`
				SELECT id, request_id, confirmed_by_role, confirmation_note, confirmed_at
				FROM reporter_confirmations
				WHERE request_id = ?
				ORDER BY confirmed_at DESC
				LIMIT 1
			`)
				.bind(requestId)
				.first()) as ReporterConfirmationRow | null;

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
					comments: commentsResult.results.map((row) =>
						toApiComment(
							row as {
								id: string;
								request_id: string;
								author_role: string;
								body: string;
								visibility: string;
								created_at: string;
							},
						),
					),
					...(internalNotesResult
						? {
								internalNotes: internalNotesResult.results.map((row) =>
									toApiComment(
										row as {
											id: string;
											request_id: string;
											author_role: string;
											body: string;
											visibility: string;
											created_at: string;
										},
									),
								),
							}
						: {}),
					confirmation: confirmationRow
						? toApiReporterConfirmation(confirmationRow)
						: null,
				},
			});
		}

		if (url.pathname === "/api/technicians" && request.method === "GET") {
			const role = url.searchParams.get("role")?.trim();

			if (role !== "ADMINISTRATOR") {
				return forbidden();
			}

			const result = await env.DB.prepare(`
				SELECT id, name, specialization, is_active
				FROM technicians
				WHERE is_active = 1
				ORDER BY name ASC
			`).all();

			return json({
				data: result.results.map((row) => {
					const technician = row as {
						id: string;
						name: string;
						specialization: string | null;
						is_active: number;
					};

					return {
						id: technician.id,
						name: technician.name,
						specialization: technician.specialization,
						isActive: technician.is_active === 1,
					};
				}),
			});
		}

		if (technicianTasksMatch && request.method === "GET") {
			const technicianId = decodeURIComponent(technicianTasksMatch[1]);
			const role = url.searchParams.get("role")?.trim();
			const activeTechnicianId = url.searchParams.get("technicianId")?.trim();
			const status = url.searchParams.get("status")?.trim() || null;
			const fields: Record<string, string> = {};

			if (role !== "TECHNICIAN" && role !== "ADMINISTRATOR") {
				return forbidden();
			}

			if (role === "TECHNICIAN" && activeTechnicianId !== technicianId) {
				return forbidden();
			}

			if (status && !STATUSES.includes(status as (typeof STATUSES)[number])) {
				fields.status = "Status filter tidak didukung.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const technician = await env.DB.prepare(`
				SELECT id, name, specialization, is_active
				FROM technicians
				WHERE id = ? AND is_active = 1
			`)
				.bind(technicianId)
				.first();

			if (!technician) {
				return json(
					{
						error: {
							code: "NOT_FOUND",
							message: "Teknisi tidak ditemukan.",
						},
					},
					404,
				);
			}

			const result = await env.DB.prepare(`
				SELECT service_requests.id, service_requests.request_number,
					service_requests.title, service_requests.location,
					service_requests.category, service_requests.priority,
					service_requests.priority_suggestion, service_requests.status,
					service_requests.reporter_name, service_requests.reporter_type,
					service_requests.reviewed_at, service_requests.reviewed_by_role,
					request_assignments.id AS assignment_id,
					request_assignments.technician_id,
					technicians.name AS technician_name,
					request_assignments.assigned_at,
					request_assignments.accepted_at
				FROM request_assignments
				INNER JOIN service_requests
					ON service_requests.id = request_assignments.request_id
				INNER JOIN technicians
					ON technicians.id = request_assignments.technician_id
				WHERE request_assignments.technician_id = ?
					AND request_assignments.is_current = 1
					AND (? IS NULL OR service_requests.status = ?)
				ORDER BY service_requests.updated_at DESC
			`)
				.bind(technicianId, status, status)
				.all();

			const data = result.results.map((row) =>
				toApiTechnicianTask(row as TechnicianTaskRow),
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

		if (requestReviewMatch && request.method === "PATCH") {
			const requestId = decodeURIComponent(requestReviewMatch[1]);
			const input = (await request.json()) as ReviewRequestInput;

			if (input.role !== "ADMINISTRATOR") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.note)) {
				fields.note = "Catatan review wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== "SUBMITTED") {
				return invalidStatusTransition(storedRequest.status, ["UNDER_REVIEW"]);
			}

			const now = new Date().toISOString();
			const historyId = crypto.randomUUID();

			await env.DB.prepare(`
				UPDATE service_requests
				SET status = 'UNDER_REVIEW',
					reviewed_at = ?,
					reviewed_by_role = 'ADMINISTRATOR',
					updated_at = ?
				WHERE id = ?
			`)
				.bind(now, now, requestId)
				.run();

			await env.DB.prepare(`
				INSERT INTO request_status_history
				(id, request_id, from_status, to_status, changed_by_role, note, created_at)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`)
				.bind(
					historyId,
					requestId,
					"SUBMITTED",
					"UNDER_REVIEW",
					"ADMINISTRATOR",
					input.note!.trim(),
					now,
				)
				.run();

			return json({
				data: toApiRequest({
					...storedRequest,
					status: "UNDER_REVIEW",
					reviewed_at: now,
					reviewed_by_role: "ADMINISTRATOR",
				}),
			});
		}

		if (requestClassificationMatch && request.method === "PATCH") {
			const requestId = decodeURIComponent(requestClassificationMatch[1]);
			const input = (await request.json()) as ClassificationRequestInput;

			if (input.role !== "ADMINISTRATOR") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!CATEGORIES.includes(input.category as (typeof CATEGORIES)[number])) {
				fields.category = "Kategori harus memakai daftar tetap yang tersedia.";
			}

			if (!PRIORITIES.includes(input.priority as (typeof PRIORITIES)[number])) {
				fields.priority = "Prioritas harus LOW, MEDIUM, HIGH, atau URGENT.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== "UNDER_REVIEW") {
				return invalidStatusTransition(storedRequest.status, ["UNDER_REVIEW"]);
			}

			const now = new Date().toISOString();
			const category = input.category!.trim();
			const priority = input.priority!;

			await env.DB.prepare(`
				UPDATE service_requests
				SET category = ?,
					priority = ?,
					updated_at = ?
				WHERE id = ?
			`)
				.bind(category, priority, now, requestId)
				.run();

			return json({
				data: toApiRequest({
					...storedRequest,
					category,
					priority,
				}),
			});
		}

		if (requestAssignmentMatch && request.method === "PATCH") {
			const requestId = decodeURIComponent(requestAssignmentMatch[1]);
			const input = (await request.json()) as AssignmentRequestInput;

			if (input.role !== "ADMINISTRATOR") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.technicianId)) {
				fields.technicianId = "Teknisi wajib dipilih.";
			}

			if (!requiredText(input.note)) {
				fields.note = "Catatan assignment wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== "UNDER_REVIEW") {
				return invalidStatusTransition(storedRequest.status, ["ASSIGNED"]);
			}

			const technician = (await env.DB.prepare(`
				SELECT id, name, specialization, is_active
				FROM technicians
				WHERE id = ? AND is_active = 1
			`)
				.bind(input.technicianId!.trim())
				.first()) as
				| {
						id: string;
						name: string;
						specialization: string | null;
						is_active: number;
				  }
				| null;

			if (!technician) {
				return validationError({
					technicianId: "Teknisi aktif tidak ditemukan.",
				});
			}

			const assignmentId = crypto.randomUUID();
			const historyId = crypto.randomUUID();
			const now = new Date().toISOString();

			await env.DB.prepare(`
				UPDATE request_assignments
				SET is_current = 0
				WHERE request_id = ? AND is_current = 1
			`)
				.bind(requestId)
				.run();

			await env.DB.prepare(`
				INSERT INTO request_assignments
				(id, request_id, technician_id, assigned_by_role, assigned_at, is_current)
				VALUES (?, ?, ?, 'ADMINISTRATOR', ?, 1)
			`)
				.bind(assignmentId, requestId, technician.id, now)
				.run();

			await env.DB.prepare(`
				UPDATE service_requests
				SET status = 'ASSIGNED',
					updated_at = ?
				WHERE id = ?
			`)
				.bind(now, requestId)
				.run();

			await env.DB.prepare(`
				INSERT INTO request_status_history
				(id, request_id, from_status, to_status, changed_by_role, note, created_at)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`)
				.bind(
					historyId,
					requestId,
					"UNDER_REVIEW",
					"ASSIGNED",
					"ADMINISTRATOR",
					input.note!.trim(),
					now,
				)
				.run();

			return json({
				data: {
					...toApiRequest({
						...storedRequest,
						status: "ASSIGNED",
					}),
					assignment: {
						id: assignmentId,
						technicianId: technician.id,
						technicianName: technician.name,
						assignedByRole: "ADMINISTRATOR",
						assignedAt: now,
					},
				},
			});
		}

		if (requestAcceptMatch && request.method === "PATCH") {
			const requestId = decodeURIComponent(requestAcceptMatch[1]);
			const input = (await request.json()) as TechnicianActionInput;

			if (input.role !== "TECHNICIAN") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.technicianId)) {
				fields.technicianId = "Konteks Teknisi wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== "ASSIGNED") {
				return invalidStatusTransition(storedRequest.status, ["ASSIGNED"]);
			}

			const assignment = (await env.DB.prepare(`
				SELECT id, request_id, technician_id, assigned_by_role,
					assigned_at, accepted_at, is_current
				FROM request_assignments
				WHERE request_id = ?
					AND technician_id = ?
					AND is_current = 1
			`)
				.bind(requestId, input.technicianId!.trim())
				.first()) as AssignmentRow | null;

			if (!assignment) {
				return forbidden();
			}

			const now = new Date().toISOString();

			await env.DB.prepare(`
				UPDATE request_assignments
				SET accepted_at = ?
				WHERE request_id = ?
					AND technician_id = ?
					AND is_current = 1
			`)
				.bind(now, requestId, input.technicianId!.trim())
				.run();

			return json({
				data: {
					...toApiAssignment({
						...assignment,
						accepted_at: now,
					}),
					requestStatus: storedRequest.status,
				},
			});
		}

		if (
			(requestProgressMatch || requestResolveMatch) &&
			request.method === "PATCH"
		) {
			const requestId = decodeURIComponent(
				(requestProgressMatch ?? requestResolveMatch)![1],
			);
			const input = (await request.json()) as TechnicianActionInput;
			const isProgress = Boolean(requestProgressMatch);
			const fromStatus = isProgress ? "ASSIGNED" : "IN_PROGRESS";
			const toStatus = isProgress ? "IN_PROGRESS" : "RESOLVED";

			if (input.role !== "TECHNICIAN") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.technicianId)) {
				fields.technicianId = "Konteks Teknisi wajib diisi.";
			}

			if (!requiredText(input.note)) {
				fields.note = isProgress
					? "Catatan progres wajib diisi."
					: "Catatan penyelesaian wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== fromStatus) {
				return invalidStatusTransition(storedRequest.status, [toStatus]);
			}

			const assignment = await env.DB.prepare(`
				SELECT id, request_id, technician_id, assigned_by_role,
					assigned_at, accepted_at, is_current
				FROM request_assignments
				WHERE request_id = ?
					AND technician_id = ?
					AND is_current = 1
			`)
				.bind(requestId, input.technicianId!.trim())
				.first();

			if (!assignment) {
				return forbidden();
			}

			const historyId = crypto.randomUUID();
			const now = new Date().toISOString();

			await env.DB.prepare(`
				UPDATE service_requests
				SET status = '${toStatus}',
					updated_at = ?
				WHERE id = ?
			`)
				.bind(now, requestId)
				.run();

			await env.DB.prepare(`
				INSERT INTO request_status_history
				(id, request_id, from_status, to_status, changed_by_role, note, created_at)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`)
				.bind(
					historyId,
					requestId,
					fromStatus,
					toStatus,
					"TECHNICIAN",
					input.note!.trim(),
					now,
				)
				.run();

			return json({
				data: toApiRequest({
					...storedRequest,
					status: toStatus,
				}),
			});
		}

		if (requestCommentsMatch && request.method === "POST") {
			const requestId = decodeURIComponent(requestCommentsMatch[1]);
			const input = (await request.json()) as CommentInput;

			if (
				input.role !== "REPORTER" &&
				input.role !== "ADMINISTRATOR" &&
				input.role !== "TECHNICIAN"
			) {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.body)) {
				fields.body = "Komentar publik wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const id = crypto.randomUUID();
			const now = new Date().toISOString();
			const body = input.body!.trim();

			await env.DB.prepare(`
				INSERT INTO request_comments
				(id, request_id, author_role, body, visibility, created_at)
				VALUES (?, ?, ?, ?, 'PUBLIC', ?)
			`)
				.bind(id, requestId, input.role, body, now)
				.run();

			return json(
				{
					data: {
						id,
						requestId,
						authorRole: input.role,
						body,
						visibility: "PUBLIC",
						createdAt: now,
					},
				},
				201,
			);
		}

		if (requestInternalNotesMatch && request.method === "POST") {
			const requestId = decodeURIComponent(requestInternalNotesMatch[1]);
			const input = (await request.json()) as CommentInput;

			if (input.role !== "ADMINISTRATOR" && input.role !== "TECHNICIAN") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.body)) {
				fields.body = "Catatan internal wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const id = crypto.randomUUID();
			const now = new Date().toISOString();
			const body = input.body!.trim();

			await env.DB.prepare(`
				INSERT INTO request_internal_notes
				(id, request_id, author_role, body, visibility, created_at)
				VALUES (?, ?, ?, ?, 'INTERNAL', ?)
			`)
				.bind(id, requestId, input.role, body, now)
				.run();

			return json(
				{
					data: {
						id,
						requestId,
						authorRole: input.role,
						body,
						visibility: "INTERNAL",
						createdAt: now,
					},
				},
				201,
			);
		}

		if (requestConfirmResolutionMatch && request.method === "PATCH") {
			const requestId = decodeURIComponent(requestConfirmResolutionMatch[1]);
			const input = (await request.json()) as ConfirmResolutionInput;

			if (input.role !== "REPORTER") {
				return forbidden();
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== "RESOLVED") {
				return invalidStatusTransition(storedRequest.status, ["RESOLVED"]);
			}

			const id = crypto.randomUUID();
			const now = new Date().toISOString();
			const confirmationNote = requiredText(input.confirmationNote)
				? input.confirmationNote!.trim()
				: null;

			await env.DB.prepare(`
				INSERT INTO reporter_confirmations
				(id, request_id, confirmed_by_role, confirmation_note, confirmed_at)
				VALUES (?, ?, 'REPORTER', ?, ?)
			`)
				.bind(id, requestId, confirmationNote, now)
				.run();

			return json({
				data: {
					id,
					requestId,
					confirmedByRole: "REPORTER",
					confirmationNote,
					confirmedAt: now,
				},
			});
		}

		if (requestCloseMatch && request.method === "PATCH") {
			const requestId = decodeURIComponent(requestCloseMatch[1]);
			const input = (await request.json()) as CloseRequestInput;

			if (input.role !== "ADMINISTRATOR") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.note)) {
				fields.note = "Catatan close wajib diisi.";
			}

			if (input.manualOverride === true && !requiredText(input.manualOverrideNote)) {
				fields.manualOverrideNote = "Catatan manual override wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== "RESOLVED") {
				return invalidStatusTransition(storedRequest.status, ["RESOLVED"]);
			}

			const confirmationRow = await env.DB.prepare(`
				SELECT id
				FROM reporter_confirmations
				WHERE request_id = ?
				ORDER BY confirmed_at DESC
				LIMIT 1
			`)
				.bind(requestId)
				.first();

			if (!confirmationRow && input.manualOverride !== true) {
				return validationError({
					manualOverride:
						"Close tanpa konfirmasi Pelapor membutuhkan manualOverride true.",
					manualOverrideNote:
						"Close tanpa konfirmasi Pelapor membutuhkan catatan manual override.",
				});
			}

			const historyId = crypto.randomUUID();
			const now = new Date().toISOString();
			const manualOverrideUsed = input.manualOverride === true ? 1 : 0;
			const manualOverrideNote =
				manualOverrideUsed === 1 ? input.manualOverrideNote!.trim() : null;

			await env.DB.prepare(`
				UPDATE service_requests
				SET status = 'CLOSED',
					closed_at = ?,
					closed_by_role = 'ADMINISTRATOR',
					manual_override_used = ?,
					manual_override_note = ?,
					updated_at = ?
				WHERE id = ?
			`)
				.bind(
					now,
					manualOverrideUsed,
					manualOverrideNote,
					now,
					requestId,
				)
				.run();

			await env.DB.prepare(`
				INSERT INTO request_status_history
				(id, request_id, from_status, to_status, changed_by_role, note, created_at)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`)
				.bind(
					historyId,
					requestId,
					"RESOLVED",
					"CLOSED",
					"ADMINISTRATOR",
					input.note!.trim(),
					now,
				)
				.run();

			return json({
				data: toApiRequest({
					...storedRequest,
					status: "CLOSED",
				}),
			});
		}

		if (requestReopenMatch && request.method === "PATCH") {
			const requestId = decodeURIComponent(requestReopenMatch[1]);
			const input = (await request.json()) as ReviewRequestInput;

			if (input.role !== "ADMINISTRATOR") {
				return forbidden();
			}

			const fields: Record<string, string> = {};

			if (!requiredText(input.note)) {
				fields.note = "Catatan reopen wajib diisi.";
			}

			if (Object.keys(fields).length > 0) {
				return validationError(fields);
			}

			const requestRow = await env.DB.prepare(`
				SELECT id, request_number, title, location,
				category, priority, priority_suggestion, status,
				reporter_name, reporter_type, reviewed_at, reviewed_by_role
				FROM service_requests
				WHERE id = ?
			`)
				.bind(requestId)
				.first();

			if (!requestRow) {
				return notFound();
			}

			const storedRequest = requestRow as RequestSummaryRow;

			if (storedRequest.status !== "CLOSED") {
				return invalidStatusTransition(storedRequest.status, ["CLOSED"]);
			}

			const historyId = crypto.randomUUID();
			const now = new Date().toISOString();

			await env.DB.prepare(`
				UPDATE service_requests
				SET status = 'UNDER_REVIEW',
					updated_at = ?
				WHERE id = ?
			`)
				.bind(now, requestId)
				.run();

			await env.DB.prepare(`
				INSERT INTO request_status_history
				(id, request_id, from_status, to_status, changed_by_role, note, created_at)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`)
				.bind(
					historyId,
					requestId,
					"CLOSED",
					"UNDER_REVIEW",
					"ADMINISTRATOR",
					input.note!.trim(),
					now,
				)
				.run();

			return json({
				data: toApiRequest({
					...storedRequest,
					status: "UNDER_REVIEW",
				}),
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
