'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
	IconUsers,
	IconHeart,
	IconTrophy,
	IconWorld,
	IconSchool,
	IconTrees,
	IconArrowRight,
	IconChevronRight,
} from '@tabler/icons-react'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import Image from 'next/image'
import rightImg from '@/images/heroRight.jpeg'
import teamImg1 from '@/images/avatars/Image-1.png'
import teamImg2 from '@/images/avatars/Image-2.png'
import teamImg3 from '@/images/avatars/Image-3.png'
import impactImg1 from '@/images/ecole.jpg'
import impactImg2 from '@/images/JardinCommunautaire.jpg'

const PageAbout = () => {
	return (
		<div className="relative overflow-hidden">
			<BgGlassmorphism />

			{/* Hero Section */}
			<section className="relative bg-[#FAFFFE] py-20">
				<div className="container">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="space-y-8"
						>
							<span className="inline-block rounded-full bg-secondary-brand/20 px-6 py-2 text-sm font-medium text-secondary-brand">
								Notre Mission
							</span>
							<h1 className="text-[2.75rem] font-bold leading-[1.2] text-neutral-900 lg:text-6xl">
								Créer un impact{' '}
								<span className="text-secondary-brand">positif</span> ensemble
							</h1>
							<p className="text-lg text-neutral-600">
								Nous croyons en la force de la communauté pour transformer des
								vies. Notre plateforme connecte les personnes passionnées avec
								des causes qui comptent vraiment.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="relative"
						>
							<div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
								<Image
									src={rightImg}
									alt="About us hero"
									fill
									className="object-cover"
									priority
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="bg-neutral-custom/20 py-20">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="mx-auto mb-16 max-w-2xl text-center"
					>
						<span className="mb-4 inline-block rounded-full bg-secondary-brand/20 px-4 py-2 text-sm font-medium text-secondary-brand">
							NOTRE ÉQUIPE
						</span>
						<h2 className="mb-4 text-4xl font-bold">
							Les visages derrière la mission
						</h2>
						<p className="text-lg text-neutral-600">
							Une équipe passionnée qui travaille chaque jour pour faire la
							différence.
						</p>
					</motion.div>

					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								image: teamImg1,
								name: 'Sarah Martin',
								role: 'Fondatrice & CEO',
								bio: "Passionnée par l'impact social depuis 15 ans",
							},
							{
								image: teamImg2,
								name: 'Marc Dubois',
								role: 'Directeur des Opérations',
								bio: 'Expert en gestion de projets humanitaires',
							},
							{
								image: teamImg3,
								name: 'Julie Chen',
								role: 'Responsable Communauté',
								bio: 'Spécialiste en engagement communautaire',
							},
						].map((member, index) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}
								className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-light/20"
							>
								<div className="aspect-square relative mb-6 overflow-hidden rounded-xl">
									<Image
										src={member.image}
										alt={member.name}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
								<h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
								<p className="mb-3 text-sm font-medium text-primary-600">
									{member.role}
								</p>
								<p className="text-neutral-600">{member.bio}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Impact Section - Reimagined as an Interactive Timeline */}
			<section className="relative overflow-hidden py-32">
				<div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30" />

				<div className="container relative">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="mx-auto mb-20 max-w-2xl text-center"
					>
						<span className="mb-4 inline-block rounded-full bg-secondary-brand/20 px-4 py-2 text-sm font-medium text-secondary-brand">
							NOTRE IMPACT
						</span>
						<h2 className="mb-4 text-4xl font-bold">Notre Parcours d&apos;Impact</h2>
					</motion.div>

					<div className="relative">
						{/* Vertical Line */}
						<div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 transform bg-secondary-brand/20" />

						{[
							{
								year: '2022',
								title: 'Premiers Pas',
								stat: '100+',
								description: 'Donateurs rejoignent la communauté',
								icon: <IconUsers className="h-8 w-8" />,
								side: 'left',
							},
							{
								year: '2023',
								title: 'Impact Environnemental',
								stat: '100 ha',
								description: 'De forêt protégée',
								icon: <IconTrees className="h-8 w-8" />,
								side: 'right',
							},
							{
								year: '2024',
								title: 'Education',
								stat: '500+',
								description: 'Élèves scolarisés',
								icon: <IconSchool className="h-8 w-8" />,
								side: 'left',
							},
						].map((item, index) => (
							<motion.div
								key={item.year}
								initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.2 }}
								className={`relative mb-20 flex items-center ${
									item.side === 'left' ? 'justify-end' : 'justify-start'
								} ${item.side === 'left' ? 'pr-1/2' : 'pl-1/2'}`}
							>
								{/* Timeline Node */}
								<div className="absolute left-1/2 -translate-x-1/2 transform">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
										<span className="text-xl font-bold text-primary-600">
											{item.year}
										</span>
									</div>
								</div>

								{/* Content Card */}
								<motion.div
									whileHover={{ scale: 1.05 }}
									className={`w-[400px] rounded-2xl bg-white p-6 shadow-lg ${
										item.side === 'left' ? 'mr-12' : 'ml-12'
									}`}
								>
									<div className="mb-4 flex items-center gap-4">
										<div className="rounded-xl bg-primary-50 p-3 text-primary-600">
											{item.icon}
										</div>
										<div>
											<h3 className="text-xl font-semibold">{item.title}</h3>
											<div className="text-3xl font-bold text-primary-600">
												{item.stat}
											</div>
										</div>
									</div>
									<p className="text-neutral-600">{item.description}</p>
								</motion.div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Values Section - Reimagined as Interactive Cards */}
			<section className="bg-secondary-dark py-32 text-white">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="mx-auto mb-20 max-w-2xl text-center"
					>
						<span className="mb-4 inline-block rounded-full bg-primary-brand px-4 py-2 text-sm font-medium text-secondary-dark">
							NOS VALEURS
						</span>
						<h2 className="mb-4 text-4xl font-bold">Ce qui nous anime</h2>
					</motion.div>

					<div className="grid gap-8 lg:grid-cols-3">
						{[
							{
								icon: <IconHeart className="h-10 w-10" />,
								title: 'Engagement Social',
								description:
									"Nous croyons en la force de l'action collective pour créer un changement durable.",
								color: 'from-primary-brand/20 to-primary-light/20',
							},
							{
								icon: <IconWorld className="h-10 w-10" />,
								title: 'Impact Global',
								description:
									"Notre vision s'étend au-delà des frontières pour un impact mondial.",
								color: 'from-secondary-brand/20 to-secondary-dark/20',
							},
							{
								icon: <IconUsers className="h-10 w-10" />,
								title: 'Communauté',
								description: 'Une communauté forte pour un changement positif.',
								color: 'from-primary-light/20 to-primary-brand/20',
							},
						].map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								whileHover={{ scale: 1.05 }}
								transition={{ delay: index * 0.1 }}
								className="group relative"
							>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl opacity-0 transition-all duration-500 group-hover:opacity-100`}
								/>
								<div className="relative h-full rounded-2xl border border-secondary-brand/20 bg-secondary-brand/10 p-8">
									<div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary-brand/10 text-primary-brand">
										{value.icon}
									</div>
									<h3 className="mb-4 text-xl font-semibold">{value.title}</h3>
									<p className="text-neutral-400">{value.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section - Reimagined */}
			<section className="relative overflow-hidden py-32">
				{/* Background Elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary-brand/10 to-secondary-brand/20" />
				<div className="absolute inset-0">
					<div className="absolute left-0 top-0 h-full w-full bg-[url('/grid-pattern.svg')] opacity-5" />
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.5 }}
						className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-secondary-brand/30 blur-3xl"
					/>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.4 }}
						className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-primary-brand/30 blur-3xl"
					/>
				</div>

				<div className="container relative">
					<div className="mx-auto max-w-4xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							className="rounded-3xl bg-white/80 p-12 shadow-xl backdrop-blur-xl"
						>
							<div className="grid items-center gap-10 lg:grid-cols-2">
								<div className="space-y-6">
									<motion.h2
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										className="text-4xl font-bold text-neutral-900"
									>
										Rejoignez le Mouvement <br />
										<span className="text-secondary-brand">
											pour un Monde Meilleur
										</span>
									</motion.h2>
									<p className="text-lg text-neutral-600">
										Chaque action compte. Ensemble, nous pouvons créer un impact
										durable pour les générations futures.
									</p>
									<div className="flex flex-wrap gap-4">
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="group flex items-center gap-2 rounded-xl bg-secondary-brand px-6 py-3 font-medium text-white transition-all hover:bg-secondary-dark"
										>
											Commencer Maintenant
											<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="group flex items-center gap-2 rounded-xl border-2 border-secondary-brand px-6 py-3 font-medium text-secondary-brand transition-all hover:bg-secondary-brand/10"
										>
											Découvrir les Projets
											<IconChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
										</motion.button>
									</div>
								</div>

								<div className="relative">
									<div className="grid grid-cols-2 gap-4">
										{[
											{
												stat: '1000+',
												label: 'Donateurs',
												icon: (
													<IconUsers className="h-6 w-6 text-secondary-brand" />
												),
											},
											{
												stat: '50+',
												label: 'Projets',
												icon: (
													<IconTrophy className="h-6 w-6 text-secondary-brand" />
												),
											},
											{
												stat: '100%',
												label: 'Transparence',
												icon: (
													<IconHeart className="h-6 w-6 text-secondary-brand" />
												),
											},
											{
												stat: '24/7',
												label: 'Support',
												icon: (
													<IconWorld className="h-6 w-6 text-secondary-brand" />
												),
											},
										].map((item, index) => (
											<motion.div
												key={item.label}
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}
												className="rounded-xl bg-white p-4 text-center shadow-lg"
											>
												<div className="mb-2 flex justify-center">
													{item.icon}
												</div>
												<div className="text-2xl font-bold text-secondary-brand">
													{item.stat}
												</div>
												<div className="text-sm text-neutral-600">
													{item.label}
												</div>
											</motion.div>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default PageAbout
