'use client'

import React, { FC, useEffect, useState } from 'react'
import {
	ArrowRightIcon,
	CheckCircleIcon,
	MapPinIcon,
	Squares2X2Icon,
} from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import Image from 'next/image'
import { Amenities_demos, includes_demo, PHOTOS } from '../constant'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import { usePathname, useRouter } from 'next/navigation'
import SectionDateRange from '../../SectionDateRange'
import RentalCarDatesRangeInput from '../RentalCarDatesRangeInput'
import { Route } from 'next'
import {
	Backpack03Icon,
	SeatSelectorIcon,
	Settings03Icon,
} from '@/components/Icons'
import eventTicket from '@/images/event_ticket.jpg'
import eventTicket2 from '@/images/event_ticket2.jpg'
import eventDetails from '@/images/eventDetails.jpg'
import eventDetails2 from '@/images/eventDetails2.jpg'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import { Label } from '@headlessui/react'
import { useParams } from 'next/navigation'
import axios from 'axios'

export interface ListingCarDetailPageProps {}

interface EventData {
	event: {
		title: string
		description: string
		date: string
		duration: number
		max_tickets: number
		price: number
	}
	timing: {
		start_date: string | undefined
		end_date: string | undefined
		duration: number
		is_ongoing: boolean
		time_remaining: string
	}
	tickets: {
		sold: number
		remaining: number
		total: number
	}
	images: {
		main: {
			url: string
		} | null
		gallery: Array<{
			url: string
		}>
	}
}

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = () => {
	const params = useParams()
	const pathname = usePathname()
	const router = useRouter()
	const [eventData, setEventData] = useState<EventData | null>(null)
	const [ticketNumber, setTicketNumber] = useState<string | null>(null)

	

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('token')

				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${params.id}`,
					{
						headers: {
							Authorization: token ? `Bearer ${token}` : '',
							'Content-Type': 'application/json',
						},
					},
				)

				if (response.status >= 200 && response.status < 300) {
					setEventData(response.data.data)
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Error fetching event:', error.response?.data)
					alert(error.response?.data?.message || 'Failed to load event details')
				} else {
					console.error('Unexpected error:', error)
					alert('An unexpected error occurred while loading event details')
				}
			}
		}

		if (params.id) {
			fetchData()
		}
	}, [params.id])

	// function useCountdown(hours: number, minutes: number) {
	// 	const [countdown, setCountdown] = useState({
	// 		hours,
	// 		minutes,
	// 		seconds: 0,
	// 	})

	// 	useEffect(() => {
	// 		let totalSeconds = hours * 3600 + minutes * 60

	// 		const timer = setInterval(() => {
	// 			if (totalSeconds <= 0) {
	// 				clearInterval(timer)
	// 			} else {
	// 				totalSeconds -= 1

	// 				const updatedHours = Math.floor(totalSeconds / 3600)
	// 				const updatedMinutes = Math.floor((totalSeconds % 3600) / 60)
	// 				const updatedSeconds = totalSeconds % 60

	// 				setCountdown({
	// 					hours: updatedHours,
	// 					minutes: updatedMinutes,
	// 					seconds: updatedSeconds,
	// 				})
	// 			}
	// 		}, 1000)

	// 		return () => clearInterval(timer)
	// 	}, [hours, minutes])

	// 	return countdown
	// }

	if (!params.id) {
		return <div>no id...</div>
	}

	const handleBuyTicket = async () => {
		if (!ticketNumber || Number(ticketNumber) <= 0) {
			alert('Please enter a valid ticket number')
			return
		}

		try {
			const token = localStorage.getItem('token')
			console.log('token', token)
			if (!token) {
				alert('Please login to purchase tickets')
				return
			}

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${params.id}/tickets`,
				{
					quantity: Number(ticketNumber),
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			)

			if (response.status >= 200 && response.status < 300) {
				console.log('Purchase successful:', response.data)
				router.push('/checkout')
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Error details:', error.response?.data)
			} else {
				console.error('Error:', error)
			}
		}
	}

	// const { hours, minutes, seconds } = useCountdown(1, 30)

	const handleOpenModalImageGallery = () => {
		router.push(`${pathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">{eventData?.event?.title}</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-600 dark:text-neutral-300">
					<p>{eventData?.event?.description}</p>
				</div>
				<div className="text-neutral-600 dark:text-neutral-300">
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="black"
								className="size-6"
								style={{ width: '20px', height: '20px' }}
							>
								<path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
								<path
									fillRule="evenodd"
									d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
									clipRule="evenodd"
								/>
							</svg>
						</span>
						Date:{' '}
						{eventData?.timing?.start_date &&
							new Date(eventData.timing.start_date).toLocaleString('fr-FR', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							})}{' '}
						-{' '}
						{eventData?.timing?.end_date &&
							new Date(eventData.timing.end_date).toLocaleString('fr-FR', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							})}
					</p>
					<p style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
	<span>Temps restant pour l&apos;événement: {eventData?.timing?.time_remaining}</span>
	<span className={`text-lg font-semibold ${
		eventData?.tickets?.remaining !== undefined && eventData.tickets.remaining > 0 ? 'text-green-600' : 'text-red-600'
	}`}>
		Nombre de billets restants: {eventData?.tickets?.remaining ?? 0} sur {eventData?.tickets?.total ?? 0}
	</span>
</p>

				</div>
			</div>
		)
	}

	const renderSidebarPrice = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						{eventData?.event?.price} GF
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/billet
						</span>
					</span>
				</div>

				<div className="space-y-1">
					<Input
						placeholder="Entrez le numéro du billet"
						onChange={(e) => setTicketNumber(e.target.value)}
					/>
				</div>

				{/* SUM */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>
							{eventData?.event?.price} x {Number(ticketNumber) || 0} billets
						</span>
						<span>
							{(eventData?.event?.price || 0) * (Number(ticketNumber) || 0)} GF
						</span>
					</div>

					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>
							{(eventData?.event?.price || 0) * (Number(ticketNumber) || 0)} GF
						</span>
					</div>
				</div>

				{/* SUBMIT */}
				<ButtonPrimary onClick={handleBuyTicket}>
					Acheter des billets!
				</ButtonPrimary>
			</div>
		)
	}

	return (
		<div className="nc-ListingCarDetailPage">
			{/* SINGLE HEADER */}
			<header className="rounded-md sm:rounded-xl">
				<div className="relative grid grid-cols-4 gap-1 sm:gap-2">
					<div className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-md sm:rounded-xl">
						<Image
							fill
							src={eventData?.images?.main?.url || eventTicket2}
							alt="photo 0"
							className="rounded-md object-cover sm:rounded-xl"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>

					{/*  */}
					<div className="relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-md sm:rounded-xl">
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={eventDetails}
							alt="photo 1"
							sizes="400px"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>

					{/*  */}
					{PHOTOS.filter((_, i) => i >= 2 && i < 4).map((item, index) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md sm:rounded-xl ${
								index >= 2 ? 'block' : ''
							}`}
						>
							<div className="aspect-h-3 aspect-w-4">
								<Image
									fill
									className="h-full w-full rounded-md object-cover sm:rounded-xl"
									src={eventDetails2}
									alt="photos"
									sizes="400px"
								/>
							</div>

							{/* OVERLAY */}
							<div className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100" />
						</div>
					))}
				</div>
			</header>

			{/* MAIn */}
			<main className="relative z-10 mt-11 flex flex-col lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection2()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 block flex-grow lg:mt-0">
					{renderSidebarPrice()}
				</div>
			</main>

			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28"></div>

			<SectionSliderNewCategories
				heading="Événements suggérés"
				categoryCardType="card3"
				itemPerRow={4}
			/>

			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28"></div>

			<SectionSliderNewCategories
				heading="Campagnes de collecte de fonds"
				categoryCardType="card4"
				itemPerRow={4}
			/>

			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28"></div>
		</div>
	)
}

export default ListingCarDetailPage
