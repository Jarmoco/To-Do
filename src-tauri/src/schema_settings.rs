// @generated automatically by Diesel CLI.

diesel::table! {
    settings (id) {
        id -> Integer,
        data_database_url -> Nullable<Text>,
        username -> Text,
        language -> Text,
    }
}
