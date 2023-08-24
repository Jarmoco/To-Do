import Image from 'next/image'
import downArrowPicture from '@/public/res/downArrow.png'

export default function DownArrow() {
    return (
        <Image
            src={downArrowPicture}
            className={"downArrow"}
            alt='Scroll down Icon'
        />
    )
}