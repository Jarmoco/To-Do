import style from "../css/firstRunPopup.module.css"
import { textFont } from "./fonts"
import clsx from 'clsx';
import { useState } from 'react';
import useTranslation from "@/intl/translate";

export default function FirstRunPopUp() {
    const { t } = useTranslation()
    const [isVisible, setIsVisible] = useState('null');

    const handleRemoveClick = () => {
        setIsVisible(false);
    };

    if (isVisible == false) {
        return null; // Don't render the component if isVisible is false
    }

    return (
        <div className={style.container}>
            <div className={clsx(style.FirstRunPopUp, textFont.className)}>
                <h1>{t("beforestarting")}</h1>
                <div className={style.warningSection}>
                    <h2>{t("stilltesting")}</h2>
                    <p>{t("expectbugs")}</p>
                </div>

                <span className={style.separator}></span>

                <h2>{t("editmode")}</h2>
                <p>{t("editmodedesc")}</p>

                <span className={style.separator}></span>

                <div className={style.buttonsContainer}>
                    <div className={style.closeButtonOutline}>
                        <button className={style.closeButton} onClick={handleRemoveClick}>{t("close")}</button>
                    </div>
                </div>
            </div>
        </div>

    )
}