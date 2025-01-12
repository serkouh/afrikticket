import { avatarColors } from '@/contains/contants'
import React, { FC } from 'react'
import avatar1 from '@/images/avatars/Image-1.png'
import Image, { StaticImageData } from 'next/image'
import { CheckIcon } from '@heroicons/react/24/solid'

export interface AvatarProps {
	containerClassName?: string
	sizeClass?: string
	radius?: string
	imgUrl?: string | StaticImageData
	userName?: string
	hasChecked?: boolean
	hasCheckedClass?: string
}

const Avatar: FC<AvatarProps> = ({
	containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
	sizeClass = 'h-6 w-6 text-sm',
	radius = 'rounded-full',
	imgUrl = avatar1,
	userName,
	hasChecked,
	hasCheckedClass = 'w-4 h-4 -top-0.5 -right-0.5',
}) => {
	const url = imgUrl || ''
	const name = userName || 'John Doe'
	const _setBgColor = (name: string) => {
		const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length)
		return avatarColors[backgroundIndex]
	}

	const getSize = () => {
		const match = sizeClass.match(/w-(\d+)/)
		return match ? parseInt(match[1]) * 4 : 24
	}

	// Function to get complete image URL
	const getCompleteImageUrl = (src: string) => {
		if (!src) return ''
		if (src.startsWith('http://') || src.startsWith('https://')) return src
		// For Laravel storage files
		return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${src.replace(/^profile-images\//, '')}`
	}

	return (
		<div
			className={`wil-avatar relative inline-flex flex-shrink-0 items-center justify-center font-semibold uppercase text-neutral-100 shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
			style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
		>
			{url && (
				typeof url === 'string' ? (
					<Image
						className={`absolute inset-0 h-full w-full object-cover ${radius}`}
						src={getCompleteImageUrl(url)}
						alt={name}
						width={getSize()}
						height={getSize()}
						unoptimized
					/>
				) : (
					<Image
						className={`absolute inset-0 h-full w-full object-cover ${radius}`}
						src={url}
						alt={name}
						unoptimized
					/>
				)
			)}
			{(!url || url === '') && <span className="wil-avatar__name">{name[0]}</span>}

			{hasChecked && (
				<span
					className={`absolute flex items-center justify-center rounded-full bg-teal-500 text-xs text-white ${hasCheckedClass}`}
				>
					<CheckIcon className="h-3 w-3" />
				</span>
			)}
		</div>
	)
}

export default Avatar
