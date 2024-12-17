import React, { FC } from 'react'
import rightImgPng from '@/images/our-features.png'
import Image, { StaticImageData } from 'next/image'
import Badge from '@/shared/Badge'

export interface SectionOurFeaturesProps {
	className?: string
	rightImg?: StaticImageData
	type?: 'type1' | 'type2'
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
	className = 'lg:py-14',
	rightImg = rightImgPng,
	type = 'type1',
}) => {
	return (
		<div
			className={`nc-SectionOurFeatures relative flex flex-col items-center ${type === 'type1' ? 'lg:flex-row' : 'lg:flex-row-reverse'
				} ${className}`}
			data-nc-id="SectionOurFeatures"
		>
			<div className="flex-grow">
				<Image src={rightImg} alt="" />
			</div>
			<div
				className={`mt-10 max-w-2xl flex-shrink-0 lg:mt-0 lg:w-2/5 ${type === 'type1' ? 'lg:pl-16' : 'lg:pr-16'
					}`}
			>
				<span className="text-sm uppercase tracking-widest text-gray-400">
					BENnefits
				</span>
				<h2 className="mt-5 text-4xl font-semibold">Afrik Ticket Features</h2>

				<ul className="mt-16 space-y-10">
					<li className="space-y-4">
						<Badge name="Accessibility" />
						<span className="block text-xl font-semibold">
							Accessible Ticketing
						</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							Our platform ensures easy access to event tickets for everyone.
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="green" name="Security " />
						<span className="block text-xl font-semibold">
							Secure Transactions
						</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							We provide a secure way to purchase tickets and support charitable initiatives.
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="red" name="Performance" />
						<span className="block text-xl font-semibold">
							High Performance
						</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							Our platform is optimized for performance to ensure a smooth experience.
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default SectionOurFeatures
