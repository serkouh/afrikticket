import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import Image from 'next/image'
import eventTicket from '@/images/event_ticket.jpg'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { Route } from '@/routers/types'

export interface CardCategory4Props {
	className?: string
	taxonomy: TaxonomyType
}

const CardCategory4: FC<CardCategory4Props> = ({
	className = '',
	taxonomy,
}) => {
	const { count, name, href = '/' as Route, thumbnail, organization, current, stats } = taxonomy
	return (
		<>
			<div className="group aspect-h-5 aspect-w-5 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl sm:aspect-h-6">
				<Image
					src={thumbnail || eventTicket}
					className="h-full w-full rounded-2xl object-cover"
					fill
					alt={name}
					sizes="(max-width: 400px) 100vw, 400px"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
			<div className="mt-4 truncate px-2 text-center">
				<h2 className="truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg">
					{name}
				</h2>
				<span className="mt-2 block text-sm text-neutral-600 dark:text-neutral-400">
					{organization?.name}
				</span>
				<div className="mt-2 space-y-1">
					<div className="relative w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
						<div 
							className="absolute left-0 top-0 h-full bg-primary-6000"
							style={{ width: `${stats?.progress_percentage || 0}%` }}
						/>
					</div>
					<span className="text-sm text-neutral-600 dark:text-neutral-400">
						{`${current} / ${count} FG (${stats?.progress_percentage || 0}%)`}
					</span>
					{/* <span className="block text-xs text-neutral-500">
						{`${stats?.total_donors || 0} donateurs`}
					</span> */}
				</div>
				<span className="mt-4 block">
					<ButtonPrimary href={href as Route}>Faire un don maintenant</ButtonPrimary>
				</span>
			</div>
		</>
	)
}

export default CardCategory4
