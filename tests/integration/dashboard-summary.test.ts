import { describe, expect, it } from "vitest";
import { fetchWithSession } from "../helpers/auth";

type StoredRequest = {
	id: string;
	category: string;
	priority: string;
	status: string;
};

type StoredTechnician = {
	id: string;
	name: string;
	specialization: string | null;
	is_active: number;
};

type StoredAssignment = {
	request_id: string;
	technician_id: string;
	is_current: number;
};

class FakeDashboardD1Database {
	constructor(
		private readonly requests: StoredRequest[] = [],
		private readonly technicians: StoredTechnician[] = [],
		private readonly assignments: StoredAssignment[] = [],
		private readonly internalNotes: string[] = [],
	) {}

	prepare(sql: string) {
		const database = this;

		const statement = {
			async first() {
				if (sql.includes("COUNT(*) AS total") && sql.includes("FROM service_requests")) {
					return { total: database.requests.length };
				}

				return null;
			},
			async all() {
				if (sql.includes("GROUP BY status")) {
					return {
						results: groupCounts(database.requests, "status"),
					};
				}

				if (sql.includes("GROUP BY priority")) {
					return {
						results: groupCounts(database.requests, "priority"),
					};
				}

				if (sql.includes("GROUP BY category")) {
					return {
						results: groupCounts(database.requests, "category"),
					};
				}

				if (sql.includes("FROM technicians") && sql.includes("request_assignments")) {
					return {
						results: database.technicians
							.filter((technician) => technician.is_active === 1)
							.sort((left, right) => left.name.localeCompare(right.name))
							.map((technician) => {
								const assignedRequests = database.assignments
									.filter(
										(assignment) =>
											assignment.technician_id === technician.id &&
											assignment.is_current === 1,
									)
									.map((assignment) =>
										database.requests.find(
											(request) => request.id === assignment.request_id,
										),
									)
									.filter(
										(request): request is StoredRequest =>
											Boolean(request) &&
											["ASSIGNED", "IN_PROGRESS", "RESOLVED"].includes(
												request.status,
											),
									);

								return {
									technician_id: technician.id,
									technician_name: technician.name,
									specialization: technician.specialization,
									total_current_assignments: assignedRequests.length,
									assigned_count: assignedRequests.filter(
										(request) => request.status === "ASSIGNED",
									).length,
									in_progress_count: assignedRequests.filter(
										(request) => request.status === "IN_PROGRESS",
									).length,
									resolved_count: assignedRequests.filter(
										(request) => request.status === "RESOLVED",
									).length,
								};
							}),
					};
				}

				if (sql.includes("request_internal_notes")) {
					return {
						results: database.internalNotes.map((body) => ({ body })),
					};
				}

				return { results: [] };
			},
			bind() {
				return statement;
			},
		};

		return statement;
	}
}

function groupCounts(
	requests: StoredRequest[],
	key: "status" | "priority" | "category",
) {
	const counts = new Map<string, number>();

	for (const request of requests) {
		counts.set(request[key], (counts.get(request[key]) ?? 0) + 1);
	}

	return Array.from(counts, ([label, total]) => ({ label, total }));
}

function requestFixture(overrides: Partial<StoredRequest>): StoredRequest {
	return {
		id: "request-1",
		category: "Internet",
		priority: "MEDIUM",
		status: "SUBMITTED",
		...overrides,
	};
}

describe("Dashboard summary", () => {
	it("allows Facility Manager and Administrator but rejects operational dashboard access for other roles", async () => {
		const allowedDatabase = new FakeDashboardD1Database();

		for (const role of ["FACILITY_MANAGER", "ADMINISTRATOR"]) {
			const response = await fetchWithSession(
				new Request(`http://localhost/api/dashboard/summary?role=${role}`),
				{ DB: allowedDatabase } as unknown as Env,
			);

			expect(response.status).toBe(200);
			await expect(response.json()).resolves.toMatchObject({
				data: {
					totalRequests: 0,
					openQuestions: ["OPEN-07", "OPEN-10"],
				},
			});
		}

		const forbiddenResponse = await fetchWithSession(
			new Request("http://localhost/api/dashboard/summary?role=TECHNICIAN"),
			{ DB: new FakeDashboardD1Database() } as unknown as Env,
		);

		expect(forbiddenResponse.status).toBe(403);
		await expect(forbiddenResponse.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
	});

	it("returns zero summary buckets when no reports exist", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/dashboard/summary?role=FACILITY_MANAGER"),
			{ DB: new FakeDashboardD1Database() } as unknown as Env,
		);

		const body = await response.json();

		expect(body).toMatchObject({
			data: {
				totalRequests: 0,
				byStatus: [
					{ label: "SUBMITTED", count: 0 },
					{ label: "UNDER_REVIEW", count: 0 },
					{ label: "ASSIGNED", count: 0 },
					{ label: "IN_PROGRESS", count: 0 },
					{ label: "RESOLVED", count: 0 },
					{ label: "CLOSED", count: 0 },
				],
				byPriority: [
					{ label: "LOW", count: 0 },
					{ label: "MEDIUM", count: 0 },
					{ label: "HIGH", count: 0 },
					{ label: "URGENT", count: 0 },
				],
				technicianWorkload: [],
			},
		});
	});

	it("summarizes report counts and technician workload source data without exposing internal notes", async () => {
		const database = new FakeDashboardD1Database(
			[
				requestFixture({
					id: "request-1",
					category: "Internet",
					priority: "HIGH",
					status: "ASSIGNED",
				}),
				requestFixture({
					id: "request-2",
					category: "Internet",
					priority: "URGENT",
					status: "IN_PROGRESS",
				}),
				requestFixture({
					id: "request-3",
					category: "AC",
					priority: "LOW",
					status: "CLOSED",
				}),
			],
			[
				{
					id: "tech-network",
					name: "Sari Teknisi",
					specialization: "Jaringan dan internet",
					is_active: 1,
				},
			],
			[
				{
					request_id: "request-1",
					technician_id: "tech-network",
					is_current: 1,
				},
				{
					request_id: "request-2",
					technician_id: "tech-network",
					is_current: 1,
				},
				{
					request_id: "request-3",
					technician_id: "tech-network",
					is_current: 1,
				},
			],
			["Catatan internal tidak boleh muncul di dashboard."],
		);

		const response = await fetchWithSession(
			new Request("http://localhost/api/dashboard/summary?role=FACILITY_MANAGER"),
			{ DB: database } as unknown as Env,
		);

		const body = await response.json();
		const serializedBody = JSON.stringify(body);

		expect(response.status).toBe(200);
		expect(body).toMatchObject({
			data: {
				totalRequests: 3,
				byStatus: expect.arrayContaining([
					{ label: "ASSIGNED", count: 1 },
					{ label: "IN_PROGRESS", count: 1 },
					{ label: "CLOSED", count: 1 },
				]),
				byPriority: expect.arrayContaining([
					{ label: "LOW", count: 1 },
					{ label: "HIGH", count: 1 },
					{ label: "URGENT", count: 1 },
				]),
				byCategory: expect.arrayContaining([
					{ label: "Internet", count: 2 },
					{ label: "AC", count: 1 },
				]),
				technicianWorkload: [
					{
						technicianId: "tech-network",
						technicianName: "Sari Teknisi",
						sourceData: {
							totalCurrentAssignments: 2,
							byActiveStatus: {
								assigned: 1,
								inProgress: 1,
								resolved: 0,
							},
						},
					},
				],
				workloadBasis: expect.stringContaining("OPEN-07"),
				openQuestions: ["OPEN-07", "OPEN-10"],
			},
		});
		expect(serializedBody).not.toContain("Catatan internal");
		expect(serializedBody).not.toContain("internalNotes");
	});
});
