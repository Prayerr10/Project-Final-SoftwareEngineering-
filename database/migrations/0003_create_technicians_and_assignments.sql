CREATE TABLE IF NOT EXISTS technicians (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	specialization TEXT,
	is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_technicians_active ON technicians(is_active);
CREATE INDEX IF NOT EXISTS idx_technicians_name ON technicians(name);

CREATE TABLE IF NOT EXISTS request_assignments (
	id TEXT PRIMARY KEY,
	request_id TEXT NOT NULL,
	technician_id TEXT NOT NULL,
	assigned_by_role TEXT NOT NULL DEFAULT 'ADMINISTRATOR' CHECK (assigned_by_role = 'ADMINISTRATOR'),
	assigned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	accepted_at TEXT,
	is_current INTEGER NOT NULL DEFAULT 1 CHECK (is_current IN (0, 1)),
	FOREIGN KEY (request_id) REFERENCES service_requests(id),
	FOREIGN KEY (technician_id) REFERENCES technicians(id)
);

CREATE INDEX IF NOT EXISTS idx_request_assignments_request_id ON request_assignments(request_id);
CREATE INDEX IF NOT EXISTS idx_request_assignments_technician_id ON request_assignments(technician_id);
CREATE INDEX IF NOT EXISTS idx_request_assignments_current ON request_assignments(request_id, is_current);
CREATE INDEX IF NOT EXISTS idx_request_assignments_workload ON request_assignments(technician_id, is_current);
CREATE UNIQUE INDEX IF NOT EXISTS idx_request_assignments_one_current
ON request_assignments(request_id)
WHERE is_current = 1;

INSERT OR IGNORE INTO technicians (
	id,
	name,
	specialization,
	is_active,
	created_at,
	updated_at
)
VALUES
	(
		'tech-audio-visual',
		'Nadia Teknisi',
		'Audio visual dan peralatan kelas',
		1,
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		'tech-building-services',
		'Bima Teknisi',
		'AC dan fasilitas ruangan',
		1,
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		'tech-network',
		'Sari Teknisi',
		'Jaringan dan internet',
		1,
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	);
