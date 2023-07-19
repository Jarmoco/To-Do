use diesel::sqlite::SqliteConnection;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

//pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations_data/");
pub const MIGRATIONS_DATA: EmbeddedMigrations = embed_migrations!("./migrations_data");
pub const MIGRATIONS_SETTINGS: EmbeddedMigrations = embed_migrations!("./migrations_settings");

pub fn data_establish_connection() -> SqliteConnection {
    // load environment variables from .env file
    dotenv().expect(".env file not found");

    // Connecting to the database
    let database_url = env::var("DATA_DATABASE_URL").expect("DATA_DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn settings_establish_connection() -> SqliteConnection {
    // load environment variables from .env file
    dotenv().expect(".env file not found");

    // Connecting to the database
    let database_url = env::var("SETTINGS_DATABASE_URL").expect("SETTINGS_DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn run_migrations() {
    let mut data_conn = data_establish_connection();
    let mut settings_conn = settings_establish_connection();
    data_conn.run_pending_migrations(MIGRATIONS_DATA)
        .expect("Message");
    settings_conn.run_pending_migrations(MIGRATIONS_SETTINGS)
        .expect("Message");

}