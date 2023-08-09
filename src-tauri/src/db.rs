use diesel::sqlite::SqliteConnection;
use diesel::prelude::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

//pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations_data/");
pub const MIGRATIONS_DATA: EmbeddedMigrations = embed_migrations!("./migrations_data");
pub const MIGRATIONS_SETTINGS: EmbeddedMigrations = embed_migrations!("./migrations_settings");

pub fn data_establish_connection(db_url: &str) -> SqliteConnection {
    // Connecting to the database
    let database_url = db_url.to_string();
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn settings_establish_connection() -> SqliteConnection {
    // Connecting to the database
    let database_url = "settings.db".to_string();
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn run_migrations(db_url: &str) {
    let mut data_conn = data_establish_connection(db_url);
    let mut settings_conn = settings_establish_connection();
    data_conn.run_pending_migrations(MIGRATIONS_DATA)
        .expect("Message");
    println!("Data migrations completed");
    settings_conn.run_pending_migrations(MIGRATIONS_SETTINGS)
        .expect("Message");
    println!("Settings migrations completed");
    println!("All migrations completed successfully");
}