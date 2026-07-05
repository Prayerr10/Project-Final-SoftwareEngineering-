CREATE TABLE IF NOT EXISTS reporter_confirmations (
	id TEXT PRIMARY KEY,
	request_id TEXT NOT NULL,
	confirmed_by_role TEXT NOT NULL DEFAULT 'REPORTER' CHECK (confirmed_by_role = 'REPORTER'),
	confirmation_note TEXT,
	confirmed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (request_id) REFERENCES service_requests(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_reporter_confirmations_request_id
ON reporter_confirmations(request_id);

CREATE INDEX IF NOT EXISTS idx_reporter_confirmations_confirmed_at
ON reporter_confirmations(confirmed_at);
