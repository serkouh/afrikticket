'use client'

import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import defaultImage from '@/images/event_ticket.jpg'

interface Fundraising {
	id: number
	title: string
	description: string
	goal: number
	current: number
	main_image: string
	progress_percentage: number
	organization: {
		id: number
		name: string
		logo: string
	}
	donations: {
		count: number
		total_amount: number
		status: string
	}
}

interface FundraisingSummary {
	total_donations: number
	total_contributed: number
	total_fundraisings: number
}

const DonationHistory: FC = () => {
	const [fundraisings, setFundraisings] = useState<{
		active: Fundraising[]
		completed: Fundraising[]
		cancelled: Fundraising[]
	}>({
		active: [],
		completed: [],
		cancelled: [],
	})
	const [summary, setSummary] = useState<FundraisingSummary>({
		total_donations: 0,
		total_contributed: 0,
		total_fundraisings: 0,
	})

	useEffect(() => {
		const fetchDonations = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/fundraisings`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				)

				if (response.data.status === 'success') {
					setFundraisings(response.data.data.fundraisings)
					setSummary(response.data.data.summary)
				}
			} catch (error) {
				console.error('Error fetching donations:', error)
			}
		}

		fetchDonations()
	}, [])

	const renderFundraisingCard = (fundraising: Fundraising) => {
		const imagePath = fundraising.main_image
			? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${fundraising.main_image}`
			: defaultImage

		const progressPercentage = (fundraising.current / fundraising.goal) * 100

		return (
			<div
				key={fundraising.id}
				className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-shadow hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
			>
				<div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
					<div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl">
						<Image
							src={imagePath}
							alt={fundraising.title}
							fill
							className="transform object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity group-hover:bg-opacity-20" />
					</div>

					<div className="flex-grow space-y-4">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<h3 className="line-clamp-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
									{fundraising.title}
								</h3>
								<span
									className={`rounded-full px-4 py-1.5 text-sm font-medium ${
										fundraising.donations.status === 'active'
											? 'bg-green-100 text-green-700'
											: fundraising.donations.status === 'completed'
												? 'bg-blue-100 text-blue-700'
												: 'bg-red-100 text-red-700'
									}`}
								>
									{fundraising.donations.status}
								</span>
							</div>

							<div className="flex flex-wrap items-center space-x-3 text-sm text-neutral-500 dark:text-neutral-400">
								<span className="flex items-center">
									<svg
										className="mr-1.5 h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
										/>
									</svg>
									{fundraising.organization.name}
								</span>
							</div>

							<div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
								<div
									className="absolute left-0 top-0 h-full bg-primary-600 dark:bg-primary-400" // Changed from bg-primary-6000 to bg-primary-600
									style={{ width: `${fundraising.progress_percentage}%` }}
								/>
							</div>

							<div className="flex justify-between text-sm">
								<span>{fundraising.current} GF collectés</span>
								<span>Objectif: {fundraising.goal} GF</span>
							</div>
						</div>

						<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

						<div className="flex flex-wrap items-end justify-between">
							<div className="space-y-1">
								<p className="text-sm text-neutral-500 dark:text-neutral-400">
									Dons effectués
								</p>
								<div className="flex items-center space-x-3">
									<span className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
										{fundraising.donations.count}
									</span>
									<span className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
										dons
									</span>
								</div>
							</div>
							<div className="text-right">
								<p className="text-sm text-neutral-500 dark:text-neutral-400">
									Total contribué
								</p>
								<p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
									{fundraising.donations.total_amount} GF
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto space-y-16 py-16">
			<div className="text-center">
				<h2 className="text-3xl font-semibold">Historique des dons</h2>
				<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="rounded-2xl bg-green-50 p-6 dark:bg-green-900/30">
						<p className="text-2xl font-bold">{summary.total_donations}</p>
						<p className="text-neutral-600 dark:text-neutral-400">
							Total des dons
						</p>
					</div>
					<div className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-900/30">
						<p className="text-2xl font-bold">{summary.total_contributed} GF</p>
						<p className="text-neutral-600 dark:text-neutral-400">
							Total contribué
						</p>
					</div>
					<div className="rounded-2xl bg-purple-50 p-6 dark:bg-purple-900/30">
						<p className="text-2xl font-bold">{summary.total_fundraisings}</p>
						<p className="text-neutral-600 dark:text-neutral-400">
							Collectes soutenues
						</p>
					</div>
				</div>
			</div>

			{fundraisings.active.length > 0 && (
				<div className="space-y-6">
					<h3 className="text-2xl font-semibold">Collectes actives</h3>
					<div className="space-y-4">
						{fundraisings.active.map(renderFundraisingCard)}
					</div>
				</div>
			)}

			{fundraisings.completed.length > 0 && (
				<div className="space-y-6">
					<h3 className="text-2xl font-semibold">Collectes terminées</h3>
					<div className="space-y-4">
						{fundraisings.completed.map(renderFundraisingCard)}
					</div>
				</div>
			)}

			{fundraisings.cancelled.length > 0 && (
				<div className="space-y-6">
					<h3 className="text-2xl font-semibold">Collectes annulées</h3>
					<div className="space-y-4">
						{fundraisings.cancelled.map(renderFundraisingCard)}
					</div>
				</div>
			)}
		</div>
	)
}

export default DonationHistory
