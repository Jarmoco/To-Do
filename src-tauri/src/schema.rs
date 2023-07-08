// @generated automatically by Diesel CLI.

diesel::table! {
    tasks (id) {
        id -> Integer,
        title -> Text,
        content -> Nullable<Text>,
        author -> Text,
        expiry -> Nullable<Date>,
        is_done -> Bool,
    }
}
