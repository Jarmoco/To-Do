import style from "@/css/dateInput.module.css"
import { textFont } from "../fonts"
import clsx from 'clsx';

export function YearSelector({ onYearSelect, onClick }) {
    function renderYears() {
        let years = []
        let currentYear = parseInt(new Date().getFullYear())
        for (let i = (currentYear - 5); i <= (currentYear + 5); i++) {
            years.push(<YearComponent number={i} key={i} onYearSelect={onYearSelect}></YearComponent>)
        }
        return <div>{years}</div>
    }

    return (
        <div className={clsx(style.genericSelector)} overflow-y="scroll" onClick={onClick}>
            {renderYears()}
        </div>
    )
}

function YearComponent({ number, onYearSelect }) {
    const handleClick = () => {
        const newYear = number;
        onYearSelect(newYear);
    };

    return (
        <div onClick={handleClick} className={clsx(style.YearComponent, textFont.className)}>
            <h2>{number}</h2>
        </div>
    )
}
