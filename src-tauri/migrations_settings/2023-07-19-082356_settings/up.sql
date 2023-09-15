CREATE TABLE settings (
    id INTEGER NOT NULL,
	data_database_url VARCHAR DEFAULT NULL,
    username CHAR NOT NULL,
    language CHAR NOT NULL,
    firstrun BOOLEAN NOT NULL DEFAULT '',
    edit_hotkey CHAR NOT NULL,
    CONSTRAINT settings_pk PRIMARY KEY (id)
);