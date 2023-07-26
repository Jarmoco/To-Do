use crate::db::settings_establish_connection;
use crate::models::{NewSetting, Setting};
use crate::schema_settings::settings;
use diesel::result::Error;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

pub fn check_settings() {
    let mut conn = settings_establish_connection();

    // Query the table to check if it's empty
    let is_table_empty = settings::table
        .select(diesel::dsl::count_star())
        .get_result::<i64>(&mut conn)
        .expect("Error querying the table")
        .eq(&0);

    if is_table_empty {
        println!("The table is empty");
        init_settings().expect("Error while creating settings table");
    }
}

pub fn update_settings(mut u: String, mut durl: Option<String>) {
    use crate::schema_settings::settings::dsl::*;
    //println!("settings update request received");
    let mut connection = settings_establish_connection();
    let query = diesel::update(settings.find(1));

    //What to do if values are empty
    if durl == Some("".to_string()) {
        durl = Some("data.db".to_string());
    }

    if u == "".to_string() {
        u = "anonymous".to_string();
    }

    // Choose which value needs to be updated
    if u == "_".to_string() {
        query.set(data_database_url.eq(durl))
            .execute(&mut connection)
            .expect("Error while updating settings");
    } else if durl == Some("_".to_string()) {
        query.set(username.eq(u))
            .execute(&mut connection)
            .expect("Error while updating settings");
    } else {
        // Update all settings
        let updated_settings = Setting {
            id: 1,
            data_database_url: durl,
            username: u,
        };

        query.set(&updated_settings)
            .execute(&mut connection)
            .expect("Error while updating settings");
    }
}

pub fn init_settings() -> Result<usize, Error> {
    use crate::schema_settings::settings::dsl::*;

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
    use crate::schema_settings::settings::dsl::*;

    let mut connection = settings_establish_connection();

    let results = settings.load::<Setting>(&mut connection)?;
    Ok(results)
}
