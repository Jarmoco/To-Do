import style from "@/css/settings.module.css"
import { textFont } from "./fonts"
import clsx from 'clsx';
import TextInput from "@/components/textInput";
import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri"
import Router from "next/router";
import useTranslation from "@/intl/translate";
import React from 'react';
import { useLanguage } from "@/intl/language";

export default function SettingsContainer() {
    const [resultArray, setResultArray] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    let dbUrl;
    let username;
    let lang;
    let editHotkey;

    const { setLocale } = useLanguage();

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
        lang = dataObject.language;
        editHotkey = dataObject.edit_hotkey;
        setLocale(lang);
    }

    //Save settings to database
    function saveFunction(d_url, u_name, language, e_hk) {
        console.log("saving settings")
        console.log(d_url + "///" + u_name + "///" + language + "///" + e_hk)
        invoke('save_settings', { dbUrl: d_url, username: u_name, language: language, editK: e_hk })
        Router.reload();
    }
    
    return (
        <div className={style.SettingsContainer}>
            {dataFetched && <DatabaseURLSetting databaseUrl={dbUrl} saveFunction={saveFunction}></DatabaseURLSetting>}
            {dataFetched && <UsernameSetting username={username} saveFunction={saveFunction}></UsernameSetting>}
            {dataFetched && <LanguageSetting language={lang} saveFunction={saveFunction}></LanguageSetting>}
            {dataFetched && <EditHotkeySetting editHotkey={editHotkey} saveFunction={saveFunction}></EditHotkeySetting>}
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
            <h3 className={style.genericSettingTitle}>{t("databaseURL")}</h3>
            <div className={style.inputFieldContainer}>
                <TextInput id="title" placeHolder={t("urlplaceholder")} value={inputDbUrl} onChange={handleInputChange} width="18"></TextInput>
                <SaveButton onClick={saveFunction} dbUrl={inputDbUrl} username={"_"} language={"_"} saveHotkey={"_"}></SaveButton>
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
            <h3 className={style.genericSettingTitle}>{t("username")}</h3>
            <div className={style.inputFieldContainer}>
                <TextInput id="title" placeHolder={t("usernameplaceholder")} value={inputUsername} onChange={handleInputChange}  width="10"></TextInput>
                <SaveButton onClick={saveFunction} dbUrl={"_"} username={inputUsername} language={"_"} saveHotkey={"_"}></SaveButton>
            </div>
        </div>
    )
}

function EditHotkeySetting({editHotkey, saveFunction}) {
    const { t } = useTranslation()
    const [inputKey, setInputKey] = useState(editHotkey)

    const componentRef = useRef(null);

    useEffect(() => {
        const handleEvent = (event) => {
            console.log(event.key)
            setInputKey(event.key.toString());
        };
    
        // Attach the event listener to the component's DOM element
        const componentElement = componentRef.current;
        if (componentElement) {
          componentElement.addEventListener('keydown', handleEvent);
        }
    
        // Clean up the event listener when the component unmounts
        return () => {
          if (componentElement) {
            componentElement.removeEventListener('keydown', handleEvent);
          }
        };
      }, []);


    return (
        <div className={clsx(style.genericSetting, style.UsernameSetting, textFont.className)}>
            <h3 className={style.genericSettingTitle}>{t("editmodehotkey")}</h3>
            <div className={style.inputFieldContainer} ref={componentRef}>
                <TextInput id="title" placeHolder={t("edithotkeyplaceholder")} value={inputKey} width="10"></TextInput>
                <SaveButton onClick={saveFunction} dbUrl={"_"} username={"_"} language={"_"} saveHotkey={inputKey}></SaveButton>
            </div>
        </div>
    )
}

function LanguageSetting({language, saveFunction}) {
    const { t } = useTranslation()

    const [selectedLanguage, setSelectedValue] = useState(language); // Set the default value

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className={clsx(style.genericSetting, style.LanguageSetting, textFont.className)}>
            <h3 className={style.genericSettingTitle}>{t("language")}</h3>
            <div className={style.inputFieldContainer}>
                <select name="cars" id="cars" className={style.languageDropdown} value={selectedLanguage} onChange={handleSelectChange}>
                    <option value="en">{t("english")}</option>
                    <option value="it">{t("italian")}</option>
                </select>
                <SaveButton onClick={saveFunction} dbUrl={"_"} username={"_"} language={selectedLanguage} saveHotkey={"_"}></SaveButton>
            </div>
        </div>
    )
}

function SaveButton({ onClick, dbUrl, username, language, saveHotkey }) {
    const { t } = useTranslation()
    function save() {
        onClick(dbUrl, username, language, saveHotkey)
    }

    return (
        <div className={style.SaveButtonOutline}>
            <button onClick={save} className={clsx(style.SaveButton, textFont.className)}>{t("save")}</button>
        </div>
    )
}
