use std::fs;

use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

//pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations_data/");
pub const MIGRATIONS_DATA: EmbeddedMigrations = embed_migrations!("./migrations_data");
pub const MIGRATIONS_SETTINGS: EmbeddedMigrations = embed_migrations!("./migrations_settings");

pub fn data_establish_connection(db_url: &str) -> MysqlConnection {
    // check if db folder exists, if not, create it
    check_db_folder().expect("error checking db folder");

    // Connecting to the database
    let database_url = ("./db/".to_owned() + db_url).to_string();
    MysqlConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn settings_establish_connection() -> MysqlConnection {
    // Connecting to the database
    let database_url = "settings.db".to_string();
    MysqlConnection::establish(&database_url)
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

fn check_db_folder() -> Result<(), std::io::Error> {
    let folder_path = "./db";

    // Check if the folder exists
    if !fs::metadata(&folder_path).is_ok() {
        // Create the folder if it doesn't exist
        fs::create_dir(&folder_path)?;
        println!("DB folder created successfully.");
    } else {
        println!("DB folder exists.");
    }

    Ok(())
}