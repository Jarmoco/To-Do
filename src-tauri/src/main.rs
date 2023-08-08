// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod models;
mod schema_data;
mod schema_settings;
mod task_ops;
mod settings_ops;

use chrono::NaiveDate;
use task_ops::get_tasks;
use task_ops::insert_task;
use settings_ops::update_settings;
use settings_ops::check_settings;
use settings_ops::get_settings;

fn main() {
    // read settings
    //let settings = fetch_settings();
    // extract the value of the data database from settings
    //let data_database_url = extract_data_database_url(settings.first().unwrap().as_str()).unwrap();

    //run_migrations(&data_database_url);
    check_settings();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_tasks, insert, save_settings, fetch_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



#[tauri::command]
fn insert(title: &str, content: &str, author: &str, year: u16, month: u8, day: u8, done: bool, db_url: &str) {
    println!("Command received from frontend: insert task");
    match insert_task(
        String::from(title),
        Some(String::from(content)),
        String::from(author),
        NaiveDate::from_ymd_opt(year.into(), month.into(), day.into()),
        done,
        db_url,
    ) {
        Ok(inserted_rows) => {
            println!("Inserted {} row(s)", inserted_rows);
        }
        Err(e) => eprintln!("Error inserting user: {}", e),
    }
}

#[tauri::command]
fn fetch_tasks(year: u16, month: u8, day: u8, db_url: &str) -> Vec<String> {
    //println!("Getting tasks for YMD: {}/{}/{}", year, month, day);
    let date_filter = NaiveDate::from_ymd_opt(year.into(), month.into(), day.into());

    let mut results: Vec<String> = Vec::new();

    match get_tasks(date_filter, db_url) {
        Ok(tasks) => {
            println!("Displaying {} tasks", tasks.len());
            for task in tasks {
                println!("{:?}", task);
                results.push(task.to_string());
                //println!("testo: {}", task.get_data(2));
            }
        }
        Err(e) => eprintln!("Error reading tasks: {}", e),
    }
    let json_results = serde_json::to_string(&results).expect("Failed to serialize as JSON");
    let parsed_results: Vec<String> =
        serde_json::from_str(&json_results).expect("Failed to parse JSON");

    return parsed_results;
}

#[tauri::command]
fn save_settings(username: &str, db_url: &str) {
    println!("saving settings, new url: {}, new username: {}", db_url, username);
    update_settings(username.to_string(), Some(db_url.to_string()));
}

#[tauri::command]
fn fetch_settings() -> Vec<String> {
    let mut results: Vec<String> = Vec::new();

    match get_settings() {
        Ok(settings) => {
            for setting in settings {
                //println!("{:?}", setting);
                results.push(setting.to_string());
                //println!("testo: {}", task.get_data(2));
            }
        }
        Err(e) => eprintln!("Error reading settings: {}", e),
    }
    let json_results = serde_json::to_string(&results).expect("Failed to serialize settings as JSON");
    let parsed_results: Vec<String> =
        serde_json::from_str(&json_results).expect("Failed to parse settings JSON");

    return parsed_results;
}
