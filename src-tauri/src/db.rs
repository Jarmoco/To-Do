use diesel::sqlite::SqliteConnection;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub fn establish_connection() -> SqliteConnection {
    // load environment variables from .env file
    dotenv().expect(".env file not found");

    // Connecting to the database
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn run_migrations() {
    let mut conn = establish_connection();
    conn.run_pending_migrations(MIGRATIONS)
        .expect("Message");
}