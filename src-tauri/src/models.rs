use diesel::{Insertable, AsChangeset, Queryable};
use crate::schema::tasks;

#[derive(Insertable)]
#[diesel(table_name = tasks)]
pub struct NewTask {
    pub title: String,
    pub content: Option<String>,
    pub author: String,
    pub expiry: Option<chrono::NaiveDate>,
    pub is_done: bool,
}

#[derive(Queryable, Debug, AsChangeset)]
pub struct Task {
    id: i32,
    title: String,
    content: Option<String>,
    author: String,
    expiry: Option<chrono::NaiveDate>,
    is_done: bool,
}

// This function returns a single parameter value from the specified task
impl Task {
    pub fn get_data(&self, data_index: u8) -> String{
        match data_index {
            0 => return self.id.to_string(),
            1 => return self.title.clone(),
            2 => return self.content.clone().unwrap(),
            3 => return self.author.clone(),
            4 => return self.expiry.map(|d| format!("{}", d)).unwrap(),
            5 => return self.is_done.to_string(),
            _ => return String::from("error in getting data from task: data_index is outside the accepted values"),
        }
    }
}