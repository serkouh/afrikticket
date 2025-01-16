import React, { FC } from 'react'
import Image from 'next/image'
import ButtonPrimary from '@/shared/ButtonPrimary'
import eventTicket from '@/images/1.jpg'
import Link from 'next/link'


interface FundraisingCardProps {
	data: any
	className?: string
}

const FundraisingCard: FC<FundraisingCardProps> = ({
	data,
	className = '',
}) => {
	const { fundraising, stats } = data

	return (
		<div className={`group relative overflow-hidden rounded-3xl border border-neutral-200 ${className}`}>
			<div className="aspect-h-3 aspect-w-4">
				<Image
					src={
						fundraising.images?.find((img: any) => img.is_main === 1)
							?.image_path
							? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${fundraising.images.find((img: any) => img.is_main === 1).image_path}`
							: eventTicket
					}
					alt={fundraising.title}
					className="h-full w-full rounded-3xl object-cover"
					width={400}
					height={300}
				/>
			</div>

			<div className="space-y-3 p-4">
				<h2 className="text-xl font-semibold">{fundraising.title}</h2>
				<p className="text-neutral-500">{fundraising.organization.name}</p>

				<div className="space-y-3">
					<div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-200">
						<div
							className="bg-primary-600 dark:bg-primary-400 absolute left-0 top-0 h-full"
							style={{ width: `${stats.progress_percentage}%` }}
						/>
					</div>

					<div className="flex justify-between text-sm">
						<span>{stats.total_raised} GF collectés</span>
						<span>Objectif: {fundraising.goal} GF</span>
					</div>

					<div className="text-sm text-neutral-500">
						{stats.total_donors} donateurs
					</div>
				</div>

				<Link href={`/fundraising-detail/${fundraising.id}`} className="flex flex-col">
					<ButtonPrimary>faire un don</ButtonPrimary>
				</Link>
			</div>
		</div>
	)
}

export default FundraisingCard
