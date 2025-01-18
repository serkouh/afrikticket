'use client'

import React, { FC, useEffect, useState } from 'react'
import Heading from '@/shared/Heading'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import PrevBtn from './PrevBtn'
import NextBtn from './NextBtn'
import { variants } from '@/utils/animationVariants'
import { useWindowSize } from 'react-use'

export interface SectionSliderNewCategoriesProps {
	className?: string
	itemClassName?: string
	items: any[]
	renderCard: (index: number) => React.ReactNode
	itemPerRow?: 4 | 5
	heading?: string
	subHeading?: string
	categoryCardType?: 'card4' | 'card5'
	sliderStyle?: 'style1' | 'style2'
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
	className = '',
	itemClassName = '',
	items = [],
	renderCard,
	itemPerRow = 4,
	heading,
	subHeading,
	categoryCardType = 'card4',
	sliderStyle = 'style1'
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [numberOfItems, setNumberOfitem] = useState(0)

	const windowWidth = useWindowSize().width
	useEffect(() => {
		if (windowWidth < 320) {
			return setNumberOfitem(1)
		}
		if (windowWidth < 500) {
			return setNumberOfitem(itemPerRow - 3)
		}
		if (windowWidth < 1024) {
			return setNumberOfitem(itemPerRow - 2)
		}
		if (windowWidth < 1280) {
			return setNumberOfitem(itemPerRow - 1)
		}

		setNumberOfitem(itemPerRow)
	}, [itemPerRow, windowWidth])

	const changeItemId = (index: number) => {
		setDirection(index > currentIndex ? 1 : -1)
		setCurrentIndex(index)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentIndex < items.length - numberOfItems) {
				changeItemId(currentIndex + 1)
			}
		},
		onSwipedRight: () => {
			if (currentIndex > 0) {
				changeItemId(currentIndex - 1)
			}
		},
		trackMouse: true,
	})

	if (!numberOfItems || items.length === 0) return null

	return (
		<div className={`nc-SectionSliderNewCategories ${className}`}>
			{heading && (
				<Heading desc={subHeading}>
					{heading}
				</Heading>
			)}
			<MotionConfig
				transition={{
					x: { type: 'spring', stiffness: 300, damping: 30 },
					opacity: { duration: 0.2 },
				}}
			>
				<div className={`relative flow-root`} {...handlers}>
					<div className={`flow-root overflow-hidden rounded-xl`}>
						<motion.ul
							initial={false}
							className="relative -mx-2 whitespace-nowrap xl:-mx-4"
						>
							<AnimatePresence initial={false} custom={direction}>
								{items.map((_, index) => (
									<motion.li
										className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
										custom={direction}
										initial={{
											x: `${(currentIndex - 1) * -100}%`,
										}}
										animate={{
											x: `${currentIndex * -100}%`,
										}}
										variants={variants(200, 1)}
										key={index}
										style={{
											width: `calc(1/${numberOfItems} * 100%)`,
										}}
									>
										{renderCard(index)}
									</motion.li>
								))}
							</AnimatePresence>
						</motion.ul>
					</div>

					{currentIndex > 0 && (
						<PrevBtn
							onClick={() => changeItemId(currentIndex - 1)}
							className="absolute -left-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-left-6 xl:h-12 xl:w-12"
						/>
					)}

					{items.length > currentIndex + numberOfItems && (
						<NextBtn
							onClick={() => changeItemId(currentIndex + 1)}
							className="absolute -right-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-right-6 xl:h-12 xl:w-12"
						/>
					)}
				</div>
			</MotionConfig>
		</div>
	)
}

export default SectionSliderNewCategories
