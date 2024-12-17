import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'
import eventTicket from '@/images/event_ticket.jpg'
import ButtonPrimary from '@/shared/ButtonPrimary'

export interface CardCategory4Props {
	className?: string
	taxonomy: TaxonomyType
}

const CardCategory4: FC<CardCategory4Props> = ({
	className = '',
	taxonomy,
}) => {
	const { count, name, href = '/', thumbnail, listingType } = taxonomy
	return (
			<><div
			className={`group aspect-h-5 aspect-w-5 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl sm:aspect-h-6`}
		>
			<Image
				src={eventTicket || ''}
				className="h-full w-full rounded-2xl object-cover"
				fill
				alt="archive"
				sizes="(max-width: 400px) 100vw, 400px" />
			<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
		</div><div className="mt-4 truncate px-2 text-center">
				<h2
					className={`truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg`}
				>
					Population affamée en Guinée
				</h2>
				<span
					className={`mt-2 block text-sm text-neutral-600 dark:text-neutral-400`}
				>
					Conakry
				</span>
				<span
					className={`mt-2 block text-sm text-neutral-600 dark:text-neutral-400`}
				>
					400 000 FGN
				</span>
				<span
					className={`mt-2 block text-sm text-neutral-600 dark:text-neutral-400`}
				>
					<ButtonPrimary>Faire un don maintenant </ButtonPrimary>
				</span>
			</div></>
	)
}

export default CardCategory4
