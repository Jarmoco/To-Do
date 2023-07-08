use diesel::Insertable;
use crate::schema::task;

#[derive(Insertable)]
#[diesel(table_name = task)]
pub struct NewTask {
    pub title: String,
    pub content: Option<String>,
    pub author: String,
    pub expiry: Option<chrono::NaiveDate>,
    pub is_done: bool,
}

pub struct Task {
    id: i32,
    title: String,
    content: Option<String>,
    author: String,
    expiry: Option<chrono::NaiveDate>,
    is_done: bool,
}