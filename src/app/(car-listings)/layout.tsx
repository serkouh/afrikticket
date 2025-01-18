'use client'

import BgGlassmorphism from '@/components/BgGlassmorphism'
import React, { ReactNode, useState } from 'react'
import SectionHeroArchivePage from '../(server-components)/SectionHeroArchivePage'
import heroRightImage from '@/images/hero-right-car.png'
import BackgroundSection from '@/components/BackgroundSection'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'

const Layout = ({ children }: { children: ReactNode }) => {
	const [items] = useState<any[]>([1, 2, 3, 4, 5]) // Temporary dummy data

	return (
		<div className="nc-ListingCarPage relative">
			<BgGlassmorphism />

			{/* HEADER */}
			<div className="container relative">
				<SectionHeroArchivePage
					rightImage={heroRightImage}
					currentPage="Cars"
					currentTab="Cars"
					listingType={
						<>
							<i className="las la-car text-2xl"></i>
							<span className="ml-2.5">1512 cars</span>
						</>
					}
				/>
			</div>

			{/* SECTION */}
			{children}

			<div className="container overflow-hidden">
				{/* SECTION 1 */}
				<div className="relative py-16">
					<BackgroundSection />
					<SectionSliderNewCategories
						heading="Explore by types of stays"
						subHeading="Explore houses based on 10 types of stays"
						categoryCardType="card5"
						itemPerRow={5}
						sliderStyle="style2"
						items={items}
						renderCard={(index: number) => (
							<div key={index} className="p-4 bg-white rounded-lg shadow">
								<h3>Stay Type {index + 1}</h3>
							</div>
						)}
					/>
				</div>

				{/* SECTION */}
				<SectionSubscribe2 className="py-24 lg:py-28" />

				{/* SECTION */}
				<div className="relative mb-24 py-16 lg:mb-28">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox />
				</div>
			</div>
		</div>
	)
}

export default Layout
