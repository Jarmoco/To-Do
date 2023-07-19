import style from "@/css/settings.module.css"
import { textFont } from "./fonts"
import clsx from 'clsx';
import TextInput from "@/components/textInput";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri"

export default function SettingsContainer() {
    const [resultArray, setResultArray] = useState([]);
    let dbUrl;

    useEffect(() => {
        invoke('fetch_settings')
            .then(result => {
                // Update the state with the result array
                setResultArray(result)
            })
            .catch(error => {
                // Handle any errors that occurred during the API call
                console.error('Error fetching settings:', error);
            });
    }, [])

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

        //console.log(dbUrl)
    }

    return (
        <div className={style.SettingsContainer}>
            <DatabaseURLSetting databaseUrl={dbUrl}></DatabaseURLSetting>
        </div>
    )
}

function DatabaseURLSetting({databaseUrl}) {
    console.log(databaseUrl)
    const [inputDbUrl, setInputDbUrl] = useState(databaseUrl)
    const [isEnterPressed, setIsEnterPressed] =useState(false)
    

    const handleInputChangeDbUrl = (event) => {
        setInputDbUrl(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setIsEnterPressed(true)
        }
    };

    useEffect(() => {
        if (isEnterPressed) {
            invoke('save_settings', {
                dbUrl: inputDbUrl
            })
        }
      }, [inputDbUrl]);

    return (
        <div className={clsx(style.genericSetting, style.DatabaseURLSetting, textFont.className)}>
            <h3 className={style.genericSettingTitle}>URL Database</h3>
            <div className={style.inputFieldContainer}>
                <TextInput onKeyPress={handleKeyPress} id="title" placeHolder="URL del database, lascia vuoto per connetterti al database locale" value={inputDbUrl} onChange={handleInputChangeDbUrl}></TextInput>
            </div>
        </div>
    )
}
