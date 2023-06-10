import { titleFont } from "./fonts"

export default function Title({title}) {
    return(
        <h1 className={titleFont.className}>{title}</h1>
    )
}