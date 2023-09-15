/* This is the main page file */
import Title from "@/components/sectionTitle"
import TaskContainer from "@/components/tasks"

//import style from section module 
import style from "../css/section.module.css"

import dynamic from 'next/dynamic';
import useTranslation from "@/intl/translate";
import { textFont } from "@/components/fonts"
import SettingsContainer from "@/components/settings";
import EditModePressDetector from "@/components/ctrlpress";
import { invoke } from "@tauri-apps/api/tauri"


// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';
import { useState } from "react";
//------------------------------------------//
export default function Page() {
    const { t } = useTranslation()

    const DynamicCustomTitleBar = dynamic(() => import('@/components/titlebar'), {
        ssr: false,
    });


    return (
        <div className={style.sectionsContainer}>
            <DynamicCustomTitleBar />
            <MainSection title={t("edittitle")} />
            <SettingsSection title={t("settings")} />
        </div>
    )
}

function MainSection({ title }) {
    const { t } = useTranslation()
    let day = new Date().getDate() + 1
    const [hotkey, setHotkey] = useState("")

    invoke('get_edit_hotkey')
        .then(result => {
            setHotkey(result)
        })
        .catch(error => {
          console.error('Error getting edit mode hotkey:', error);
        });

    return (
        <div className={style.sectionEdit}>
            <Title title={title} />
            <TaskContainer editmode="true" day={day}/>
            <p className={clsx(textFont.className, style.pressCTRL)}>{t("pressHotkeyPre")} {hotkey} {t("pressHotkeyPost")}</p>
            <EditModePressDetector isEditMode="true" />
        </div>
    )
}

function SettingsSection({ title }) {
    return (
        <div className={style.hiddenSettings}>
            <Title title={title} />
            <SettingsContainer />
        </div>
    )
}