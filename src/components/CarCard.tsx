import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ButtonPrimary from '@/shared/ButtonPrimary'
import eventTicket from '@/images/1.jpg'

export interface CarCardProps {
	className?: string
	data?: any
	size?: 'default' | 'small'
}

const CarCard: FC<CarCardProps> = ({
	size = 'default',
	className = '',
	data,
}) => {
	
	// Helper function to format time in 24h format without seconds
	const formatTime = (dateString: string) => {
		return new Date(dateString).toLocaleTimeString('fr-FR', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric'
		});
	}

	const renderSliderGallery = () => {
		return (
			<div className="relative w-full overflow-hidden rounded-2xl">
				<div className="aspect-h-9 aspect-w-16">
					<Image
						fill
						src={data.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.image}` : eventTicket}
						// data.image = events/images/eVsytoz2vkY8WSvsr37HNAQsygNexbGct7Ybys3f.png
						alt={data.title || "event"}
						sizes="(max-width: 640px) 100vw, 350px"
					/>
				</div>


			</div>
		)
	}

	const renderContent = () => {
		return (
			<div className={size === 'default' ? 'space-y-4 p-5' : 'space-y-2 p-3'}>
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<h2
							className={`capitalize ${
								size === 'default'
									? 'text-xl font-semibold'
									: 'text-base font-medium'
							}`}
						>
							<span className="line-clamp-1">{data.title}</span>
						</h2>
					</div>
					<div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
						<span className="">Date: {formatDate(data.start_date)}</span>
						<span className="">{formatTime(data.start_date)} - {formatTime(data.end_date)}</span>
					</div>
					<div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
						<span className="">Temps restant: {data.time_remaining}</span>
					</div>
					<div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
						<span className="">Tickets restant: {data.remaining_tickets}</span>
					</div>
					
				</div>
				<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
				<div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{data.price}
					</span>

					{data.remaining_tickets > 0 ? (
						<Link href={`/listing-event-detail/${data.id}`} className="flex flex-col">
							<ButtonPrimary>Acheter un billet</ButtonPrimary>
						</Link>
					) : (
						<span className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-full font-medium">
							Sold Out
						</span>
					)}
				</div>
			</div>
		)
	}

	return (
		<div
			className={`nc-CarCard group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
			data-nc-id="CarCard"
		>
			{renderSliderGallery()}
			{renderContent()}
		</div>
	)
}

export default CarCard
