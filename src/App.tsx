import { useEffect, useState } from "react";
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

type RequestDetail = ServiceRequest & {
	description: string;
	createdAt: string;
	updatedAt: string;
	statusHistory: StatusHistoryEntry[];
};

type HealthResponse = {
	status?: string;
	checks?: {
		api?: string;
		d1?: string;
	};
};

export default function App() {
	const [requests, setRequests] = useState<ServiceRequest[]>([]);
	const [requestListEmpty, setRequestListEmpty] = useState(true);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [priorityFilter, setPriorityFilter] = useState("");
	const [selectedRequestId, setSelectedRequestId] = useState("");
	const [selectedRequest, setSelectedRequest] = useState<RequestDetail | null>(
		null,
	);
	const [detailMessage, setDetailMessage] = useState("");
	const [reporterName, setReporterName] = useState("");
	const [reporterType, setReporterType] = useState("STUDENT");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [category, setCategory] = useState("Internet");
	const [message, setMessage] = useState("");
	const [foundationStatus, setFoundationStatus] = useState(
		"Memeriksa koneksi API dan D1",
	);

	async function loadRequests() {
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
		);
		const result = await response.json();
		setRequests(result.data ?? []);
		setRequestListEmpty(result.meta?.empty ?? (result.data ?? []).length === 0);
	}

	async function loadRequestDetail(requestId: string) {
		setSelectedRequestId(requestId);
		setDetailMessage("Memuat detail laporan.");
		setSelectedRequest(null);

		const response = await fetch(`/api/requests/${encodeURIComponent(requestId)}`);
		const result = await response.json();

		if (!response.ok) {
			setDetailMessage(result.error?.message ?? "Detail laporan gagal dimuat.");
			return;
		}

		setSelectedRequest(result.data);
		setDetailMessage("");
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
		loadRequests();
	}, []);

	useEffect(() => {
		loadRequests();
	}, [search, statusFilter, priorityFilter]);

	async function submitRequest(event: React.FormEvent) {
		event.preventDefault();
		setMessage("");

		const response = await fetch("/api/requests", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				role: "REPORTER",
				reporterName,
				reporterType,
				title,
				description,
				location,
				category,
			}),
		});

		const result = await response.json();

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

	return (
		<main className="app-shell">
			<section className="page-header">
				<p className="eyebrow">Campus Maintenance</p>
				<h1>Campus Service Request</h1>
				<p>Laporkan masalah fasilitas kampus dan pantau statusnya.</p>
				<section className="foundation-status" aria-live="polite">
					<h2>Status Fondasi</h2>
					<p>{foundationStatus}</p>
				</section>
			</section>

			<section className="content-grid">
				<form className="request-form" onSubmit={submitRequest}>
					<h2>Buat Laporan Baru</h2>

					<label>
						Nama Pelapor
						<input
							value={reporterName}
							onChange={(event) => setReporterName(event.target.value)}
							placeholder="Contoh: Dr. Mira Santoso"
						/>
					</label>

					<label>
						Tipe Pelapor
						<select
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

					<label>
						Judul
						<input
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							placeholder="Contoh: Proyektor ruang 302 rusak"
						/>
					</label>

					<label>
						Deskripsi
						<textarea
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							placeholder="Jelaskan masalah minimal 20 karakter."
						/>
					</label>

					<label>
						Lokasi
						<input
							value={location}
							onChange={(event) => setLocation(event.target.value)}
							placeholder="Contoh: Gedung A, Ruang 302"
						/>
					</label>

					<label>
						Kategori
						<select
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

					<button type="submit">Kirim Laporan</button>
					{message && <p className="form-message">{message}</p>}
				</form>

				<section className="request-workspace" aria-labelledby="workspace-title">
					<div className="workspace-header">
						<div>
							<p className="eyebrow">Request Workspace</p>
							<h2 id="workspace-title">Daftar dan Detail Laporan</h2>
						</div>
						<button type="button" className="secondary-button" onClick={loadRequests}>
							Refresh
						</button>
					</div>

					<div className="filter-bar" aria-label="Filter daftar laporan">
						<label>
							Cari laporan
							<input
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Nomor, judul, lokasi, kategori, pelapor"
							/>
						</label>

						<label>
							Filter Status
							<select
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
								<p className="empty-state">
									{search || statusFilter || priorityFilter
										? "Tidak ada laporan yang cocok dengan pencarian atau filter."
										: "Belum ada laporan."}
								</p>
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
												<span>{item.status}</span>
												<span>{item.priority}</span>
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
								</div>
							) : (
								<article>
									<header className="detail-header">
										<div>
											<strong>{selectedRequest.requestNumber}</strong>
											<h4>{selectedRequest.title}</h4>
										</div>
										<div className="badge-group">
											<span>{selectedRequest.status}</span>
											<span>{selectedRequest.priority}</span>
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
								</article>
							)}
						</section>
					</div>
				</section>
			</section>
		</main>
	);
}
