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
import orangeMoneyLogo from '@/images/Orange-Money-emblem.png'
import { Amenities_demos, includes_demo, PHOTOS } from '../constant'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import { usePathname, useRouter } from 'next/navigation'
import SectionDateRange from '../../SectionDateRange'
import RentalCarDatesRangeInput from '../RentalCarDatesRangeInput'
import CarCard from '@/components/CarCard'
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
import toast from 'react-hot-toast'
import { StaticImageData } from 'next/image'

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
		id: number
		event_id: number
		image_path: string
		is_main: number
		created_at: string
		updated_at: string
	  } | null
	  gallery: Array<{
		id: number
		event_id: number
		image_path: string
		is_main: number
		created_at: string
		updated_at: string
	  }>
	}
  }

interface Event {
	id: number
	title: string
	description: string
	start_date: string
	end_date: string
	price: string
	image?: string
	time_remaining: string
	remaining_tickets: number
}

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = () => {
	const params = useParams()
	const pathname = usePathname()
	const router = useRouter()
	const [eventData, setEventData] = useState<EventData | null>(null)
	const [ticketNumber, setTicketNumber] = useState<string | null>(null)
	const [relatedEvents, setRelatedEvents] = useState<Event[]>([])

	useEffect(() => {
		const fetchRelatedEvents = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)
				if (response.status === 200) {
					const filteredEvents = response.data.data.filter(
						(event: Event) => event.id !== Number(params.id)
					)
					setRelatedEvents(filteredEvents)
				}
			} catch (error) {
				console.error('Error fetching related events:', error)
			}
		}
		fetchRelatedEvents()
	}, [params.id])

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

	if (!params.id) {
		return <div>no id...</div>
	}

	const handleBuyTicket = async () => {
		const ticketCount = Number(ticketNumber)
		const remainingTickets = eventData?.tickets?.remaining ?? 0
		const price = eventData?.event?.price ?? 0

		if (!ticketCount || ticketCount <= 0) {
			toast.error('Veuillez entrer un nombre de billets valide')
			return
		}

		if (ticketCount > remainingTickets) {
			toast.error(
				`Désolé, il ne reste que ${remainingTickets} billets disponibles`,
			)
			return
		}

		try {
			const token = localStorage.getItem('token')
			if (!token) {
				toast.error('Veuillez vous connecter pour acheter des billets')
				return
			}

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${params.id}/tickets`,
				{
					quantity: ticketCount,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.status >= 200 && response.status < 300) {
				toast.success('Achat de billets réussi!')
				router.push('/thank-you?type=ticket')
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message || 'Une erreur est survenue lors de l\'achat des billets')
				console.error('Error details:', error.response?.data)
			} else {
				toast.error('Une erreur est survenue lors de l\'achat des billets')
				console.error('Error:', error)
			}
		}
	}

	// const { hours, minutes, seconds } = useCountdown(1, 30)
	const handleOpenModalImageGallery = () => {
		router.push(`${pathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const renderImageGrid = () => {
		// Helper function to handle both StaticImageData and string URLs
		const getImageSrc = (image: string | StaticImageData): string => {
			return typeof image === 'string' ? image : image.src;
		};

		// Get main image URL with proper type checking
		const mainImageUrl = eventData?.images?.main?.image_path
			? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${eventData.images.main.image_path}`
			: getImageSrc(eventTicket2);

		// Get gallery images with proper type checking
		const galleryImages = eventData?.images?.gallery?.slice(0, 3).map(img => 
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${img.image_path}`
		) || [];

		// Fill remaining slots with default images if needed
		while (galleryImages.length < 3) {
			galleryImages.push(getImageSrc(eventDetails));
		}

		return (
			<div className="relative grid grid-cols-4 gap-1 sm:gap-2">
				{/* Main large image */}
				<div className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-md sm:rounded-xl">
					<Image
						fill
						src={mainImageUrl}
						alt="Main event photo"
						className="rounded-md object-cover sm:rounded-xl"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
					/>
					<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100" />
				</div>

				{/* First side image */}
				<div className="relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-md sm:rounded-xl">
					<Image
						fill
						className="rounded-md object-cover sm:rounded-xl"
						src={galleryImages[0]}
						alt="Event photo 1"
						sizes="400px"
					/>
					<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100" />
				</div>

				{/* Last two smaller images */}
				{galleryImages.slice(1).map((imgUrl, index) => (
					<div
						key={index}
						className="relative overflow-hidden rounded-md sm:rounded-xl"
					>
						<div className="aspect-h-3 aspect-w-4">
							<Image
								fill
								className="h-full w-full rounded-md object-cover sm:rounded-xl"
								src={imgUrl}
								alt={`Event photo ${index + 2}`}
								sizes="400px"
							/>
						</div>
						<div className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100" />
					</div>
				))}
			</div>
		);
	};

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
					<p
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							gap: '8px',
						}}
					>
						<span>
							Temps restant pour l&apos;événement:{' '}
							{eventData?.timing?.time_remaining}
						</span>
						<span
							className={`text-lg font-semibold ${
								eventData?.tickets?.remaining !== undefined &&
								eventData.tickets.remaining > 0
									? 'text-green-600'
									: 'text-red-600'
							}`}
						>
							Nombre de billets restants: {eventData?.tickets?.remaining ?? 0}{' '}
							sur {eventData?.tickets?.total ?? 0}
						</span>
					</p>
				</div>
			</div>
		)
	}

	const renderSidebarPrice = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						{eventData?.event?.price} FG
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/billet
						</span>
					</span>
				</div>

				<div className="space-y-1">
					<Input
						type="number"
						min="1"
						max={eventData?.tickets?.remaining}
						placeholder="Nombre de billets"
						value={ticketNumber || ''}
						onChange={(e) => setTicketNumber(e.target.value)}
					/>
					<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{eventData?.tickets?.remaining} billets disponibles
					</span>
				</div>

				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>
							{eventData?.event?.price} x {Number(ticketNumber) || 0} billets
						</span>
						<span>
							{(eventData?.event?.price || 0) * (Number(ticketNumber) || 0)} FG
						</span>
					</div>

					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>
							{(eventData?.event?.price || 0) * (Number(ticketNumber) || 0)} FG
						</span>
					</div>
				</div>

				<ButtonPrimary onClick={handleBuyTicket} 
				className="mt-6 flex w-full items-center justify-center gap-3"
					>
						<Image
							src={orangeMoneyLogo}
							alt="Orange Money"
							width={24}
							height={24}
							className="object-contain"
						/>
					<span>Payer avec Orange Money</span>

				</ButtonPrimary>
			</div>
		)
	}

	return (
		<div className="nc-ListingCarDetailPage container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
			{/* SINGLE HEADER */}
			<header className="rounded-md sm:rounded-xl mt-8 lg:mt-10">
				{renderImageGrid()}
			</header>

			{/* MAIN */}
			<main className="relative z-10 mt-11 flex flex-col lg:flex-row max-w-7xl mx-auto">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection2()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 block flex-grow lg:mt-0">
					{renderSidebarPrice()}
				</div>
			</main>

			<div className="max-w-7xl mx-auto mt-24 space-y-24 lg:mt-28 lg:space-y-28">
				<SectionSliderNewCategories
					heading="Événements suggérés"
					itemPerRow={4}
					renderCard={(index: number) => (
						<CarCard 
							key={relatedEvents[index]?.id} 
							data={relatedEvents[index]} 
						/>
					)}
					items={relatedEvents}
				/>
			</div>
		</div>
	)
}

export default ListingCarDetailPage
