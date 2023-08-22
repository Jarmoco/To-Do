import style from "@/css/settings.module.css"
import { textFont } from "./fonts"
import clsx from 'clsx';
import TextInput from "@/components/textInput";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri"
import Router from "next/router";
import useTranslation from "@/intl/translate";

export default function SettingsContainer() {
    const [resultArray, setResultArray] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    let dbUrl;
    let username;

    //Fetch settings from the database
    useEffect(() => {
        invoke('fetch_settings')
            .then(result => {
                // Update the state with the result array
                setResultArray(result)
                //After all the values are fetched, set this to true to render the settings components
                setDataFetched(true);
            })
            .catch(error => {
                // Handle any errors that occurred during the API call
                console.error('Error fetching settings:', error);
            });
    }, [])

    //Parse the settings string into key-value pairs
    for (let i = 0; i < resultArray.length; i++) {
        let settingString = resultArray[i].toString()
        settingString = settingString.replace('Setting: ', '');

        // Extracting the key-value pairs from the string
        const keyValuePairs = settingString
            .split(',')
            .map((pair) => pair.trim())
            .map((pair) => pair.split('='))
            .map(([key, value]) => [key.trim(), value.trim()]);

        // Creating an object from the key-value pairs
        const dataObject = Object.fromEntries(keyValuePairs);
        dbUrl = dataObject.data_database_url;
        username = dataObject.username;
    }

    //Save settings to database
    function saveFunction(d_url, u_name) {
        console.log("saving settings")
        console.log(d_url + "///" + u_name)
        invoke('save_settings', {dbUrl: d_url, username: u_name})
        Router.reload();
    }

    return (
        <div className={style.SettingsContainer}>
            {dataFetched && <DatabaseURLSetting databaseUrl={dbUrl} saveFunction={saveFunction}></DatabaseURLSetting>}
            {dataFetched && <UsernameSetting username={username} saveFunction={saveFunction}></UsernameSetting>}
        </div>
    )
}

function DatabaseURLSetting({ databaseUrl, saveFunction }) {
    const { t } = useTranslation()
    const [inputDbUrl, setInputDbUrl] = useState(databaseUrl)

    const handleInputChange = (event) => {
        setInputDbUrl(event.target.value);
    };

    return (
        <div className={clsx(style.genericSetting, style.DatabaseURLSetting, textFont.className)}>
            <h3 className={style.genericSettingTitle}>URL Database</h3>
            <div className={style.inputFieldContainer}>
                <TextInput id="title" placeHolder={t("urlplaceholder")} value={inputDbUrl} onChange={handleInputChange}></TextInput>
                <SaveButton onClick={saveFunction} dbUrl={inputDbUrl} username={"_"}></SaveButton>
            </div>
        </div>
    )
}

function UsernameSetting({ username, saveFunction }) {
    const { t } = useTranslation()
    const [inputUsername, setInputUsername] = useState(username)

    const handleInputChange = (event) => {
        setInputUsername(event.target.value);
    };

    return (
        <div className={clsx(style.genericSetting, style.UsernameSetting, textFont.className)}>
            <h3 className={style.genericSettingTitle}>Username</h3>
            <div className={style.inputFieldContainer}>
                <TextInput id="title" placeHolder={t("usernameplaceholder")} value={inputUsername} onChange={handleInputChange}></TextInput>
                <SaveButton onClick={saveFunction} dbUrl={"_"} username={inputUsername}></SaveButton>
            </div>
        </div>
    )
}

function SaveButton({onClick, dbUrl, username}) {
    function save() {
        onClick(dbUrl, username)
    }

    return (
        <div className={style.SaveButtonOutline}>
            <button onClick={save} className={clsx(style.SaveButton, textFont.className)}>Salva</button>
        </div>
    )
}
