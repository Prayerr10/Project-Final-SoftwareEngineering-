import { useEffect, useState } from "react";
import "./App.css";

type ServiceRequest = {
	id: string;
	request_number: string;
	title: string;
	location: string;
	category: string;
	priority: string;
	status: string;
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
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [category, setCategory] = useState("Internet");
	const [message, setMessage] = useState("");
	const [foundationStatus, setFoundationStatus] = useState(
		"Memeriksa koneksi API dan D1",
	);

	async function loadRequests() {
		const response = await fetch("/api/requests");
		const result = await response.json();
		setRequests(result.data ?? []);
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

	async function submitRequest(event: React.FormEvent) {
		event.preventDefault();
		setMessage("");

		const response = await fetch("/api/requests", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title,
				description,
				location,
				category,
			}),
		});

		const result = await response.json();

		if (!response.ok) {
			setMessage(result.error ?? "Laporan gagal dibuat.");
			return;
		}

		setMessage(`Laporan berhasil dibuat: ${result.requestNumber}`);
		setTitle("");
		setDescription("");
		setLocation("");
		await loadRequests();
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

				<section className="request-list">
					<h2>Daftar Laporan</h2>

					{requests.length === 0 ? (
						<p className="empty-state">Belum ada laporan.</p>
					) : (
						<div className="table-wrap">
							<table>
								<thead>
									<tr>
										<th>Nomor</th>
										<th>Judul</th>
										<th>Lokasi</th>
										<th>Kategori</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{requests.map((item) => (
										<tr key={item.id}>
											<td>{item.request_number}</td>
											<td>{item.title}</td>
											<td>{item.location}</td>
											<td>{item.category}</td>
											<td>{item.status}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>
			</section>
		</main>
	);
}
