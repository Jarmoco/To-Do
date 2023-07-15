import style from "@/css/dateInput.module.css"
import { textFont } from "../fonts"
import clsx from 'clsx';

export function DayInput({selectedDay, onClick}) {
    return (
        <div onClick={onClick}>
            <h2 className={clsx(style.genericInput, textFont.className)}>{selectedDay}</h2>
        </div>
    )
}

export function MonthInput({selectedMonth, onClick}) {

    let mese

    if (selectedMonth == 1) mese = "Gennaio"
    if (selectedMonth == 2) mese = "Febbraio"
    if (selectedMonth == 3) mese = "Marzo"
    if (selectedMonth == 4) mese = "Aprile"
    if (selectedMonth == 5) mese = "Maggio"
    if (selectedMonth == 6) mese = "Giugno"
    if (selectedMonth == 7) mese = "Luglio"
    if (selectedMonth == 8) mese = "Agosto"
    if (selectedMonth == 9) mese = "Settembre"
    if (selectedMonth == 10) mese = "Ottobre"
    if (selectedMonth == 11) mese = "Novembre"
    if (selectedMonth == 12) mese = "Dicembre"

    return (
        <div onClick={onClick}>
            <h2 className={clsx(style.genericInput, style.monthInput, textFont.className)}>{mese}</h2>
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

