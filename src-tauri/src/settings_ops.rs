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

        // since database exists, check if table "settings" exists
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
        // if table doesn't exist we can assume that this is the first time launching the app,
        // so we need to run migrations (to create the data database) and define the settings table
        println!("Settings database doesn't exists");
        run_migrations("data.db");
        init_settings().expect("Error while creating settings table");
    }
}

pub fn update_settings(mut u: String, mut durl: Option<String>, mut lang: String) {
    //println!("settings update request received");
    let mut connection = settings_establish_connection();
    let query = diesel::update(settings.find(1));

    println!("Updating settings, username: {}, data database url: {:?}, language: {}", u, durl, lang);
    //What to do if values are empty
    if durl == Some("".to_string()) {
        durl = Some("data.db".to_string());
    }

    if u == "".to_string() {
        u = "anonymous".to_string();
    }

    if lang == "".to_string() {
        lang = "en".to_string();
    }

    // Choose which value needs to be updated
    if durl != Some("_".to_string()) {
        query
            .set(data_database_url.eq(durl))
            .execute(&mut connection)
            .expect("Error while updating settings");
    } else if u != "_".to_string() {
        query
            .set(username.eq(u))
            .execute(&mut connection)
            .expect("Error while updating settings");
    } else if lang != "_".to_string() {
        query
            .set(language.eq(lang))
            .execute(&mut connection)
            .expect("Error while updating settings"); 
    } else if durl != Some("_".to_string()) && u != "_".to_string() && lang != "_".to_string() {
        // Update all settings
        let updated_settings = Setting {
            id: 1,
            data_database_url: durl,
            username: u,
            language: lang,
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
    let lang: String = "en".to_string();

    let mut connection = settings_establish_connection();
    let new_setting = NewSetting {
        data_database_url: durl,
        username: u,
        language: lang,
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
