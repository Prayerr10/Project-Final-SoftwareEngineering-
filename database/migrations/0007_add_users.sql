CREATE TABLE IF NOT EXISTS users (
	id TEXT PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password_hash TEXT NOT NULL,
	salt TEXT NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('pelapor', 'administrator', 'teknisi', 'manajer_fasilitas')),
	display_name TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

INSERT OR REPLACE INTO users (
	id,
	username,
	password_hash,
	salt,
	role,
	display_name,
	created_at
)
VALUES
	(
		'user-pelapor-demo',
		'pelapor_demo',
		'8RDVYQtGjnyq48wl7JnhpfKgcAf4bmx5g72VW4kLuOY',
		'EYYBLk29Pg7AE1dXvllEwA',
		'pelapor',
		'Pelapor Demo',
		CURRENT_TIMESTAMP
	),
	(
		'user-admin-demo',
		'admin_demo',
		'2P-rEal2EXwTUUYFkEQcB0pfFBt8xVdGfLDeRTBrkYw',
		'XYdyt5D9Qb3Q_x1BBvGO-g',
		'administrator',
		'Administrator Demo',
		CURRENT_TIMESTAMP
	),
	(
		'tech-audio-visual',
		'teknisi_demo',
		'5x4qcS7gdBoJ8Bdhkfyu6M5O-mQE7mK9Mn7Y3Z9aXYY',
		'Js15Vfweps9uWERKQPrUhA',
		'teknisi',
		'Nadia Teknisi',
		CURRENT_TIMESTAMP
	),
	(
		'user-manajer-demo',
		'manajer_demo',
		'fZxV8CB6w9WaABM_NIx32To3bjNzYFJ3deIz6jf4Pr8',
		'BEdZdpOTEOb8Jisd2SErew',
		'manajer_fasilitas',
		'Manajer Fasilitas Demo',
		CURRENT_TIMESTAMP
	);
