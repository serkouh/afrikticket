'use client'

import React, { FC, useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import ButtonPrimary from '@/shared/ButtonPrimary'
import FundraisingCard from '@/components/FundraisingCard'
import Input from '@/shared/Input'
import eventTicket from '@/images/event_ticket.jpg'
import eventDetails from '@/images/eventDetails.jpg'
import eventDetails2 from '@/images/eventDetails2.jpg'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import { HeartIcon, ShareIcon, UserGroupIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { StaticImageData } from 'next/image'

interface FundraisingDetailPageProps {}

interface FundraisingData {
	fundraising: {
		id: number
		title: string
		description: string
		goal: string
		current: string
		organization: {
			id: number
			name: string
			description: string
		}
		images: Array<{
			id: number
			image_path: string
			is_main: number
		}>
	}
	stats: {
		total_donors: number
		total_raised: number
		progress_percentage: number
		remaining_amount: number
		average_donation: number
	}
}

const FundraisingDetailPage: FC<FundraisingDetailPageProps> = () => {
	const params = useParams()
	const pathname = usePathname() 
	const router = useRouter()
	const [fundraisingData, setFundraisingData] = useState<FundraisingData | null>(null)
	const [donationAmount, setDonationAmount] = useState<string>('')
	const [relatedFundraisings, setRelatedFundraisings] = useState<FundraisingData[]>([])


	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('token')

				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fundraising/${params.id}`,
					{
						headers: {
							Authorization: token ? `Bearer ${token}` : '',
							'Content-Type': 'application/json',
						},
					}
				)

				if (response.status >= 200 && response.status < 300) {
					setFundraisingData(response.data.data)
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Error fetching fundraising:', error.response?.data)
					alert(error.response?.data?.message || 'Failed to load fundraising details')
				} else {
					console.error('Unexpected error:', error)
					alert('An unexpected error occurred while loading fundraising details')
				}
			}
		}

		if (params.id) {
			fetchData()
		}
	}, [params.id])

	useEffect(() => {
		const fetchRelatedFundraisings = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fundraising`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)
				if (response.status === 200) {
					setRelatedFundraisings(response.data.data.fundraisings)
				}
			} catch (error) {
				console.error('Error fetching related fundraisings:', error)
			}
		}
		fetchRelatedFundraisings()
	}, [])

	

	const handleDonate = async () => {
		if (!donationAmount || Number(donationAmount) <= 0) {
			alert('Please enter a valid donation amount')
			return
		}

		localStorage.setItem('checkoutData', JSON.stringify({
			type: 'donation',
			amount: Number(donationAmount),
			fundraisingId: params.id
		}));

		router.push('/checkout')
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold">{fundraisingData?.fundraising.title}</h2>
					<div className="flex gap-3">
						<button className="flex items-center gap-2 text-neutral-600 hover:text-primary-600">
							<HeartIcon className="w-5 h-5" />
							<span>Sauvegarder</span>
						</button>
						<button className="flex items-center gap-2 text-neutral-600 hover:text-primary-600">
							<ShareIcon className="w-5 h-5" />
							<span>Partager</span>
						</button>
					</div>
				</div>
				
				{/* Organization Info */}
				<div className="mt-4 flex items-center text-neutral-500">
					<UserGroupIcon className="w-5 h-5 mr-2" />
					<span>{fundraisingData?.fundraising.organization.name}</span>
				</div>

				{/* Progress Section */}
				<div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
					<div className="grid grid-cols-3 gap-4">
						<div className="text-center">
							<BanknotesIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
							<div className="text-2xl font-bold">{fundraisingData?.stats.total_raised} GF</div>
							<div className="text-sm text-neutral-500">Collectés</div>
						</div>
						<div className="text-center">
							<UserGroupIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
							<div className="text-2xl font-bold">{fundraisingData?.stats.total_donors}</div>
							<div className="text-sm text-neutral-500">Donateurs</div>
						</div>
						<div className="text-center">
							<ChartBarIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
							<div className="text-2xl font-bold">{fundraisingData?.stats.progress_percentage}%</div>
							<div className="text-sm text-neutral-500">Objectif</div>
						</div>
					</div>

					{/* Progress Bar */}
					<div className="mt-6">
						<div className="relative w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
							<div 
								className="absolute left-0 top-0 h-full bg-primary-600 transition-all duration-300 rounded-full"
								style={{ width: `${fundraisingData?.stats.progress_percentage || 0}%` }}
							/>
						</div>
						<div className="mt-2 flex justify-between text-sm">
							<span>Collecté: {fundraisingData?.stats.total_raised} GF</span>
							<span>Objectif: {fundraisingData?.fundraising.goal} GF</span>
						</div>
					</div>
				</div>

				{/* Description */}
				<div className="mt-8">
					<h3 className="text-xl font-semibold mb-4">À propos de cette campagne</h3>
					<div className="prose dark:prose-invert">
						<p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
							{fundraisingData?.fundraising.description}
						</p>
					</div>
				</div>
			</div>
		)
	}

	const renderSidebarPrice = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				<div className="p-6 bg-white dark:bg-neutral-900 rounded-3xl">
					<h3 className="text-2xl font-semibold mb-6">Faire un don</h3>
					
					{/* Suggested Amounts */}
					<div className="grid grid-cols-3 gap-3 mb-6">
						{['5000', '10000', '20000'].map((amount) => (
							<button
								key={amount}
								onClick={() => setDonationAmount(amount)}
								className={`py-3 px-4 rounded-xl border transition-all ${
									donationAmount === amount
										? 'border-primary-600 bg-primary-50 dark:bg-primary-900 text-primary-600'
										: 'border-neutral-200 dark:border-neutral-700 hover:border-primary-600'
								}`}
							>
								{amount} GF
							</button>
						))}
					</div>

					{/* Custom Amount Input */}
					<div className="space-y-4">
						<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
							Autre montant
						</label>
						<Input
							placeholder="Entrez votre montant"
							value={donationAmount || ''}
							onChange={(e) => setDonationAmount(e.target.value)}
							className="focus:ring-primary-600"
						/>
					</div>

					{/* Donation Button */}
					<ButtonPrimary onClick={handleDonate} className="w-full mt-6">
						Faire un don maintenant
					</ButtonPrimary>

					{/* Security Notice */}
					<p className="mt-4 text-sm text-center text-neutral-500">
							🔒 Transaction sécurisée
					</p>
				</div>
			</div>
		)
	}

	const renderImageGrid = () => {
		// Helper function to handle both StaticImageData and string URLs
		const getImageSrc = (image: string | StaticImageData): string => {
			return typeof image === 'string' ? image : image.src;
		};

		// Get main image URL with proper type checking
		const mainImage = fundraisingData?.fundraising.images?.find(img => img.is_main === 1);
		const mainImageUrl = mainImage
			? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${mainImage.image_path}`
			: getImageSrc(eventTicket);

		// Get gallery images (excluding main image)
		const galleryImages = fundraisingData?.fundraising.images
			?.filter(img => img.is_main !== 1)
			?.slice(0, 3)
			.map(img => `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${img.image_path}`) || [];

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
						alt="fundraising main"
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
						alt="Fundraising photo 1"
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
								alt={`Fundraising photo ${index + 2}`}
								sizes="400px"
							/>
						</div>
						<div className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100" />
					</div>
				))}
			</div>
		);
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
				<div className="mt-14 w-full lg:mt-0 lg:w-2/5 xl:w-1/3">
					{renderSidebarPrice()}
				</div>
			</main>

			<div className="max-w-7xl mx-auto mt-24 space-y-24 lg:mt-28 lg:space-y-28">
				<SectionSliderNewCategories
					heading="Autres campagnes"
					itemPerRow={4}
					renderCard={(index: number) => (
						<FundraisingCard 
							key={relatedFundraisings[index]?.fundraising.id} 
							data={relatedFundraisings[index]} 
						/>
					)}
					items={relatedFundraisings}
				/>
			</div>
		</div>
	)
}

export default FundraisingDetailPage
