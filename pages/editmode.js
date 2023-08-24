/* This is the main page file */
import Title from "@/components/sectionTitle"
import TaskContainer from "@/components/tasks"

//import style from section module 
import style from "../css/section.module.css"

import dynamic from 'next/dynamic';
import useTranslation from "@/intl/translate";
import { textFont } from "@/components/fonts"
import SettingsContainer from "@/components/settings";
import CtrlPressDetector from "@/components/ctrlpress";

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';
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

    return (
        <div className={style.sectionEdit}>
            <Title title={title} />
            <TaskContainer editmode="true"/>
            <p className={clsx(textFont.className, style.pressCTRL)}>{t("pressCTRL")}</p>
            <CtrlPressDetector isEditMode="true"/>
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