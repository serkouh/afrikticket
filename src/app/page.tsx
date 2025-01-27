'use client'
import React, { useEffect, useState } from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import CarCard from '@/components/CarCard'
import FundraisingCard from '@/components/FundraisingCard'
import axios from 'axios'
import Heading2 from '@/shared/Heading2'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
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

function PageHome() {
	const [events, setEvents] = useState<Event[]>([])
	const [fundraisings, setFundraisings] = useState<FundraisingData[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch events
				const eventsResponse = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)

				if (eventsResponse.status === 200 || eventsResponse.status === 201) {
					setEvents(eventsResponse.data.data)
				}

				// Fetch fundraisings
				const fundraisingResponse = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fundraising`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)

				if (fundraisingResponse.status === 200 || fundraisingResponse.status === 201) {
					setFundraisings(fundraisingResponse.data.data.fundraisings)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<main className="nc-PageHome relative overflow-hidden">
			<BgGlassmorphism />
			<div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
				<SectionHero className="pt-10 lg:pt-16 lg:pb-16" />
				
				{/* Events Section with Slider */}
				<div>
					<Heading2
						heading="Événements à venir"
						subHeading="Découvrez les événements à venir"
					/>
					<div className="relative flow-root">
						<SectionSliderNewCategories
							itemPerRow={4}
							renderCard={(index: number) => (
								<CarCard key={events[index]?.id} data={events[index]} />
							)}
							items={events}
						/>
					</div>
				</div>

				{/* Fundraising Section with Slider */}
				<div>
					<Heading2
						heading="Campagnes de collecte de fonds actives"
						subHeading="."
					/>
					<div className="relative flow-root">
						<SectionSliderNewCategories
							itemPerRow={4}
							renderCard={(index: number) => (
								<FundraisingCard 
									key={fundraisings[index]?.fundraising.id} 
									data={fundraisings[index]} 
								/>
							)}
							items={fundraisings}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}

export default PageHome
