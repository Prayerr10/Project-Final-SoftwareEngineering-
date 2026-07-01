ALTER TABLE service_requests
ADD COLUMN priority_suggestion TEXT CHECK (priority_suggestion IS NULL OR priority_suggestion IN ('HIGH'));

ALTER TABLE service_requests
ADD COLUMN reporter_name TEXT NOT NULL DEFAULT 'Migrated Pelapor';

ALTER TABLE service_requests
ADD COLUMN reporter_type TEXT NOT NULL DEFAULT 'STUDENT' CHECK (reporter_type IN ('STUDENT', 'LECTURER'));

ALTER TABLE service_requests
ADD COLUMN reviewed_at TEXT;

ALTER TABLE service_requests
ADD COLUMN reviewed_by_role TEXT CHECK (reviewed_by_role IS NULL OR reviewed_by_role = 'ADMINISTRATOR');

ALTER TABLE service_requests
ADD COLUMN closed_at TEXT;

ALTER TABLE service_requests
ADD COLUMN closed_by_role TEXT CHECK (closed_by_role IS NULL OR closed_by_role = 'ADMINISTRATOR');

ALTER TABLE service_requests
ADD COLUMN manual_override_used INTEGER NOT NULL DEFAULT 0 CHECK (manual_override_used IN (0, 1));

ALTER TABLE service_requests
ADD COLUMN manual_override_note TEXT;

ALTER TABLE service_requests
ADD COLUMN updated_at TEXT NOT NULL DEFAULT '1970-01-01T00:00:00.000Z';

CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_priority ON service_requests(priority);
CREATE INDEX IF NOT EXISTS idx_service_requests_category ON service_requests(category);
CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_service_requests_reporter_type ON service_requests(reporter_type);

CREATE TABLE IF NOT EXISTS request_status_history (
	id TEXT PRIMARY KEY,
	request_id TEXT NOT NULL,
	from_status TEXT CHECK (from_status IS NULL OR from_status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
	to_status TEXT NOT NULL CHECK (to_status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
	changed_by_role TEXT NOT NULL CHECK (changed_by_role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN')),
	note TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (request_id) REFERENCES service_requests(id)
);

CREATE INDEX IF NOT EXISTS idx_status_history_request_id ON request_status_history(request_id);
CREATE INDEX IF NOT EXISTS idx_status_history_created_at ON request_status_history(created_at);
CREATE INDEX IF NOT EXISTS idx_status_history_to_status ON request_status_history(to_status);

INSERT INTO request_status_history (
	id,
	request_id,
	from_status,
	to_status,
	changed_by_role,
	note,
	created_at
)
SELECT
	'migrated-history-' || id,
	id,
	NULL,
	status,
	'REPORTER',
	'Riwayat awal dibuat saat migrasi Issue #14.',
	created_at
FROM service_requests
WHERE NOT EXISTS (
	SELECT 1
	FROM request_status_history
	WHERE request_status_history.request_id = service_requests.id
);
