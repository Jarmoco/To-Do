import Image from 'next/image'
import saveIconPicture from '@/public/res/saveIcon.png'

export default function SaveIcon() {
    return (
        <Image
            src={saveIconPicture}
            className={"saveIcon"}
            alt='Save changes'
        />
    )
}