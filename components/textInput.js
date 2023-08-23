import style from "../css/textInput.module.css"
import { textFont } from "./fonts"
import clsx from 'clsx';

export default function TextInput({id, placeHolder, value, onChange, width}) {
    return(
        <>
            <input 
                type="text" 
                placeholder={placeHolder}
                id={id} 
                spellCheck="false" 
                className={clsx(style.textInput, textFont.className)}
                value={value} 
                onChange={onChange}
                style={{width: width + 'vw'}}
            />
        </>
    )
}

export function TextArea({id, placeHolder, value, onChange, width}) {
    return(
        <>
            <textarea 
                type="text" 
                placeholder={placeHolder}
                id={id} 
                spellCheck="false" 
                className={clsx(style.textInput, style.textInputBig, textFont.className)}
                rows="4" cols="50"
                value={value} 
                onChange={onChange}
                style={{width: width + 'vw'}}
            ></textarea>
        </>
    )
}