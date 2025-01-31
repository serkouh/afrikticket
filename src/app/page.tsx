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

// Add these interfaces at the top of your page.tsx file
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

interface FundraisingData {
	fundraising: {
		id: number
		title: string
		description: string
		goal: string
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
	type?: 'education' | 'health' | 'community' | 'environment' | 'animal' | 'other'
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
	const [activeEventCategory, setActiveEventCategory] = useState<string>('tous')
	const [activeFundraisingCategory, setActiveFundraisingCategory] = useState<string>('tous')

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
			<section className="bg-gradient-to-b from-[#FAFFFE] to-white py-20">
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
								<div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#E7FAF4] text-[#00B252]">
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
		  other: <IconHelpCircle className="h-6 w-6" />
		};
	  
		return (
		  <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white py-24">
			<div className="absolute inset-0 overflow-hidden">
			  <div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-primary-100/40" />
			  <div className="absolute right-0 top-40 h-60 w-60 rounded-full bg-secondary-100/30" />
			  <div className="absolute bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary-50/30" />
			</div>
	  
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			  <motion.div 
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				className="mx-auto mb-16 max-w-2xl text-center"
			  >
				<span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
				  NOS IMPACTS
				</span>
				<h2 className="mb-4 text-4xl font-bold">Histoires qui inspirent</h2>
				<p className="text-lg text-neutral-600">
				  Découvrez comment vos dons transforment des vies et créent un
				  impact durable dans nos communautés.
				</p>
			  </motion.div>
	  
			  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
				{impactStories.map((story, index) => (
				  <motion.div
					key={story.id}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					whileHover={{ y: -5 }}
					className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl w-full min-w-[420px]"
				  >
					{/* //change the width here  */}
					<div className="absolute right-0 top-0 h-20 w-20 -translate-y-10 translate-x-10 transform rounded-full bg-primary-100 transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
					
					<div className="relative h-48 overflow-hidden">
					  <Image
						src={story.image}
						alt={story.name}
						fill
						className="transform object-cover transition-transform duration-300 group-hover:scale-105"
					  />
					  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
						  <span className="text-sm font-medium text-primary-700 shrink-0">
							Impact réalisé
						  </span>
						  <span className="font-semibold text-primary-700 truncate">
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
		);
	  };



	const renderCTA = () => {
		return (
			<section className="bg-[#00B252] py-20">
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
								href="/signup"
								className="rounded-full bg-white px-8 py-3 font-medium text-[#00B252] transition-all hover:bg-opacity-90"
							>
								Créer un compte
							</Link>
							<Link
								href="/about"
								className="rounded-full border-2 border-white px-8 py-3 font-medium text-white transition-all hover:bg-white hover:text-[#00B252]"
							>
								En savoir plus
							</Link>
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<main className="min-h-screen">
			{/* Hero Section - Without filters */}
			<section className="relative bg-[#FAFFFE] pb-20 pt-10">
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
								<span className="inline-block rounded-full bg-[#E7FAF4] px-6 py-2 text-sm font-medium text-[#00B252]">
									Découvrez des événements uniques
								</span>

								{/* Main Heading */}
								<h1 className="text-[2.75rem] font-bold leading-[1.2] text-neutral-900 lg:text-6xl">
									Créez des moments{' '}
									<span className="text-[#00B252]">inoubliables</span> ensemble
								</h1>

								<p className="text-lg text-neutral-600">
									Participez à des événements extraordinaires et soutenez des
									causes qui vous tiennent à cœur.
								</p>

								{/* Search Bar */}
								<div className="flex max-w-xl overflow-hidden rounded-full border-2 border-neutral-200 bg-white">
									<div className="flex flex-1 items-center px-6">
										<IconSearch className="h-5 w-5 text-neutral-400" />
										<input
											type="text"
											placeholder="Rechercher un événement..."
											className="w-full border-none bg-transparent px-4 py-4 text-neutral-800 placeholder-neutral-400 focus:outline-none"
										/>
									</div>
									<button className="bg-[#00B252] px-8 py-4 font-medium text-white transition-all hover:bg-[#009245]">
										Rechercher
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
								<div className="absolute -bottom-6 left-6 right-6 flex justify-between gap-4">
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md"
									>
										<IconCalendar className="h-6 w-6 text-[#00B252]" />
										<div>
											<p className="font-medium text-[#00B252]">200+</p>
											<p className="text-sm text-neutral-600">Événements</p>
										</div>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 }}
										className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md"
									>
										<IconMoodHappy className="h-6 w-6 text-[#00B252]" />
										<div>
											<p className="font-medium text-[#00B252]">300+</p>
											<p className="text-sm text-neutral-600">Fond</p>
										</div>
									</motion.div>
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 }}
										className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md"
									>
										<IconUsers className="h-6 w-6 text-[#00B252]" />
										<div>
											<p className="font-medium text-[#00B252]">50k+</p>
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
				<div className="container">
					<div className="mb-12 flex items-center justify-between">
						<h2 className="text-3xl font-bold">Événements à venir</h2>
						<div className="flex gap-3">
							{['Tous', 'Festival', 'Concert', 'Sport', 'Art'].map((category) => (
								<button
									key={category}
									onClick={() => setActiveEventCategory(category.toLowerCase())}
									className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
										activeEventCategory === category.toLowerCase()
											? 'bg-[#00B252] text-white'
											: 'bg-white text-neutral-600 hover:bg-neutral-100'
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					{/* Events Grid */}
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						<AnimatePresence>
							{events.map((event, index) => (
								<motion.div
									key={event.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-800"
								>
									<div className="relative aspect-[4/3]">
										{event.image && (
											<Image
												src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${event.image}`}
												alt={event.title}
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										)}
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
										<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
											<span className="rounded-full bg-primary-600 px-3 py-1 text-sm font-medium text-white">
												{event.time_remaining}
											</span>
											<button className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/30">
												<IconHeart className="h-5 w-5 text-white" />
											</button>
										</div>
									</div>

									<div className="p-6">
										<h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
											{event.title}
										</h3>
										<p className="mb-4 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
											{event.description}
										</p>

										<div className="flex items-center justify-between">
											<span className="text-lg font-semibold text-primary-600">
												{event.price}
											</span>
											<span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
												{event.remaining_tickets} places
											</span>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</section>

			{/* Add Impact Stories Section */}
			{renderImpactStories()}

			{/* Fundraising Section - With filters */}
			<section className="bg-neutral-50 py-20">
				<div className="container">
					<div className="mb-12 flex items-center justify-between">
						<h2 className="text-3xl font-bold">Campagnes de collecte</h2>
						<div className="flex gap-3">
							{['Tous', 'Education', 'Santé', 'Sport', 'Culture'].map((category) => (
								<button
									key={category}
									onClick={() => setActiveFundraisingCategory(category.toLowerCase())}
									className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
										activeFundraisingCategory === category.toLowerCase()
											? 'bg-[#00B252] text-white'
											: 'bg-white text-neutral-600 hover:bg-neutral-100'
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{fundraisings.map((item) => (
							<motion.div
								key={item.fundraising.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
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
									<div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-primary-600 backdrop-blur-sm">
										<div className="flex items-center gap-1.5">
											<IconBuildingCommunity className="h-4 w-4" />
											{item.fundraising.organization.name}
										</div>
									</div>
								</div>

								<div className="p-5">
									<h3 className="mb-4 text-lg font-semibold text-neutral-900 line-clamp-1">
										{item.fundraising.title}
									</h3>

									{/* Progress Section */}
									<div className="mb-4">
										<div className="flex items-center justify-between text-sm">
											<span className="font-medium text-primary-600">
												{item.stats.total_raised} GP
											</span>
											<span className="text-neutral-500 text-xs">
												Objectif: {item.fundraising.goal} GP
											</span>
										</div>
										<div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
											<div
												className="absolute inset-y-0 left-0 rounded-full bg-primary-500"
												style={{ width: `${item.stats.progress_percentage}%` }}
											/>
										</div>
									</div>

									{/* CTA Button */}
									<Link
										href={`/fundraising-detail/${item.fundraising.id}`}
										className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-600"
									>
										Faire un don
										<IconArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
									</Link>
								</div>
							</motion.div>
						))}
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
