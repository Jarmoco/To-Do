// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod schema;
mod models;
mod task_ops;

use task_ops::insert_task;
use chrono::NaiveDate;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}

#[tauri::command]
fn greet() {
    println!("if you can read this it means ipc is working");

    match insert_task(
        String::from("prova"), 
        Some(String::from("testo")),
        String::from("jarmoco"), 
        NaiveDate::from_ymd_opt(2023, 8, 15),
        false
    ) {
        Ok(inserted_rows) => {
            println!("Inserted {} row(s)", inserted_rows);
        }
        Err(e) => eprintln!("Error inserting user: {}", e),
    }
}