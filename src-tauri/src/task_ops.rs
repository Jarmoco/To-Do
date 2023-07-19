use crate::models::{NewTask, Task};
use crate::db::data_establish_connection;
use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};
use diesel::result::Error;

pub fn insert_task(
    t: String,
    c: Option<String>,
    a: String,
    e: Option<chrono::NaiveDate>,
    d: bool,
) -> Result<usize, Error> {

    use crate::schema_data::tasks::dsl::*;

    let mut connection = data_establish_connection();
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


pub fn get_tasks(date_filter: Option<chrono::NaiveDate>) -> Result<Vec<Task>, Error> {
    use crate::schema_data::tasks::dsl::*;

    let mut connection = data_establish_connection();
    println!("Date filter: {}", date_filter.unwrap_or_default());
    let results = tasks
        .filter(expiry.eq(date_filter))
        .load::<Task>(&mut connection)?;
    Ok(results)
}