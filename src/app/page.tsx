'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import {
	IconCalendar,
	IconHeart,
	IconUsers,
	IconArrowRight,
	IconSearch,
	IconFilter,
	IconCash,
	IconGift,
	IconMoodHappy,
	IconBrandFacebook,
	IconBrandTwitter,
	IconBrandInstagram,
	IconChevronRight,
	IconHospital,
	IconSchool,
	IconBandage,
	IconTrees,
	IconPaw,
	IconHelpCircle,
	IconChartBar,
	IconBuildingCommunity,
	IconClock,
} from '@tabler/icons-react'
import Image from 'next/image'
import eventImage from '@/images/event_ticket2.jpg'
import eventDetails from '@/images/eventDetails.jpg'
import CentreMedical from '@/images/CentreMedical.jpg'
import JardinCommunautaire from '@/images/JardinCommunautaire.jpg'
import ecole from '@/images/ecole.jpg'
import Link from 'next/link'
import TrendingFundraising from '@/components/TrendingFundraising'
import { StaticImageData } from 'next/image'

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
	category?: string
}

interface FundraisingData {
	fundraising: {
		id: number
		title: string
		description: string
		goal: string
		category?: string
		organization: {
			id: number
			name: string
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
	}
}

// Add new interfaces
interface ImpactStory {
	id: number
	name: string
	title: string
	story: string
	image: string | StaticImageData
	impact: string
	type?:
		| 'education'
		| 'health'
		| 'community'
		| 'environment'
		| 'animal'
		| 'other'
}

interface Testimonial {
	id: number
	name: string
	role: string
	content: string
	avatar: string
}

function PageHome() {
	const [events, setEvents] = useState<Event[]>([])
	const [fundraisings, setFundraisings] = useState<FundraisingData[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [activeEventCategory, setActiveEventCategory] = useState<string>('Tous')
	const [activeFundraisingCategory, setActiveFundraisingCategory] =
		useState<string>('Tous')
	const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
	const [filteredFundraisings, setFilteredFundraisings] = useState<
		FundraisingData[]
	>([])
	const [currentEventPage, setCurrentEventPage] = useState(0)
	const [currentFundraisingPage, setCurrentFundraisingPage] = useState(0)
	const itemsPerPage = 4

	const eventCategoryMapping = {
		Tous: 'all',
		Festival: 'festival',
		Concert: 'concert',
		Sport: 'sport',
		Art: 'art',
		Education: 'education',
		Technologie: 'technology',
		Business: 'business',
		Autre: 'other',
	}

	const fundraisingCategoryMapping = {
		Tous: 'all',
		Education: 'education',
		Santé: 'health',
		Environnement: 'environment',
		Humanitaire: 'humanitarian',
		Technologie: 'technology',
		Communauté: 'community',
		Urgence: 'emergency',
		Autre: 'other',
	}

	// Add new state variables
	// Impact Stories Data
	const [impactStories] = useState<ImpactStory[]>([
		{
			id: 1,
			name: 'Marie Claire',
			title: 'Une nouvelle école pour mon village',
			story:
				'Grâce aux dons reçus, nous avons pu construire une école qui accueille maintenant 200 enfants.',
			image: ecole,
			impact: '200 enfants scolarisés',
			type: 'education',
		},
		{
			id: 2,
			name: 'Pierre Dubois',
			title: 'Centre médical mobile',
			story:
				"Notre unité médicale mobile permet maintenant d'atteindre les villages les plus reculés et de fournir des soins essentiels.",
			image: CentreMedical,
			impact: '1500 patients soignés',
			type: 'health',
		},
		{
			id: 3,
			name: 'Sophie Martin',
			title: 'Jardin communautaire durable',
			story:
				'Le projet de jardin communautaire aide maintenant 50 familles à cultiver leur propre nourriture de manière durable.',
			image: JardinCommunautaire,
			impact: '2 tonnes de légumes produits',
			type: 'environment',
		},
	])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const [eventsResponse, fundraisingResponse] = await Promise.all([
					axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}),
					axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fundraising`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}),
				])

				if (eventsResponse.status === 200 || eventsResponse.status === 201) {
					setEvents(eventsResponse.data.data)
					setFilteredEvents(eventsResponse.data.data)
				}
				if (
					fundraisingResponse.status === 200 ||
					fundraisingResponse.status === 201
				) {
					setFundraisings(fundraisingResponse.data.data.fundraisings)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (activeEventCategory === 'Tous') {
			setFilteredEvents(events)
		} else {
			const filtered = events.filter(
				(event) =>
					event.category?.toLowerCase() ===
					eventCategoryMapping[
						activeEventCategory as keyof typeof eventCategoryMapping
					]?.toLowerCase(),
			)
			setFilteredEvents(filtered)
		}
	}, [activeEventCategory, events])

	useEffect(() => {
		if (activeFundraisingCategory === 'Tous') {
			setFilteredFundraisings(fundraisings)
		} else {
			const filtered = fundraisings.filter(
				(item) =>
					item.fundraising.category?.toLowerCase() ===
					fundraisingCategoryMapping[
						activeFundraisingCategory as keyof typeof fundraisingCategoryMapping
					]?.toLowerCase(),
			)
			setFilteredFundraisings(filtered)
			setCurrentFundraisingPage(0)
		}
	}, [activeFundraisingCategory, fundraisings])

	// Add this effect to handle pagination properly
	useEffect(() => {
		const getPageItems = (items: FundraisingData[], page: number) => {
			const start = page * itemsPerPage
			const end = start + itemsPerPage
			return items.slice(start, end)
		}

		if (filteredFundraisings.length === 0) {
			setCurrentFundraisingPage(0)
		} else if (
			getPageItems(filteredFundraisings, currentFundraisingPage).length === 0
		) {
			setCurrentFundraisingPage((prev) => Math.max(0, prev - 1))
		}
	}, [filteredFundraisings, currentFundraisingPage, itemsPerPage])

	const renderHowItWorks = () => {
		const steps = [
			{
				icon: <IconSearch className="h-12 w-12" />,
				title: 'Trouvez une cause',
				description:
					'Parcourez les projets et trouvez celui qui vous tient à cœur',
			},
			{
				icon: <IconHeart className="h-12 w-12" />,
				title: 'Faites un don',
				description:
					'Contribuez en toute sécurité, même les petits dons font la différence',
			},
			{
				icon: <IconMoodHappy className="h-12 w-12" />,
				title: "Suivez l'impact",
				description: "Recevez des mises à jour sur l'avancement du projet",
			},
		]

		return (
			<section className="bg-white py-12 sm:py-16 md:py-20">
				<div className="container">
					<h2 className="mb-16 text-center text-3xl font-bold">
						Comment ça marche ?
					</h2>

					<div className="grid gap-12 md:grid-cols-3">
						{steps.map((step, index) => (
							<motion.div
								key={step.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}
								className="text-center"
							>
								<div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary-brand/10 text-secondary-brand">
									{step.icon}
								</div>
								<h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
								<p className="text-neutral-600">{step.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		)
	}

	const renderImpactStories = () => {
		const icons = {
			education: <IconSchool className="h-6 w-6" />,
			health: <IconBandage className="h-6 w-6" />,
			community: <IconUsers className="h-6 w-6" />,
			environment: <IconTrees className="h-6 w-6" />,
			animal: <IconPaw className="h-6 w-6" />,
			other: <IconHelpCircle className="h-6 w-6" />,
		}

		return (
			<section className="relative overflow-hidden bg-white py-24">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-primary-brand/10" />
					<div className="absolute right-0 top-40 h-60 w-60 rounded-full bg-secondary-brand/10" />
					<div className="absolute bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary-light/10" />
				</div>

				<div className="container relative">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className="mx-auto mb-16 max-w-2xl text-center"
					>
						<span className="mb-4 inline-block rounded-full bg-secondary-brand/20 px-4 py-2 text-sm font-medium text-secondary-brand">
							NOS IMPACTS
						</span>
						<h2 className="mb-4 text-4xl font-bold">Histoires qui inspirent</h2>
						<p className="text-lg text-neutral-600">
							Découvrez comment vos dons transforment des vies et créent un
							impact durable dans nos communautés.
						</p>
					</motion.div>

					<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{impactStories.map((story, index) => (
							<motion.div
								key={story.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-100px' }}
								transition={{
									duration: 0.5,
									ease: 'easeOut',
									delay: index * 0.2,
								}}
								whileHover={{ y: -5 }}
								className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
							>
								<div className="absolute right-0 top-0 h-20 w-20 -translate-y-10 translate-x-10 transform rounded-full bg-primary-100 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />

								<div className="relative h-48 overflow-hidden">
									<Image
										src={story.image}
										alt={story.name}
										fill
										className="transform object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</div>

								<div className="relative flex h-[300px] flex-col p-6">
									<div className="mb-4">
										<div className="mb-3 flex items-center gap-2">
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
												{icons[story.type || 'other']}
											</div>
											<h3 className="text-xl font-semibold">{story.title}</h3>
										</div>
										<p className="line-clamp-3 text-sm text-neutral-600">
											{story.story}
										</p>
									</div>

									<div className="mt-auto border-t pt-4">
										<div className="flex items-center gap-4 rounded-full bg-primary-50 px-4 py-2">
											<span className="shrink-0 text-sm font-medium text-primary-700">
												Impact réalisé
											</span>
											<span className="truncate font-semibold text-primary-700">
												{story.impact}
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		)
	}

	const renderCTA = () => {
		return (
			<section className="bg-secondary-brand py-20">
				<div className="container">
					<div className="mx-auto max-w-2xl text-center text-white">
						<h2 className="mb-6 text-4xl font-bold">
							Prêt à faire la différence ?
						</h2>
						<p className="mb-8 text-lg opacity-90">
							Rejoignez notre communauté de changemakers et commencez à soutenir
							des causes qui vous tiennent à cœur.
						</p>
						<div className="flex justify-center gap-4">
							<Link
								href="#"
								className="rounded-full bg-white px-8 py-3 font-medium text-secondary-brand transition-all hover:bg-opacity-90"
							>
								Faire un don
							</Link>
							<Link
								href="#"
								className="rounded-full border-2 border-white px-8 py-3 font-medium text-white transition-all hover:bg-white hover:text-secondary-brand"
							>
								Partager
							</Link>
						</div>
					</div>
				</div>
			</section>
		)
	}

	const getPageItems = (items: any[], page: number) => {
		const start = page * itemsPerPage
		const end = start + itemsPerPage
		return items.slice(start, end)
	}

	return (
		<main className="min-h-screen">
			{/* Hero Section - Without filters */}
			<section className="relative bg-white py-20">
				<div className="container relative">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Left Column - Content */}
						<div className="relative z-10">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className="space-y-8"
							>
								{/* Green Label */}
								<span className="inline-block rounded-full bg-secondary-brand/20 px-6 py-2 text-sm font-medium text-secondary-brand">
									Découvrez des événements uniques
								</span>

								{/* Main Heading */}
								<h1 className="text-[2.75rem] font-bold leading-[1.2] text-neutral-900 lg:text-6xl">
									Créez des moments{' '}
									<span className="text-secondary-brand">inoubliables</span>{' '}
									ensemble
								</h1>

								<p className="text-lg text-neutral-600">
									Participez à des événements extraordinaires et soutenez des
									causes qui vous tiennent à cœur.
								</p>

								{/* Search Bar */}
								<div className="flex max-w-xl overflow-hidden rounded-full border-2 border-secondary-brand/20 bg-white transition-all focus-within:border-secondary-brand/50 hover:border-secondary-brand/30">
									<div className="flex flex-1 items-center gap-3 px-6">
										<IconSearch className="h-5 w-5 text-secondary-brand/70" />
										<input
											type="text"
											placeholder="Rechercher un événement..."
											className="w-full border-none bg-transparent py-4 text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-0"
										/>
									</div>
									<button className="group relative overflow-hidden bg-secondary-brand px-8 py-4 font-medium text-white transition-all hover:bg-secondary-dark">
										<span className="relative z-10">Rechercher</span>
										<div className="absolute inset-0 -translate-x-full bg-primary-brand/20 transition-transform group-hover:translate-x-0" />
									</button>
								</div>
							</motion.div>
						</div>

						{/* Right Column - Image with Stats */}
						<div className="relative flex-1">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="relative"
							>
								{/* Main Image */}
								<div className="relative aspect-[4/5] max-w-[520px] overflow-hidden rounded-3xl">
									<Image
										src={eventImage}
										alt="Event celebration"
										className="h-full w-full object-cover"
										priority
									/>
								</div>

								{/* Stats Cards - Simple bottom positioning */}
								<div className="absolute -bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between gap-4">
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md"
									>
										<IconCalendar className="h-6 w-6 text-secondary-brand" />
										<div>
											<p className="font-medium text-secondary-brand">200+</p>
											<p className="text-sm text-neutral-600">Événements</p>
										</div>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 }}
										className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md"
									>
										<IconMoodHappy className="h-6 w-6 text-secondary-brand" />
										<div>
											<p className="font-medium text-secondary-brand">300+</p>
											<p className="text-sm text-neutral-600">Fond</p>
										</div>
									</motion.div>
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 }}
										className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md"
									>
										<IconUsers className="h-6 w-6 text-secondary-brand" />
										<div>
											<p className="font-medium text-secondary-brand">50k+</p>
											<p className="text-sm text-neutral-600">Utilisateurs</p>
										</div>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Add How It Works Section */}
			{renderHowItWorks()}

			{/* Events Section - With filters */}
			<section className="py-20">
				<div className="container relative">
					<div className="mb-12 flex items-center justify-between">
						<h2 className="text-3xl font-bold">Événements à venir</h2>
						<Link
							href="/events"
							className="group flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-secondary-brand shadow-sm transition-all hover:bg-secondary-brand hover:text-white"
						>
							Voir tout
							<IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>

					<div className="mt-6 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
						{Object.keys(eventCategoryMapping).map((category) => (
							<button
								key={category}
								onClick={() => setActiveEventCategory(category)}
								className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
									activeEventCategory === category
										? 'bg-secondary-brand text-white'
										: 'bg-white text-neutral-600 hover:bg-neutral-100'
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Navigation arrows - Events section */}
					<div className="relative">
						<button
							onClick={() => setCurrentEventPage((prev) => Math.max(0, prev - 1))}
							disabled={currentEventPage === 0}
							className={`absolute -left-2 sm:-left-5 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md transition-all ${
								currentEventPage === 0
									? 'bg-neutral-100 text-neutral-400'
									: 'bg-white text-neutral-600 hover:bg-neutral-100'
							}`}
						>
							<IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5 rotate-180" />
						</button>
						<button
							onClick={() => setCurrentEventPage((prev) => prev + 1)}
							disabled={getPageItems(filteredEvents, currentEventPage + 1).length === 0}
							className={`absolute -right-2 sm:-right-5 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md transition-all ${
								getPageItems(filteredEvents, currentEventPage + 1).length === 0
									? 'bg-neutral-100 text-neutral-400'
									: 'bg-white text-neutral-600 hover:bg-neutral-100'
							}`}
						>
							<IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
						</button>

						{/* Events Grid */}
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{filteredEvents.length > 0 ? (
								<AnimatePresence mode="popLayout">
									<motion.div
										key={currentEventPage}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.4, ease: 'easeInOut' }}
										className="col-span-full grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
									>
										{getPageItems(filteredEvents, currentEventPage).map(
											(event, index) => (
												<motion.div
													key={event.id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -20 }}
													transition={{
														duration: 0.4,
														ease: 'easeOut',
														delay: index * 0.1,
													}}
													className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
												>
													{/* Image Container */}
													<div className="relative aspect-[4/3] overflow-hidden">
														<Image
															src={
																event.image
																	? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${event.image}`
																	: event.title
															}
															alt={event.title}
															fill
															className="object-cover transition-transform duration-500 group-hover:scale-105"
														/>
														<div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-secondary-brand backdrop-blur-sm">
															<div className="flex items-center gap-1.5">
																<IconClock className="h-4 w-4" />
																{event.time_remaining}
															</div>
														</div>
													</div>

													<div className="p-5">
														<h3 className="mb-4 line-clamp-1 text-lg font-semibold text-neutral-900">
															{event.title}
														</h3>

														<div className="flex items-center justify-between">
															<span className="text-lg font-medium text-secondary-brand">
																{event.price} GP
															</span>
															<span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
																{event.remaining_tickets} places
															</span>
														</div>

														<Link
															href={`/listing-event-detail/${event.id}`}
															className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-brand px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-secondary-dark"
														>
															Acheter un billet
															<IconArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
														</Link>
													</div>
												</motion.div>
											),
										)}
									</motion.div>
								</AnimatePresence>
							) : (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="col-span-full flex flex-col items-center justify-center py-16"
								>
									<div className="mb-4 rounded-full bg-neutral-100 p-4">
										<IconSearch className="h-8 w-8 text-neutral-500" />
									</div>
									<h3 className="mb-2 text-xl font-semibold text-neutral-900">
										Aucun événement trouvé
									</h3>
									<p className="text-center text-neutral-500">
										Nous n&apos;avons trouvé aucun événement dans la catégorie
										&quot;{activeEventCategory}&quot;.
										<br />
										Essayez une autre catégorie ou revenez plus tard.
									</p>
								</motion.div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Add Impact Stories Section */}
			{renderImpactStories()}

			{/* Fundraising Section - With filters */}
			<section className="bg-neutral-50 py-20">
				<div className="container relative">
					<div className="mb-12 flex items-center justify-between">
						<h2 className="text-3xl font-bold">Campagnes de collecte</h2>
						<Link
							href="/fundraisings"
							className="group flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-secondary-brand shadow-sm transition-all hover:bg-secondary-brand hover:text-white"
						>
							Voir tout
							<IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>

					<div className="mt-6 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
						{Object.keys(fundraisingCategoryMapping).map((category) => (
							<button
								key={category}
								onClick={() => setActiveFundraisingCategory(category)}
								className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
									activeFundraisingCategory === category
										? 'bg-secondary-brand text-white'
										: 'bg-white text-neutral-600 hover:bg-neutral-100'
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Navigation arrows - Updated positioning */}
					<div className="relative">
						<button
							onClick={() =>
								setCurrentFundraisingPage((prev) => Math.max(0, prev - 1))
							}
							disabled={currentFundraisingPage === 0}
							className={`absolute -left-2 sm:-left-5 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md transition-all ${
								currentFundraisingPage === 0
									? 'bg-neutral-100 text-neutral-400'
									: 'bg-white text-neutral-600 hover:bg-neutral-100'
							}`}
						>
							<IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5 rotate-180" />
						</button>
						<button
							onClick={() => setCurrentFundraisingPage((prev) => prev + 1)}
							disabled={
								getPageItems(filteredFundraisings, currentFundraisingPage + 1)
									.length === 0
							}
							className={`absolute -right-2 sm:-right-5 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md transition-all ${
								getPageItems(filteredFundraisings, currentFundraisingPage + 1)
									.length === 0
									? 'bg-neutral-100 text-neutral-400'
									: 'bg-white text-neutral-600 hover:bg-neutral-100'
							}`}
						>
							<IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
						</button>

						{/* Fundraising Grid */}
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{filteredFundraisings.length > 0 ? (
								<AnimatePresence mode="popLayout">
									<motion.div
										key={currentFundraisingPage}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.4, ease: 'easeInOut' }}
										className="col-span-full grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
									>
										{getPageItems(
											filteredFundraisings,
											currentFundraisingPage,
										).map((item, index) => (
											<motion.div
												key={item.fundraising.id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{
													duration: 0.4,
													ease: 'easeOut',
													delay: index * 0.1,
												}}
												className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
											>
												{/* Image Container */}
												<div className="relative aspect-[4/3] overflow-hidden">
													{item.fundraising.images?.[0]?.image_path && (
														<Image
															src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.fundraising.images[0].image_path}`}
															alt={item.fundraising.title}
															fill
															className="object-cover transition-transform duration-500 group-hover:scale-105"
														/>
													)}

													{/* Organization Badge */}
													<div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-secondary-brand backdrop-blur-sm">
														<div className="flex items-center gap-1.5">
															<IconBuildingCommunity className="h-4 w-4" />
															{item.fundraising.organization.name}
														</div>
													</div>
												</div>

												<div className="p-5">
													<h3 className="mb-4 line-clamp-1 text-lg font-semibold text-neutral-900">
														{item.fundraising.title}
													</h3>

													{/* Progress Section */}
													<div className="mb-4">
														<div className="flex items-center justify-between text-sm">
															<span className="font-medium text-secondary-brand">
																{item.stats.total_raised} GP
															</span>
															<span className="text-xs text-neutral-500">
																Objectif: {item.fundraising.goal} GP
															</span>
														</div>
														<div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
															<div
																className="absolute inset-y-0 left-0 rounded-full bg-secondary-brand"
																style={{
																	width: `${item.stats.progress_percentage}%`,
																}}
															/>
														</div>
													</div>

													{/* CTA Button */}
													<Link
														href={`/fundraising-detail/${item.fundraising.id}`}
														className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-brand px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-secondary-dark"
													>
														Faire un don
														<IconArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
													</Link>
												</div>
											</motion.div>
										))}
									</motion.div>
								</AnimatePresence>
							) : (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="col-span-full flex flex-col items-center justify-center py-16"
								>
									<div className="mb-4 rounded-full bg-secondary-brand/10 p-4">
										<IconHeart className="h-8 w-8 text-secondary-brand" />
									</div>
									<h3 className="mb-2 text-xl font-semibold text-neutral-900">
										Aucune campagne trouvée
									</h3>
									<p className="text-center text-neutral-500">
										Nous n&apos;avons trouvé aucune campagne de collecte dans la
										catégorie &quot;{activeFundraisingCategory}&quot;.
										<br />
										Essayez une autre catégorie ou revenez plus tard.
									</p>
								</motion.div>
							)}
						</div>
					</div>
				</div>
			</section>
			{/* Add Trending Fundraising Section */}
			<section className="py-20">
				<div className="container">
					<h2 className="mb-8 text-3xl font-bold">Campagne en vedette</h2>
					<TrendingFundraising />
				</div>
			</section>

			{/* Add CTA Section */}
			{renderCTA()}
		</main>
	)
}

export default PageHome
