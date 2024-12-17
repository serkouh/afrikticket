import Image, { StaticImageData } from 'next/image'
import React, { FC, ReactNode } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Badge from '@/shared/Badge'
import eventTicket from '@/images/event_ticket2.jpg'

export interface SectionHeroProps {
	className?: string
	rightImg: StaticImageData
	heading: ReactNode
	subHeading: string
	btnText: string
}

const SectionHero: FC<SectionHeroProps> = ({
	className = '',
	rightImg,
	heading,
	subHeading,
	btnText,
}) => {
	return (
		<div className={`nc-SectionHero relative ${className}`}>
			<div className="relative flex flex-col items-center space-y-14 text-center lg:flex-row lg:space-x-10 lg:space-y-0 lg:text-left">
				<div className="w-screen max-w-full space-y-5 lg:space-y-7 xl:max-w-lg">
					<h2 className="text-3xl font-semibold !leading-tight text-neutral-900 dark:text-neutral-100 md:text-4xl xl:text-5xl">
						Nos Valeurs
					</h2>
					<span className="block text-base text-neutral-600 dark:text-neutral-400 xl:text-lg">
						Chez Afri Ticket, nos valeurs fondamentales guident chacune de nos actions
					</span>
					<ul className="mt-10 space-y-4">
						<li className="flex items-center space-x-4">
							<Badge name="Accessibilité " />
							<span className="font-medium text-neutral-700 dark:text-neutral-300">
								Nous croyons en une participation facile et fluide aux événements et aux dons pour tous
							</span>
						</li>
						<li className="flex items-center space-x-4">
							<Badge name="Accessibilité " />
							<span className="font-medium text-neutral-700 dark:text-neutral-300">
								Nous croyons en une participation facile et fluide aux événements et aux dons pour tous
							</span>
						</li>
						<li className="flex items-center space-x-4">
							<Badge name="Accessibilité " />
							<span className="font-medium text-neutral-700 dark:text-neutral-300">
								Nous croyons en une participation facile et fluide aux événements et aux dons pour tous
							</span>
						</li>
						<li className="flex items-center space-x-4">
							<Badge name="Accessibilité " />
							<span className="font-medium text-neutral-700 dark:text-neutral-300">
								Nous croyons en une participation facile et fluide aux événements et aux dons pour tous
							</span>
						</li>
					</ul>
				</div>
				<div className="flex-grow">
					<Image className="w-full" src={rightImg} alt="" />
				</div>
			</div>

			<div className="relative flex flex-col items-center space-y-14 text-center lg:flex-row lg:space-x-10 lg:space-y-0 lg:text-left">
				<div className="flex-grow">
					<Image className="w-full" src={eventTicket} alt="" />
				</div>
				<div className="w-screen max-w-full space-y-5 lg:space-y-7 xl:max-w-lg">
					<h2 className="text-3xl font-semibold !leading-tight text-neutral-900 dark:text-neutral-100 md:text-4xl xl:text-5xl">
						Notre Mission
					</h2>
					<span className="block text-base text-neutral-600 dark:text-neutral-400 xl:text-lg">
						Notre mission est de connecter les gens à travers les événements et les dons. Nous visons à donner aux organisateurs les outils nécessaires pour vendre des billets et gérer les dons efficacement, tout en garantissant aux participants une expérience simple et sécurisée. En améliorant l’accessibilité, la transparence et le soutien communautaire, Afri Ticket cherche à créer des liens significatifs et un impact positif durable.
					</span>
					{!!btnText && <ButtonPrimary href="/login">{btnText}</ButtonPrimary>}
				</div>

			</div>
		</div>
	)
}

export default SectionHero
