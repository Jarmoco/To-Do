import { titleFont } from "./fonts"

import style from "../css/section.module.css"

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';

export default function Title({title}) {
    return(
        <h1 className={clsx(style.sectionTitle, titleFont.className)}>{title}</h1>
    )
}