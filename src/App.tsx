import { useEffect, useState } from "react";
import {
	Activity,
	BarChart3,
	ClipboardCheck,
	FileText,
	LockKeyhole,
	LogOut,
	RefreshCw,
	ShieldCheck,
	Sparkles,
	Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./App.css";

type ServiceRequest = {
	id: string;
	requestNumber: string;
	title: string;
	location: string;
	category: string;
	priority: string;
	prioritySuggestion: string | null;
	status: string;
	reporterName: string;
	reporterType: string;
};

type StatusHistoryEntry = {
	id: string;
	fromStatus: string | null;
	toStatus: string;
	changedByRole: string;
	note: string;
	createdAt: string;
};

type CommunicationEntry = {
	id: string;
	requestId: string;
	authorRole: string;
	body: string;
	visibility: "PUBLIC" | "INTERNAL";
	createdAt: string;
};

type ReporterConfirmation = {
	id: string;
	requestId: string;
	confirmedByRole: string;
	confirmationNote: string | null;
	confirmedAt: string;
};

type RequestDetail = ServiceRequest & {
	description: string;
	createdAt: string;
	updatedAt: string;
	statusHistory: StatusHistoryEntry[];
	comments: CommunicationEntry[];
	internalNotes?: CommunicationEntry[];
	confirmation: ReporterConfirmation | null;
};

type TechnicianTask = ServiceRequest & {
	assignment: {
		id: string;
		technicianId: string;
		technicianName: string;
		assignedAt: string;
		acceptedAt: string | null;
	};
};

type HealthResponse = {
	status?: string;
	checks?: {
		api?: string;
		d1?: string;
	};
};

type Technician = {
	id: string;
	name: string;
	specialization: string | null;
	isActive: boolean;
};

type DashboardCount = {
	label: string;
	count: number;
};

type DashboardWorkload = {
	technicianId: string;
	technicianName: string;
	specialization: string | null;
	sourceData: {
		totalCurrentAssignments: number;
		byActiveStatus: {
			assigned: number;
			inProgress: number;
			resolved: number;
		};
	};
};

type DashboardSummary = {
	totalRequests: number;
	byStatus: DashboardCount[];
	byPriority: DashboardCount[];
	byCategory: DashboardCount[];
	technicianWorkload: DashboardWorkload[];
	workloadBasis: string;
	openQuestions: string[];
};

type DbRole =
	| "pelapor"
	| "administrator"
	| "teknisi"
	| "manajer_fasilitas";

type AppRole =
	| "REPORTER"
	| "ADMINISTRATOR"
	| "TECHNICIAN"
	| "FACILITY_MANAGER";

type AuthSession = {
	id: string;
	username: string;
	role: DbRole;
	appRole: AppRole;
	displayName: string;
	technicianId: string | null;
};

const categories = ["Internet", "AC", "Peralatan Kelas", "Kebersihan", "Lainnya"];
const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
const roleOptions = [
	{
		value: "REPORTER",
		dbRole: "pelapor",
		label: "Pelapor",
		hint: "Buat dan pantau laporan",
		icon: FileText,
	},
	{
		value: "ADMINISTRATOR",
		dbRole: "administrator",
		label: "Administrator",
		hint: "Review, klasifikasi, assignment",
		icon: ShieldCheck,
	},
	{
		value: "TECHNICIAN",
		dbRole: "teknisi",
		label: "Teknisi",
		hint: "Kerjakan tugas aktif",
		icon: Wrench,
	},
	{
		value: "FACILITY_MANAGER",
		dbRole: "manajer_fasilitas",
		label: "Manajer",
		hint: "Pantau dashboard",
		icon: BarChart3,
	},
] as const;
const emptyDashboardSummary: DashboardSummary = {
	totalRequests: 0,
	byStatus: [],
	byPriority: [],
	byCategory: [],
	technicianWorkload: [],
	workloadBasis:
		"Source data: current assignments grouped by active request statuses; final workload formula remains OPEN-07.",
	openQuestions: ["OPEN-07", "OPEN-10"],
};
function roleActionSummary(role: string) {
	if (role === "ADMINISTRATOR") {
		return [
			"Review laporan",
			"Klasifikasi kategori dan prioritas",
			"Tugaskan teknisi",
			"Tutup atau buka kembali laporan",
			"Lihat dashboard operasional",
		];
	}

	if (role === "TECHNICIAN") {
		return [
			"Lihat tugas teknisi",
			"Terima tugas",
			"Mulai progres",
			"Tandai selesai",
			"Catatan internal",
		];
	}

	if (role === "FACILITY_MANAGER") {
		return ["Lihat dashboard operasional", "Lihat ringkasan workload source data"];
	}

	return [
		"Buat laporan",
		"Lihat detail laporan",
		"Tambah komentar publik",
		"Konfirmasi hasil resolved",
	];
}

function badgeClass(kind: "status" | "priority", value: string) {
	return `badge badge-${kind} badge-${value.toLowerCase().replace(/_/g, "-")}`;
}

function RoleIcon({ icon: Icon }: { icon: LucideIcon }) {
	return <Icon aria-hidden="true" size={19} strokeWidth={2.15} />;
}

function SummaryList({
	title,
	items,
}: {
	title: string;
	items: DashboardCount[];
}) {
	return (
		<section className="summary-list">
			<h3>{title}</h3>
			{items.length === 0 ? (
				<p className="empty-state">Belum ada data {title.toLowerCase()}.</p>
			) : (
				<ul>
					{items.map((item) => (
						<li key={item.label}>
							<span>{item.label}</span>
							<strong>{item.count}</strong>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default function App() {
	const [requests, setRequests] = useState<ServiceRequest[]>([]);
	const [session, setSession] = useState<AuthSession | null>(null);
	const [activeRole, setActiveRole] = useState<AppRole>("REPORTER");
	const [selectedLoginRole, setSelectedLoginRole] = useState<DbRole>("pelapor");
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [loginMessage, setLoginMessage] = useState("Masuk dengan akun demo sesuai role.");
	const [authLoading, setAuthLoading] = useState(true);
	const [requestListEmpty, setRequestListEmpty] = useState(true);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [priorityFilter, setPriorityFilter] = useState("");
	const [selectedRequestId, setSelectedRequestId] = useState("");
	const [selectedRequest, setSelectedRequest] = useState<RequestDetail | null>(
		null,
	);
	const [technicians, setTechnicians] = useState<Technician[]>([]);
	const [detailMessage, setDetailMessage] = useState("");
	const [reporterName, setReporterName] = useState("");
	const [reporterType, setReporterType] = useState("STUDENT");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [category, setCategory] = useState("Internet");
	const [adminCategory, setAdminCategory] = useState("Internet");
	const [adminPriority, setAdminPriority] = useState("MEDIUM");
	const [reviewNote, setReviewNote] = useState("");
	const [assignmentNote, setAssignmentNote] = useState("");
	const [selectedTechnicianId, setSelectedTechnicianId] = useState("");
	const [technicianTasks, setTechnicianTasks] = useState<TechnicianTask[]>([]);
	const [technicianNote, setTechnicianNote] = useState("");
	const [technicianMessage, setTechnicianMessage] = useState("");
	const [commentBody, setCommentBody] = useState("");
	const [internalNoteBody, setInternalNoteBody] = useState("");
	const [communicationMessage, setCommunicationMessage] = useState("");
	const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary>(
		emptyDashboardSummary,
	);
	const [dashboardMessage, setDashboardMessage] = useState(
		"Dashboard menunggu role Manajer Fasilitas atau Administrator.",
	);
	const [confirmationNote, setConfirmationNote] = useState("");
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [closeNote, setCloseNote] = useState("");
	const [manualOverride, setManualOverride] = useState(false);
	const [manualOverrideNote, setManualOverrideNote] = useState("");
	const [reopenNote, setReopenNote] = useState("");
	const [message, setMessage] = useState("");
	const [adminMessage, setAdminMessage] = useState("");
	const [foundationStatus, setFoundationStatus] = useState(
		"Memeriksa koneksi API dan D1",
	);
	const selectedLoginOption =
		roleOptions.find((role) => role.dbRole === selectedLoginRole) ??
		roleOptions[0];

	function handleUnauthorized(status: number) {
		if (status === 401) {
			setSession(null);
			setLoginMessage("Sesi berakhir. Silakan login kembali.");
		}
	}

	async function loadSession() {
		setAuthLoading(true);

		try {
			const response = await fetch("/api/auth/me", {
				credentials: "same-origin",
			});
			const result = await response.json();

			if (!response.ok) {
				setSession(null);
				setLoginMessage("Pilih role lalu masuk dengan akun demo.");
				return;
			}

			const nextSession = result.data as AuthSession;
			setSession(nextSession);
			setActiveRole(nextSession.appRole);

			if (nextSession.technicianId) {
				setSelectedTechnicianId(nextSession.technicianId);
			}
		} catch {
			setSession(null);
			setLoginMessage("Koneksi autentikasi belum tersedia.");
		} finally {
			setAuthLoading(false);
		}
	}

	async function submitLogin(event: React.FormEvent) {
		event.preventDefault();
		setLoginMessage("Memeriksa kredensial.");

		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "same-origin",
			body: JSON.stringify({
				username: loginUsername,
				password: loginPassword,
			}),
		});
		const result = await response.json();

		if (!response.ok) {
			setLoginMessage(result.error?.message ?? "Login gagal.");
			return;
		}

		const nextSession = result.data as AuthSession;
		setSession(nextSession);
		setActiveRole(nextSession.appRole);
		setSelectedLoginRole(nextSession.role);
		setLoginPassword("");
		setLoginMessage(`Login berhasil sebagai ${nextSession.displayName}.`);

		if (nextSession.technicianId) {
			setSelectedTechnicianId(nextSession.technicianId);
		}
	}

	async function logout() {
		await fetch("/api/auth/logout", {
			method: "POST",
			credentials: "same-origin",
		});
		setSession(null);
		setRequests([]);
		setSelectedRequest(null);
		setSelectedRequestId("");
		setTechnicianTasks([]);
		setDashboardSummary(emptyDashboardSummary);
		setLoginMessage("Logout berhasil. Silakan login kembali.");
	}

	async function loadRequests() {
		if (!session || activeRole === "FACILITY_MANAGER") {
			setRequests([]);
			setRequestListEmpty(true);
			return;
		}

		const params = new URLSearchParams();

		if (search.trim()) {
			params.set("search", search.trim());
		}

		if (statusFilter) {
			params.set("status", statusFilter);
		}

		if (priorityFilter) {
			params.set("priority", priorityFilter);
		}

		const queryString = params.toString();
		const response = await fetch(
			`/api/requests${queryString ? `?${queryString}` : ""}`,
			{ credentials: "same-origin" },
		);
		const result = await response.json();

		handleUnauthorized(response.status);

		if (!response.ok) {
			setRequests([]);
			setRequestListEmpty(true);
			return;
		}

		setRequests(result.data ?? []);
		setRequestListEmpty(result.meta?.empty ?? (result.data ?? []).length === 0);
	}

	async function loadRequestDetail(requestId: string) {
		if (!session) {
			setDetailMessage("Silakan login untuk melihat detail laporan.");
			return;
		}

		setSelectedRequestId(requestId);
		setDetailMessage("Memuat detail laporan.");
		setSelectedRequest(null);

		const response = await fetch(
			`/api/requests/${encodeURIComponent(requestId)}`,
			{ credentials: "same-origin" },
		);
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setDetailMessage(result.error?.message ?? "Detail laporan gagal dimuat.");
			return;
		}

		setSelectedRequest(result.data);
		setAdminCategory(result.data.category);
		setAdminPriority(result.data.priority);
		setDetailMessage("");
	}

	async function loadTechnicians() {
		if (!session || activeRole !== "ADMINISTRATOR") {
			setTechnicians([]);
			return;
		}

		const response = await fetch("/api/technicians", {
			credentials: "same-origin",
		});
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setTechnicians([]);
			return;
		}

		const nextTechnicians = result.data ?? [];

		setTechnicians(nextTechnicians);

		if (!selectedTechnicianId && nextTechnicians.length > 0) {
			setSelectedTechnicianId(nextTechnicians[0].id);
		}
	}

	async function loadTechnicianTasks() {
		const technicianId = session?.technicianId ?? selectedTechnicianId;

		if (!session || activeRole !== "TECHNICIAN" || !technicianId) {
			setTechnicianTasks([]);
			return;
		}

		setTechnicianMessage("Memuat daftar tugas teknisi.");

		const response = await fetch(
			`/api/technicians/${encodeURIComponent(
				technicianId,
			)}/tasks`,
			{ credentials: "same-origin" },
		);
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setTechnicianMessage(
				result.error?.message ?? "Daftar tugas teknisi gagal dimuat.",
			);
			return;
		}

		setTechnicianTasks(result.data ?? []);
		setTechnicianMessage(
			(result.data ?? []).length === 0
				? "Belum ada tugas aktif untuk teknisi ini."
				: "",
		);
	}

	async function loadDashboardSummary() {
		if (
			!session ||
			(activeRole !== "FACILITY_MANAGER" && activeRole !== "ADMINISTRATOR")
		) {
			setDashboardSummary(emptyDashboardSummary);
			setDashboardMessage(
				"Dashboard hanya tersedia untuk Manajer Fasilitas dan Administrator.",
			);
			return;
		}

		setDashboardMessage("Memuat dashboard operasional.");

		const response = await fetch("/api/dashboard/summary", {
			credentials: "same-origin",
		});
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setDashboardMessage(
				result.error?.message ?? "Dashboard operasional gagal dimuat.",
			);
			return;
		}

		setDashboardSummary(result.data ?? emptyDashboardSummary);
		setDashboardMessage(
			(result.data?.totalRequests ?? 0) === 0
				? "Belum ada laporan untuk diringkas."
				: "",
		);
	}

	async function loadFoundationStatus() {
		try {
			const response = await fetch("/api/health");
			const result = (await response.json()) as HealthResponse;

			if (
				response.ok &&
				result.status === "healthy" &&
				result.checks?.api === "ok" &&
				result.checks?.d1 === "ok"
			) {
				setFoundationStatus("API dan D1 siap digunakan");
				return;
			}

			setFoundationStatus("Koneksi fondasi belum sehat");
		} catch {
			setFoundationStatus("Koneksi API atau D1 belum tersedia");
		}
	}

	useEffect(() => {
		loadFoundationStatus();
		loadSession();
	}, []);

	useEffect(() => {
		loadRequests();
	}, [session, activeRole, search, statusFilter, priorityFilter]);

	useEffect(() => {
		loadTechnicians();
	}, [session, activeRole]);

	useEffect(() => {
		loadTechnicianTasks();
	}, [session, activeRole, selectedTechnicianId]);

	useEffect(() => {
		loadDashboardSummary();
	}, [session, activeRole]);

	useEffect(() => {
		if (session && selectedRequestId) {
			loadRequestDetail(selectedRequestId);
		}

		setCommunicationMessage("");
		setInternalNoteBody("");
	}, [session, activeRole]);

	async function submitRequest(event: React.FormEvent) {
		event.preventDefault();
		setMessage("");

		if (activeRole !== "REPORTER") {
			setMessage("Hanya Pelapor yang dapat membuat laporan baru.");
			return;
		}

		const response = await fetch("/api/requests", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "same-origin",
			body: JSON.stringify({
				reporterName,
				reporterType,
				title,
				description,
				location,
				category,
			}),
		});

		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setMessage(result.error?.message ?? "Laporan gagal dibuat.");
			return;
		}

		setMessage(`Laporan berhasil dibuat: ${result.data.requestNumber}`);
		setReporterName("");
		setReporterType("STUDENT");
		setTitle("");
		setDescription("");
		setLocation("");
		await loadRequests();
	}

	function clearFilters() {
		setSearch("");
		setStatusFilter("");
		setPriorityFilter("");
	}

	async function runAdminAction(
		path: string,
		body: Record<string, string | boolean | null>,
		successMessage: string,
	) {
		if (!selectedRequest) {
			return;
		}

		setAdminMessage("");

		const response = await fetch(`/api/requests/${selectedRequest.id}/${path}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			credentials: "same-origin",
			body: JSON.stringify(body),
		});
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setAdminMessage(result.error?.message ?? "Aksi Administrator gagal.");
			return;
		}

		setAdminMessage(successMessage);
		await loadRequests();
		await loadRequestDetail(selectedRequest.id);
	}

	async function reviewSelectedRequest() {
		await runAdminAction(
			"review",
			{ note: reviewNote },
			"Laporan dipindahkan ke UNDER_REVIEW.",
		);
		setReviewNote("");
	}

	async function classifySelectedRequest() {
		await runAdminAction(
			"classification",
			{ category: adminCategory, priority: adminPriority },
			"Kategori dan prioritas Administrator disimpan.",
		);
	}

	async function assignSelectedRequest() {
		await runAdminAction(
			"assignment",
			{ technicianId: selectedTechnicianId, note: assignmentNote },
			"Laporan ditugaskan dan dipindahkan ke ASSIGNED.",
		);
		setAssignmentNote("");
	}

	async function confirmSelectedResolution(event: React.FormEvent) {
		event.preventDefault();

		if (!selectedRequest) {
			return;
		}

		setConfirmationMessage("");

		const response = await fetch(
			`/api/requests/${selectedRequest.id}/confirm-resolution`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({
					confirmationNote,
				}),
			},
		);
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setConfirmationMessage(
				result.error?.message ?? "Konfirmasi hasil gagal disimpan.",
			);
			return;
		}

		setConfirmationNote("");
		setConfirmationMessage("Konfirmasi Pelapor disimpan.");
		await loadRequestDetail(selectedRequest.id);
	}

	async function closeSelectedRequest() {
		await runAdminAction(
			"close",
			{
				note: closeNote,
				manualOverride,
				manualOverrideNote: manualOverride ? manualOverrideNote : null,
			},
			"Laporan dipindahkan ke CLOSED.",
		);
		setCloseNote("");
		setManualOverride(false);
		setManualOverrideNote("");
	}

	async function reopenSelectedRequest() {
		await runAdminAction(
			"reopen",
			{ note: reopenNote },
			"Laporan dipindahkan kembali ke UNDER_REVIEW.",
		);
		setReopenNote("");
	}

	async function runTechnicianAction(
		requestId: string,
		path: "accept" | "progress" | "resolve",
		successMessage: string,
	) {
		setTechnicianMessage("");

		const body: Record<string, string> = {};

		if (path !== "accept") {
			body.note = technicianNote;
		}

		const response = await fetch(`/api/requests/${requestId}/${path}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			credentials: "same-origin",
			body: JSON.stringify(body),
		});
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setTechnicianMessage(result.error?.message ?? "Aksi Teknisi gagal.");
			return;
		}

		setTechnicianMessage(successMessage);
		setTechnicianNote("");
		await loadRequests();
		await loadTechnicianTasks();

		if (selectedRequestId === requestId) {
			await loadRequestDetail(requestId);
		}
	}

	async function submitPublicComment(event: React.FormEvent) {
		event.preventDefault();

		if (!selectedRequest) {
			return;
		}

		setCommunicationMessage("");

		const response = await fetch(
			`/api/requests/${selectedRequest.id}/comments`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({
					body: commentBody,
				}),
			},
		);
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setCommunicationMessage(
				result.error?.fields?.body ??
					result.error?.message ??
					"Komentar publik gagal disimpan.",
			);
			return;
		}

		setCommentBody("");
		setCommunicationMessage("Komentar publik disimpan.");
		await loadRequestDetail(selectedRequest.id);
	}

	async function submitInternalNote(event: React.FormEvent) {
		event.preventDefault();

		if (!selectedRequest) {
			return;
		}

		setCommunicationMessage("");

		const response = await fetch(
			`/api/requests/${selectedRequest.id}/internal-notes`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({
					body: internalNoteBody,
				}),
			},
		);
		const result = await response.json();
		handleUnauthorized(response.status);

		if (!response.ok) {
			setCommunicationMessage(
				result.error?.fields?.body ??
					result.error?.message ??
					"Catatan internal gagal disimpan.",
			);
			return;
		}

		setInternalNoteBody("");
		setCommunicationMessage("Catatan internal disimpan.");
		await loadRequestDetail(selectedRequest.id);
	}

	const canUseInternalNotes =
		activeRole === "ADMINISTRATOR" || activeRole === "TECHNICIAN";

	if (authLoading) {
		return (
			<main className="app-shell">
				<section className="hero-copy">
					<div>
						<p className="eyebrow">Campus Maintenance</p>
						<h1>Campus Service Request</h1>
						<p>Memeriksa sesi login dan koneksi aplikasi.</p>
					</div>
					<div className="hero-visual" aria-hidden="true">
						<div className="hero-ticket">
							<span><LockKeyhole size={14} /> AUTH</span>
							<strong>Loading</strong>
							<small>Session check</small>
						</div>
					</div>
				</section>
			</main>
		);
	}

	if (!session) {
		return (
			<main className="app-shell login-shell">
				<section className="page-header login-page-header">
					<div className="hero-copy">
						<div>
							<p className="eyebrow">Campus Maintenance</p>
							<h1>Campus Service Request</h1>
							<p>
								Masuk dengan akun demo sesuai role untuk menguji alur laporan,
								penugasan teknisi, dashboard, dan otorisasi backend.
							</p>
						</div>
						<div className="hero-visual" aria-hidden="true">
							<div className="hero-ticket">
								<span><LockKeyhole size={14} /> LOGIN</span>
								<strong>Protected</strong>
								<small>Role session</small>
							</div>
							<div className="hero-steps">
								<span>Pilih</span>
								<span>Login</span>
								<span>Kerja</span>
							</div>
						</div>
					</div>

					<section className="role-switcher" aria-labelledby="login-role-title">
						<div>
							<h2 id="login-role-title">Login sebagai apa?</h2>
							<p>Pilih pintu masuk role, lalu isi username dan password.</p>
						</div>
						<div className="role-tabs" role="tablist" aria-label="Pilihan login role">
							{roleOptions.map((role) => (
								<button
									type="button"
									key={role.value}
									className={
										selectedLoginRole === role.dbRole
											? "role-tab active"
											: "role-tab"
									}
									aria-pressed={selectedLoginRole === role.dbRole}
									onClick={() => {
										setSelectedLoginRole(role.dbRole);
										setLoginMessage("Masukkan kredensial akun demo role ini.");
									}}
								>
									<span className="role-icon" aria-hidden="true">
										<RoleIcon icon={role.icon} />
									</span>
									<span className="role-copy">
										<strong>{role.label}</strong>
										<span>{role.hint}</span>
									</span>
								</button>
							))}
						</div>
					</section>

					<form className="request-form login-form" onSubmit={submitLogin}>
						<p className="eyebrow">Secure Access</p>
						<h2>Form Login {selectedLoginOption.label}</h2>
						<label className="field">
							<span className="field-label">Username</span>
							<input
								name="username"
								value={loginUsername}
								onChange={(event) => setLoginUsername(event.target.value)}
								placeholder="Contoh: admin_demo"
								autoComplete="username"
								required
							/>
							<span className="field-hint">
								Gunakan username demo sesuai role yang dipilih.
							</span>
						</label>
						<label className="field">
							<span className="field-label">Password</span>
							<input
								type="password"
								name="password"
								value={loginPassword}
								onChange={(event) => setLoginPassword(event.target.value)}
								placeholder="Password akun demo"
								autoComplete="current-password"
								required
							/>
							<span className="field-hint">
								Password hanya dikirim ke endpoint auth backend.
							</span>
						</label>
						<button type="submit"><LockKeyhole size={16} /> Masuk</button>
						{loginMessage && <p className="form-message">{loginMessage}</p>}
					</form>

					<section className="foundation-status" aria-live="polite">
						<Activity aria-hidden="true" size={18} />
						<h2>Status Fondasi</h2>
						<p>{foundationStatus}</p>
					</section>
				</section>
			</main>
		);
	}

	return (
		<main className="app-shell">
			<section className="page-header">
				<div className="hero-copy">
					<div>
						<p className="eyebrow">Campus Maintenance</p>
						<h1>Campus Service Request</h1>
						<p>
							Laporkan masalah fasilitas kampus, pantau statusnya, dan jaga
							koordinasi perbaikan tetap terlihat dari satu workspace.
						</p>
					</div>
					<div className="hero-visual" aria-hidden="true">
						<div className="hero-ticket">
							<span><Sparkles size={14} /> CSR</span>
							<strong>Submitted</strong>
							<small>Under Review</small>
						</div>
						<div className="hero-steps">
							<span>Assign</span>
							<span>Progress</span>
							<span>Close</span>
						</div>
					</div>
				</div>
				<section className="role-switcher session-card" aria-labelledby="role-switcher-title">
					<div>
						<h2 id="role-switcher-title">Sesi Aktif</h2>
						<p>
							{session.displayName} masuk sebagai{" "}
							{roleOptions.find((role) => role.value === activeRole)?.label}.
						</p>
					</div>
					<div className="role-tabs role-tabs-single" aria-label="Role login aktif">
						{roleOptions
							.filter((role) => role.value === activeRole)
							.map((role) => (
								<div key={role.value} className="role-tab active session-role-card">
									<span className="role-icon" aria-hidden="true">
										<RoleIcon icon={role.icon} />
									</span>
									<span className="role-copy">
										<strong>{role.label}</strong>
										<span>{role.hint}</span>
									</span>
								</div>
							))}
						<button type="button" className="secondary-button" onClick={logout}>
							<LogOut size={16} />
							Logout
						</button>
					</div>
				</section>
				<section className="role-action-summary" aria-live="polite">
					<h2>Aksi tersedia untuk role aktif</h2>
					<ul>
						{roleActionSummary(activeRole).map((action) => (
							<li key={action}>{action}</li>
						))}
					</ul>
				</section>
				<section className="foundation-status" aria-live="polite">
					<Activity aria-hidden="true" size={18} />
					<h2>Status Fondasi</h2>
					<p>{foundationStatus}</p>
				</section>
			</section>

			<section className="content-grid">
				{activeRole === "REPORTER" && (
					<form className="request-form" onSubmit={submitRequest}>
						<h2>Buat Laporan Baru</h2>

						<label className="field">
							<span className="field-label">Nama Pelapor</span>
							<input
								name="reporterName"
								value={reporterName}
								onChange={(event) => setReporterName(event.target.value)}
								placeholder="Contoh: Dr. Mira Santoso"
								required
							/>
							<span className="field-hint">Wajib diisi agar laporan punya identitas pelapor.</span>
						</label>

						<label className="field">
							<span className="field-label">Tipe Pelapor</span>
							<select
								name="reporterType"
								value={reporterType}
								onChange={(event) => setReporterType(event.target.value)}
							>
								<option value="STUDENT">Mahasiswa</option>
								<option value="LECTURER">Dosen</option>
							</select>
						</label>

						<p className="suggestion-note">
							Dosen mendapat saran prioritas HIGH, tetapi prioritas akhir tetap
							keputusan Administrator.
						</p>

						<label className="field">
							<span className="field-label">Judul</span>
							<input
								name="title"
								value={title}
								onChange={(event) => setTitle(event.target.value)}
								placeholder="Contoh: Proyektor ruang 302 rusak"
								required
							/>
							<span className="field-hint">Wajib diisi dengan ringkasan masalah.</span>
						</label>

						<label className="field">
							<span className="field-label">Deskripsi</span>
							<textarea
								name="description"
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								placeholder="Jelaskan masalah minimal 20 karakter."
								minLength={20}
								required
							/>
							<span className="field-hint">Minimal 20 karakter agar teknisi punya konteks cukup.</span>
						</label>

						<label className="field">
							<span className="field-label">Lokasi</span>
							<input
								name="location"
								value={location}
								onChange={(event) => setLocation(event.target.value)}
								placeholder="Contoh: Gedung A, Ruang 302"
								required
							/>
							<span className="field-hint">Wajib diisi agar lokasi perbaikan jelas.</span>
						</label>

						<label className="field">
							<span className="field-label">Kategori</span>
							<select
								name="category"
								value={category}
								onChange={(event) => setCategory(event.target.value)}
							>
								<option>Internet</option>
								<option>AC</option>
								<option>Peralatan Kelas</option>
								<option>Kebersihan</option>
								<option>Lainnya</option>
							</select>
						</label>

						<button type="submit"><ClipboardCheck size={16} /> Kirim Laporan</button>
						{message && <p className="form-message">{message}</p>}
					</form>
				)}

				<section
					className="technician-panel"
					aria-live="polite"
					hidden={activeRole !== "TECHNICIAN"}
				>
						<div className="workspace-header">
							<div>
								<p className="eyebrow">Technician Tasks</p>
								<h2>Daftar Tugas Teknisi</h2>
							</div>
							<button
								type="button"
								className="secondary-button"
								onClick={loadTechnicianTasks}
							>
								<RefreshCw size={16} />
								Refresh
							</button>
						</div>

						<p className="form-message">
							Tugas ditampilkan untuk akun teknisi yang sedang login:
							{" "}{session.displayName}.
						</p>

						<label>
							Catatan Progres atau Penyelesaian
							<textarea
								name="technicianNote"
								value={technicianNote}
								onChange={(event) => setTechnicianNote(event.target.value)}
								placeholder="Contoh: Mulai dikerjakan atau pekerjaan selesai."
							/>
						</label>

						{technicianMessage && (
							<p className="form-message">{technicianMessage}</p>
						)}

						{technicianTasks.length === 0 ? (
							<div className="empty-state empty-state-card">
								<strong>Belum ada tugas aktif</strong>
								<p>Tugas teknisi akan tampil sesuai assignment aktif.</p>
							</div>
						) : (
							<div className="request-stack">
								{technicianTasks.map((task) => (
									<article className="technician-task" key={task.id}>
										<header className="detail-header">
											<div>
												<strong>{task.requestNumber}</strong>
												<h3>{task.title}</h3>
											</div>
											<div className="badge-group">
												<span className={badgeClass("status", task.status)}>
													{task.status}
												</span>
												<span className={badgeClass("priority", task.priority)}>
													{task.priority}
												</span>
											</div>
										</header>
										<p>
											{task.location} - {task.category}
										</p>
										<p>
											Ditugaskan ke {task.assignment.technicianName}; diterima:{" "}
											{task.assignment.acceptedAt ?? "Belum diterima"}
										</p>
										<div className="task-actions">
											<button
												type="button"
												onClick={() =>
													runTechnicianAction(
														task.id,
														"accept",
														"Tugas diterima oleh Teknisi.",
													)
												}
												disabled={task.status !== "ASSIGNED"}
											>
												Terima Tugas
											</button>
											<button
												type="button"
												onClick={() =>
													runTechnicianAction(
														task.id,
														"progress",
														"Tugas dipindahkan ke IN_PROGRESS.",
													)
												}
												disabled={task.status !== "ASSIGNED"}
											>
												Mulai Progres
											</button>
											<button
												type="button"
												onClick={() =>
													runTechnicianAction(
														task.id,
														"resolve",
														"Tugas dipindahkan ke RESOLVED.",
													)
												}
												disabled={task.status !== "IN_PROGRESS"}
											>
												Tandai Selesai
											</button>
										</div>
									</article>
								))}
							</div>
						)}
				</section>

				<section
					className="dashboard-panel"
					aria-labelledby="dashboard-title"
					aria-live="polite"
					hidden={
						activeRole !== "FACILITY_MANAGER" &&
						activeRole !== "ADMINISTRATOR"
					}
				>
					<div className="workspace-header">
						<div>
							<p className="eyebrow">Dashboard Summary</p>
							<h2 id="dashboard-title">Dashboard Operasional</h2>
						</div>
						<button
							type="button"
							className="secondary-button"
							onClick={loadDashboardSummary}
						>
							<RefreshCw size={16} />
							Refresh
						</button>
					</div>

					<div className="dashboard-total">
						<span>Total Laporan</span>
						<strong>{dashboardSummary.totalRequests}</strong>
					</div>

					{dashboardMessage && <p className="form-message">{dashboardMessage}</p>}

					<div className="dashboard-grid">
						<SummaryList title="Status" items={dashboardSummary.byStatus} />
						<SummaryList title="Prioritas" items={dashboardSummary.byPriority} />
						<SummaryList title="Kategori" items={dashboardSummary.byCategory} />
					</div>

					<section className="workload-summary">
						<h3>Beban Kerja Teknisi</h3>

						{dashboardSummary.technicianWorkload.length === 0 ? (
							<div className="empty-state empty-state-card">
								<strong>Workload masih kosong</strong>
								<p>Belum ada assignment aktif untuk ditampilkan.</p>
							</div>
						) : (
							<div className="request-stack">
								{dashboardSummary.technicianWorkload.map((workload) => (
									<article
										className="workload-row"
										key={workload.technicianId}
									>
										<header>
											<strong>{workload.technicianName}</strong>
											<span>
												{workload.specialization ?? "Spesialisasi belum diisi"}
											</span>
										</header>
										<dl className="workload-metrics">
											<div>
												<dt>Current assignments</dt>
												<dd>{workload.sourceData.totalCurrentAssignments}</dd>
											</div>
											<div>
												<dt>ASSIGNED</dt>
												<dd>{workload.sourceData.byActiveStatus.assigned}</dd>
											</div>
											<div>
												<dt>IN_PROGRESS</dt>
												<dd>{workload.sourceData.byActiveStatus.inProgress}</dd>
											</div>
											<div>
												<dt>RESOLVED</dt>
												<dd>{workload.sourceData.byActiveStatus.resolved}</dd>
											</div>
										</dl>
									</article>
								))}
							</div>
						)}
					</section>
				</section>

				<section
					className="request-workspace"
					aria-labelledby="workspace-title"
					hidden={activeRole === "FACILITY_MANAGER"}
				>
					<div className="workspace-header">
						<div>
							<p className="eyebrow">Request Workspace</p>
							<h2 id="workspace-title">Daftar dan Detail Laporan</h2>
						</div>
						<button type="button" className="secondary-button" onClick={loadRequests}>
							<RefreshCw size={16} />
							Refresh
						</button>
					</div>

					<div className="filter-bar" aria-label="Filter daftar laporan">
						<label>
							Cari laporan
							<input
								name="search"
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Nomor, judul, lokasi, kategori, pelapor"
							/>
						</label>

						<label>
							Filter Status
							<select
								name="statusFilter"
								value={statusFilter}
								onChange={(event) => setStatusFilter(event.target.value)}
							>
								<option value="">Semua status</option>
								<option value="SUBMITTED">SUBMITTED</option>
								<option value="UNDER_REVIEW">UNDER_REVIEW</option>
								<option value="ASSIGNED">ASSIGNED</option>
								<option value="IN_PROGRESS">IN_PROGRESS</option>
								<option value="RESOLVED">RESOLVED</option>
								<option value="CLOSED">CLOSED</option>
							</select>
						</label>

						<label>
							Filter Prioritas
							<select
								name="priorityFilter"
								value={priorityFilter}
								onChange={(event) => setPriorityFilter(event.target.value)}
							>
								<option value="">Semua prioritas</option>
								<option value="LOW">LOW</option>
								<option value="MEDIUM">MEDIUM</option>
								<option value="HIGH">HIGH</option>
								<option value="URGENT">URGENT</option>
							</select>
						</label>

						<button type="button" className="secondary-button" onClick={clearFilters}>
							Bersihkan Filter
						</button>
					</div>

					<div className="workspace-grid">
						<section className="request-list" aria-label="Daftar laporan">
							<h3>Daftar Laporan</h3>

							{requestListEmpty ? (
								<div className="empty-state empty-state-card">
									<strong>
										{search || statusFilter || priorityFilter
											? "Tidak ada hasil"
											: "Belum ada laporan"}
									</strong>
									<p>
										{search || statusFilter || priorityFilter
											? "Coba ubah kata kunci, status, atau prioritas yang dipilih."
											: "Laporan baru dari Pelapor akan tampil di daftar ini."}
									</p>
								</div>
							) : (
								<div className="request-stack">
									{requests.map((item) => (
										<button
											type="button"
											key={item.id}
											className={
												item.id === selectedRequestId
													? "request-row selected"
													: "request-row"
											}
											onClick={() => loadRequestDetail(item.id)}
										>
											<span className="request-row-main">
												<strong>{item.requestNumber}</strong>
												<span>{item.title}</span>
												<small>
													{item.location} - {item.category}
												</small>
											</span>
											<span className="request-row-meta">
												<span className={badgeClass("status", item.status)}>
													{item.status}
												</span>
												<span className={badgeClass("priority", item.priority)}>
													{item.priority}
												</span>
											</span>
										</button>
									))}
								</div>
							)}
						</section>

						<section className="request-detail" aria-live="polite">
							<h3>Detail Laporan</h3>
							{!selectedRequest ? (
								<div className="empty-state">
									<p>
										{detailMessage ||
											"Pilih laporan dari daftar untuk melihat detail."}
									</p>
									<h4>Riwayat Status</h4>
									<p>Riwayat status akan tampil setelah laporan dipilih.</p>
									<h4>Konfirmasi Pelapor</h4>
									<p>Belum ada konfirmasi Pelapor untuk laporan ini.</p>
									<h4>Catatan Konfirmasi</h4>
									<p>Catatan konfirmasi akan tampil saat laporan RESOLVED.</p>
									<h4>Komentar Publik</h4>
									<p>Komentar publik akan tampil setelah laporan dipilih.</p>
									{canUseInternalNotes && (
										<>
											<h4>Catatan Internal</h4>
											<p>
												Catatan internal hanya tampil untuk Administrator dan
												Teknisi.
											</p>
										</>
									)}
									<h4>Catatan Close</h4>
									<p>Manual override tanpa konfirmasi Pelapor membutuhkan catatan.</p>
									<h4>Catatan Reopen</h4>
									<p>Reopen mengembalikan laporan ke UNDER_REVIEW.</p>
									<button type="button" disabled>
										Tambah Komentar
									</button>
									{canUseInternalNotes && (
										<button type="button" disabled>
											Tambah Catatan Internal
										</button>
									)}
								</div>
							) : (
								<article>
									<header className="detail-header">
										<div>
											<strong>{selectedRequest.requestNumber}</strong>
											<h4>{selectedRequest.title}</h4>
										</div>
										<div className="badge-group">
											<span className={badgeClass("status", selectedRequest.status)}>
												{selectedRequest.status}
											</span>
											<span
												className={badgeClass("priority", selectedRequest.priority)}
											>
												{selectedRequest.priority}
											</span>
										</div>
									</header>

									<dl className="detail-list">
										<div>
											<dt>Lokasi</dt>
											<dd>{selectedRequest.location}</dd>
										</div>
										<div>
											<dt>Kategori</dt>
											<dd>{selectedRequest.category}</dd>
										</div>
										<div>
											<dt>Saran Prioritas Dosen</dt>
											<dd>{selectedRequest.prioritySuggestion ?? "Tidak ada"}</dd>
										</div>
										<div>
											<dt>Pelapor</dt>
											<dd>
												{selectedRequest.reporterName} (
												{selectedRequest.reporterType})
											</dd>
										</div>
										<div>
											<dt>Deskripsi</dt>
											<dd>{selectedRequest.description}</dd>
										</div>
									</dl>

									<section className="status-history">
										<h4>Riwayat Status</h4>
										{selectedRequest.statusHistory.length === 0 ? (
											<p>Belum ada riwayat status.</p>
										) : (
											<ol>
												{selectedRequest.statusHistory.map((history) => (
													<li key={history.id}>
														<strong>{history.toStatus}</strong>
														<span>
															{history.fromStatus
																? ` dari ${history.fromStatus}`
																: " status awal"}
														</span>
														<small>
															{history.changedByRole} - {history.note}
														</small>
													</li>
												))}
											</ol>
										)}
									</section>

									<section className="confirmation-panel" aria-live="polite">
										<h4>Konfirmasi Pelapor</h4>
										{selectedRequest.confirmation ? (
											<p className="confirmation-summary">
												Dikonfirmasi oleh{" "}
												{selectedRequest.confirmation.confirmedByRole} pada{" "}
												{selectedRequest.confirmation.confirmedAt}
												{selectedRequest.confirmation.confirmationNote
													? `: ${selectedRequest.confirmation.confirmationNote}`
													: "."}
											</p>
										) : (
											<p className="empty-state">
												Belum ada konfirmasi Pelapor untuk laporan ini.
											</p>
										)}

										{activeRole === "REPORTER" &&
											selectedRequest.status === "RESOLVED" &&
											!selectedRequest.confirmation && (
												<form
													className="communication-form"
													onSubmit={confirmSelectedResolution}
												>
													<label>
														Catatan Konfirmasi
														<textarea
															name="confirmationNote"
															value={confirmationNote}
															onChange={(event) =>
																setConfirmationNote(event.target.value)
															}
															placeholder="Contoh: Perbaikan sudah diterima."
														/>
													</label>
													<button type="submit">Konfirmasi Hasil</button>
												</form>
											)}

										{confirmationMessage && (
											<p className="form-message">{confirmationMessage}</p>
										)}
									</section>

									<section className="communication-panel" aria-live="polite">
										<h4>Komentar Publik</h4>
										{selectedRequest.comments.length === 0 ? (
											<p className="empty-state">Belum ada komentar publik.</p>
										) : (
											<ul className="communication-list">
												{selectedRequest.comments.map((comment) => (
													<li key={comment.id}>
														<strong>{comment.authorRole}</strong>
														<p>{comment.body}</p>
														<small>{comment.createdAt}</small>
													</li>
												))}
											</ul>
										)}

										{activeRole !== "FACILITY_MANAGER" && (
											<form className="communication-form" onSubmit={submitPublicComment}>
												<label>
													Tambah Komentar
													<textarea
														name="commentBody"
														value={commentBody}
														onChange={(event) => setCommentBody(event.target.value)}
														placeholder="Tulis komentar publik untuk laporan ini."
													/>
												</label>
												<button type="submit">Simpan Komentar</button>
											</form>
										)}

										{canUseInternalNotes && (
											<section className="internal-note-panel">
												<h4>Catatan Internal</h4>
												{(selectedRequest.internalNotes ?? []).length === 0 ? (
													<p className="empty-state">Belum ada catatan internal.</p>
												) : (
													<ul className="communication-list">
														{(selectedRequest.internalNotes ?? []).map((note) => (
															<li key={note.id}>
																<strong>{note.authorRole}</strong>
																<p>{note.body}</p>
																<small>{note.createdAt}</small>
															</li>
														))}
													</ul>
												)}

												<form
													className="communication-form"
													onSubmit={submitInternalNote}
												>
													<label>
														Tambah Catatan Internal
														<textarea
															name="internalNoteBody"
															value={internalNoteBody}
															onChange={(event) =>
																setInternalNoteBody(event.target.value)
															}
															placeholder="Tulis catatan internal untuk Administrator atau Teknisi."
														/>
													</label>
													<button type="submit">Simpan Catatan Internal</button>
												</form>
											</section>
										)}

										{communicationMessage && (
											<p className="form-message">{communicationMessage}</p>
										)}
									</section>

									{activeRole === "ADMINISTRATOR" && (
										<section className="admin-actions" aria-live="polite">
											<h4>Aksi Administrator</h4>

											{selectedRequest.status === "SUBMITTED" && (
												<div className="action-block">
													<label>
														Catatan Review
														<textarea
															name="reviewNote"
															value={reviewNote}
															onChange={(event) =>
																setReviewNote(event.target.value)
															}
															placeholder="Contoh: Laporan lengkap dan siap ditinjau."
														/>
													</label>
													<button type="button" onClick={reviewSelectedRequest}>
														Mulai Review
													</button>
												</div>
											)}

											{selectedRequest.status === "UNDER_REVIEW" && (
												<>
													<div className="action-block">
														<label>
															Kategori
															<select
																name="adminCategory"
																value={adminCategory}
																onChange={(event) =>
																	setAdminCategory(event.target.value)
																}
															>
																{categories.map((item) => (
																	<option key={item}>{item}</option>
																))}
															</select>
														</label>

														<label>
															Prioritas
															<select
																name="adminPriority"
																value={adminPriority}
																onChange={(event) =>
																	setAdminPriority(event.target.value)
																}
															>
																{priorities.map((item) => (
																	<option key={item}>{item}</option>
																))}
															</select>
														</label>

														<button
															type="button"
															onClick={classifySelectedRequest}
														>
															Simpan Klasifikasi
														</button>
													</div>

													<div className="action-block">
														<label>
															Teknisi
															<select
																name="selectedTechnicianId"
																value={selectedTechnicianId}
																onChange={(event) =>
																	setSelectedTechnicianId(event.target.value)
																}
															>
																{technicians.map((technician) => (
																	<option key={technician.id} value={technician.id}>
																		{technician.name}
																	</option>
																))}
															</select>
														</label>

														<label>
															Catatan Assignment
															<textarea
																name="assignmentNote"
																value={assignmentNote}
																onChange={(event) =>
																	setAssignmentNote(event.target.value)
																}
																placeholder="Contoh: Tangani sebelum kelas sore."
															/>
														</label>

														<button type="button" onClick={assignSelectedRequest}>
															Tugaskan Teknisi
														</button>
													</div>
												</>
											)}

											{selectedRequest.status === "RESOLVED" && (
												<div className="action-block">
													<label>
														Catatan Close
														<textarea
															name="closeNote"
															value={closeNote}
															onChange={(event) =>
																setCloseNote(event.target.value)
															}
															placeholder="Contoh: Laporan ditutup setelah konfirmasi."
														/>
													</label>

													<label className="checkbox-label">
														<input
															type="checkbox"
															name="manualOverride"
															checked={manualOverride}
															onChange={(event) =>
																setManualOverride(event.target.checked)
															}
														/>
														Manual override tanpa konfirmasi Pelapor
													</label>

													{manualOverride && (
														<label>
															Catatan Manual Override
															<textarea
																name="manualOverrideNote"
																value={manualOverrideNote}
																onChange={(event) =>
																	setManualOverrideNote(event.target.value)
																}
																placeholder="Wajib diisi jika memakai manual override."
															/>
														</label>
													)}

													<button
														type="button"
														className="danger-button"
														onClick={closeSelectedRequest}
													>
														Tutup Laporan
													</button>
												</div>
											)}

											{selectedRequest.status === "CLOSED" && (
												<div className="action-block">
													<label>
														Catatan Reopen
														<textarea
															name="reopenNote"
															value={reopenNote}
															onChange={(event) =>
																setReopenNote(event.target.value)
															}
															placeholder="Contoh: Masalah muncul kembali."
														/>
													</label>
													<button
														type="button"
														className="danger-button"
														onClick={reopenSelectedRequest}
													>
														Buka Kembali
													</button>
												</div>
											)}

											{adminMessage && (
												<p className="form-message">{adminMessage}</p>
											)}
										</section>
									)}
								</article>
							)}
						</section>
					</div>
				</section>
			</section>
		</main>
	);
}
