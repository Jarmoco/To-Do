import style from "@/css/dateInput.module.css"
import { textFont } from "../fonts"
import clsx from 'clsx';
import useTranslation from "@/intl/translate";

export function DayInput({selectedDay, onClick}) {
    return (
        <div onClick={onClick}>
            <h2 className={clsx(style.genericInput, textFont.className)}>{selectedDay}</h2>
        </div>
    )
}

export function MonthInput({selectedMonth, onClick}) {
    const { t } = useTranslation()

    let month

    if (selectedMonth == 1) month = t("january")
    if (selectedMonth == 2) month = t("february")
    if (selectedMonth == 3) month = t("march")
    if (selectedMonth == 4) month = t("april")
    if (selectedMonth == 5) month = t("may")
    if (selectedMonth == 6) month = t("june")
    if (selectedMonth == 7) month = t("july")
    if (selectedMonth == 8) month = t("august")
    if (selectedMonth == 9) month = t("september")
    if (selectedMonth == 10) month = t("october")
    if (selectedMonth == 11) month = t("november")
    if (selectedMonth == 12) month = t("december")

    return (
        <div onClick={onClick}>
            <h2 className={clsx(style.genericInput, style.monthInput, textFont.className)}>{month}</h2>
        </div>
    )
}

export function YearInput({selectedYear, onClick}) {
    return (
        <div onClick={onClick}>
            <h2 className={clsx(style.genericInput, textFont.className)}>{selectedYear}</h2>
        </div>
    )
}

