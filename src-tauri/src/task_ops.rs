use crate::models::{NewTask, Task};
use crate::db::data_establish_connection;
use crate::schema_data::tasks;
use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};
use diesel::result::Error;

pub fn insert_task(
    t: String,
    c: Option<String>,
    a: String,
    e: Option<chrono::NaiveDate>,
    d: bool,
    database_url: &str,
) -> Result<usize, Error> {
    println!("Adding task to database...");
    use crate::schema_data::tasks::dsl::*;

    let mut connection = data_establish_connection(database_url);
    let new_task = NewTask {
        title: t,
        content: c,
        author: a,
        expiry: e,
        is_done: d,
    };

    diesel::insert_into(tasks)
        .values(&new_task)
        .execute(&mut connection)
}


pub fn get_tasks(date_filter: Option<chrono::NaiveDate>, database_url: &str,) -> Result<Vec<Task>, Error> {
    use crate::schema_data::tasks::dsl::*;

    let mut connection = data_establish_connection(database_url);
    println!("Date filter: {}", date_filter.unwrap_or_default());
    let results = tasks
        .filter(expiry.eq(date_filter))
        .load::<Task>(&mut connection)?;
    Ok(results)
}

pub fn update(id: i32, status: bool, database_url: &str) {
    //println!("settings update request received");
    let mut connection = data_establish_connection(database_url);
    
    println!("Updating task, id: {}, is done: {:?}", id, status);

    // Update a row
    let updated_row = diesel::update(tasks::table)
        .filter(tasks::id.eq(id)) // Update condition
        .set(tasks::is_done.eq(status))         // Set the new values
        .execute(&mut connection)
        .expect("Error updating row");

    println!("Updated rows: {}", updated_row);
}