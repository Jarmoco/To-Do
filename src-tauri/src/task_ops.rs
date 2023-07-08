use crate::models::NewTask;
use crate::db::establish_connection;
use diesel::RunQueryDsl;
use diesel::result::Error;

pub fn insert_task(
    t: String,
    c: Option<String>,
    a: String,
    e: Option<chrono::NaiveDate>,
    d: bool,
) -> Result<usize, Error> {

    use crate::schema::task::dsl::*;

    let mut connection = establish_connection();
    let new_task = NewTask {
        title: t,
        content: c,
        author: a,
        expiry: e,
        is_done: d,
    };

    diesel::insert_into(task)
        .values(&new_task)
        .execute(&mut connection)
}
