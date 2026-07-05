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
		'240NIkKr71Mnda-H_euwgc8ktfp8foWvyBVt9LLilu8',
		'EYYBLk29Pg7AE1dXvllEwA',
		'pelapor',
		'Pelapor Demo',
		CURRENT_TIMESTAMP
	),
	(
		'user-admin-demo',
		'admin_demo',
		'ORSsibBNIr66H8qitNUnEy6WUueSZcu551wCkX3ODEA',
		'XYdyt5D9Qb3Q_x1BBvGO-g',
		'administrator',
		'Administrator Demo',
		CURRENT_TIMESTAMP
	),
	(
		'tech-audio-visual',
		'teknisi_demo',
		'zSWKGoXh-VtelcdR07Grp-uHZrKrcrLiLrgFN3jCMug',
		'Js15Vfweps9uWERKQPrUhA',
		'teknisi',
		'Nadia Teknisi',
		CURRENT_TIMESTAMP
	),
	(
		'user-manajer-demo',
		'manajer_demo',
		'84-mcPbBFycbnFduNf58uKpa79celUnK26Q5XOp8f_k',
		'BEdZdpOTEOb8Jisd2SErew',
		'manajer_fasilitas',
		'Manajer Fasilitas Demo',
		CURRENT_TIMESTAMP
	);
