import { avatarColors } from '@/contains/contants'
import React, { FC } from 'react'
import avatar1 from '@/images/avatars/Image-1.png'
import Image, { StaticImageData } from 'next/image'
import { CheckIcon } from '@heroicons/react/24/solid'
import DefaultAvatar from '@/components/DefaultAvatar'

export interface AvatarProps {
	containerClassName?: string
	sizeClass?: string
	radius?: string
	imgUrl?: string | StaticImageData | null
	userName?: string
	hasChecked?: boolean
	hasCheckedClass?: string
}

const Avatar: FC<AvatarProps> = ({
	containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
	sizeClass = 'h-10 w-10',
	radius = 'rounded-full',
	imgUrl,
	userName,
	hasChecked,
	hasCheckedClass = 'w-4 h-4 -top-0.5 -right-0.5',
}) => {
	if (!imgUrl) {
		return <DefaultAvatar className={sizeClass} />
	}

	const imageSrc = typeof imgUrl === 'string' 
		? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${imgUrl}`
		: imgUrl

	return (
		<div className={`flex-shrink-0 ${sizeClass}`}>
			<Image
				src={imageSrc}
				alt={userName || "Profile picture"}
				className="h-full w-full rounded-full object-cover"
				width={100}
				height={100}
			/>
		</div>
	)
}

export default Avatar
