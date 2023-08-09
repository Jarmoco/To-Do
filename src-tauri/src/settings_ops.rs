use crate::db::run_migrations;
use crate::db::settings_establish_connection;
use crate::models::{NewSetting, Setting};
use crate::schema_settings::settings::dsl::*;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::Text;
use diesel::QueryDsl;
use diesel::{ExpressionMethods, RunQueryDsl};
use std::path::Path;

#[allow(dead_code)]
#[derive(QueryableByName)]
struct TableName {
    #[diesel(sql_type = Text)]
    name: String,
}

pub fn check_settings() {
    let path = Path::new("./settings.db");

    // Check if settings database exists
    if path.exists() {
        println!("Settings database exists");

        let mut connection = settings_establish_connection();
        let query = format!(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='{}'",
            "settings"
        );
        //let result: Result<usize, Error> = diesel::sql_query(query).execute(&mut connection);

        let table_name = "settings";
        let results: Vec<TableName> = diesel::sql_query(query)
            .load(&mut connection)
            .expect("Error loading data");
        if results.is_empty() {
            println!("Table {} does not exist", table_name);
            // Since this code runs only when settings.db needs to be created, we can set data.db as the url
            run_migrations("data.db");
            init_settings().expect("Error while creating settings table");
        } else {
            println!("Table {} exists", table_name);
        }

    } else {
        println!("Settings database doesn't exists");
        run_migrations("data.db");
        init_settings().expect("Error while creating settings table");
    }
}

pub fn update_settings(mut u: String, mut durl: Option<String>) {
    //println!("settings update request received");
    let mut connection = settings_establish_connection();
    let query = diesel::update(settings.find(1));

    println!("Updating settings, username: {}, data database url: {:?}", u, durl);
    //What to do if values are empty
    if durl == Some("".to_string()) {
        durl = Some("data.db".to_string());
    }

    if u == "".to_string() {
        u = "anonymous".to_string();
    }

    // Choose which value needs to be updated
    if u == "_".to_string() {
        query
            .set(data_database_url.eq(durl))
            .execute(&mut connection)
            .expect("Error while updating settings");
    } else if durl == Some("_".to_string()) {
        query
            .set(username.eq(u))
            .execute(&mut connection)
            .expect("Error while updating settings");
    } else {
        // Update all settings
        let updated_settings = Setting {
            id: 1,
            data_database_url: durl,
            username: u,
        };

        query
            .set(&updated_settings)
            .execute(&mut connection)
            .expect("Error while updating settings");
    }
}

pub fn init_settings() -> Result<usize, Error> {
    let u: String = "guest".to_string();
    let durl: Option<String> = Some("data.db".to_string());

    let mut connection = settings_establish_connection();
    let new_setting = NewSetting {
        data_database_url: durl,
        username: u,
    };

    diesel::insert_into(settings)
        .values(&new_setting)
        .execute(&mut connection)
}

pub fn get_settings() -> Result<Vec<Setting>, Error> {
    let mut connection = settings_establish_connection();

    let results = settings.load::<Setting>(&mut connection)?;
    Ok(results)
}
