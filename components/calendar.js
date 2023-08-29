import style from "../css/calendar.module.css"
import { textFont } from "@/components/fonts"
import clsx from 'clsx';
import { useEffect, useState } from "react";

export default function ScrollableCalendar() {
    function makeDayArray() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
      
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
        const daysArray = Array.from({ length: lastDayOfMonth }, (_, index) => index + 1);
        return daysArray;
    }

    useEffect(() => {
        // Attach scroll event listener to update scroll position
        const handleScroll = () => {
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const days = makeDayArray();
    return (
        <div className={style.calendarContainer}>
            <div className={style.scrollableCalendar}>
                {days.map((number, index) => (
                    <div
                        key={index}
                        className={clsx(style.currentDayOutline, style.dayOutline)}>
                        <Day number={number} />
                    </div>
                ))}
            </div>
        </div>

    );
}

function Day({ number }) {
    return (
        <div className={clsx(style.day, textFont.className)}>
            {number}
        </div>
    )
}