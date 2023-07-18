// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod models;
mod schema;
mod task_ops;

use crate::db::run_migrations;
use chrono::NaiveDate;
use task_ops::get_tasks;
use task_ops::insert_task;


fn main() {
    run_migrations();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_tasks, insert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



#[tauri::command]
fn insert(title: &str, content: &str, author: &str, year: u16, month: u8, day: u8, done: bool) {
    match insert_task(
        String::from(title),
        Some(String::from(content)),
        String::from(author),
        NaiveDate::from_ymd_opt(year.into(), month.into(), day.into()),
        done,
    ) {
        Ok(inserted_rows) => {
            println!("Inserted {} row(s)", inserted_rows);
        }
        Err(e) => eprintln!("Error inserting user: {}", e),
    }
}

#[tauri::command]
fn fetch_tasks(year: u16, month: u8, day: u8) -> Vec<String> {
    //println!("Getting tasks for YMD: {}/{}/{}", year, month, day);
    let date_filter = NaiveDate::from_ymd_opt(year.into(), month.into(), day.into());

    let mut results: Vec<String> = Vec::new();

    match get_tasks(date_filter) {
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
