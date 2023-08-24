import Image from 'next/image'
import trashBinPicture from '@/public/res/trashBinIcon.png'

export default function TrashBinIcon() {
    return (
        <Image
            src={trashBinPicture}
            className={"trashBinIcon"}
            alt='Delete task Icon'
        />
    )
}