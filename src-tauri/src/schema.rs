// @generated automatically by Diesel CLI.

use diesel::table;

table! {
    task (id) {
        id -> Integer,
        title -> Text,
        content -> Nullable<Text>,
        author -> Text,
        expiry -> Nullable<Date>,
        is_done -> Bool,
    }
}
