import Image from 'next/image'
import downArrowPicture from '@/res/downArrow.png'

export default function DownArrow() {
    return (
        <Image
            src={downArrowPicture}
            width={40}
            className={"downArrow"}
            alt='Scroll down Icon'
        />
    )
}