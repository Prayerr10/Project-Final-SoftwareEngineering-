CREATE TABLE IF NOT EXISTS request_comments (
	id TEXT PRIMARY KEY,
	request_id TEXT NOT NULL,
	author_role TEXT NOT NULL CHECK (author_role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN')),
	body TEXT NOT NULL,
	visibility TEXT NOT NULL DEFAULT 'PUBLIC' CHECK (visibility = 'PUBLIC'),
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (request_id) REFERENCES service_requests(id)
);

CREATE INDEX IF NOT EXISTS idx_request_comments_request_id ON request_comments(request_id);
CREATE INDEX IF NOT EXISTS idx_request_comments_created_at ON request_comments(created_at);

CREATE TABLE IF NOT EXISTS request_internal_notes (
	id TEXT PRIMARY KEY,
	request_id TEXT NOT NULL,
	author_role TEXT NOT NULL CHECK (author_role IN ('ADMINISTRATOR', 'TECHNICIAN')),
	body TEXT NOT NULL,
	visibility TEXT NOT NULL DEFAULT 'INTERNAL' CHECK (visibility = 'INTERNAL'),
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (request_id) REFERENCES service_requests(id)
);

CREATE INDEX IF NOT EXISTS idx_internal_notes_request_id ON request_internal_notes(request_id);
CREATE INDEX IF NOT EXISTS idx_internal_notes_created_at ON request_internal_notes(created_at);
