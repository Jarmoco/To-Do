import style from "@/css/dateInput.module.css"
import { textFont } from "../fonts"
import clsx from 'clsx';
import useTranslation from "@/intl/translate";

export function MonthSelector({ onMonthSelect, onClick }) {
    function renderMonths() {
        let months = []
        for (let i = 1; i <= 12; i++) {
            months.push(<MonthComponent number={i} key={i} onMonthSelect={onMonthSelect}></MonthComponent>)
        }
        return <div>{months}</div>
    }

    return (
        <div className={clsx(style.genericSelector)} overflow-y="scroll" onClick={onClick}>
            {renderMonths()}
        </div>
    )
}

function MonthComponent({ number, onMonthSelect }) {
    const handleClick = () => {
        const newMonth = number;
        onMonthSelect(newMonth);
    };

    const { t } = useTranslation()

    let month

    if (number == 1) month = t("january")
    if (number == 2) month = t("february")
    if (number == 3) month = t("march")
    if (number == 4) month = t("april")
    if (number == 5) month = t("may")
    if (number == 6) month = t("june")
    if (number == 7) month = t("july")
    if (number == 8) month = t("august")
    if (number == 9) month = t("september")
    if (number == 10) month = t("october")
    if (number == 11) month = t("november")
    if (number == 12) month = t("december")

    //console.log(number)
    return (
        <div onClick={handleClick} className={clsx(style.monthComponent, textFont.className)}>
            <h2>{month}</h2>
        </div>
    )
}
