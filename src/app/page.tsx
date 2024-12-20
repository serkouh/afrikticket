import React from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import { TaxonomyType } from '@/data/types'
import rightImg from "@/images/about-hero-right.png";
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionHowItWork from '@/components/SectionHowItWork'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionVideos from '@/components/SectionVideos'
import SectionClientSay from '@/components/SectionClientSay'
import Picture from '@/images/card/card-image.jpg'
import AboutUsSectionHero from '@/app/about/SectionHero'
import FlightCard, { FlightCardProps } from '@/components/FlightCard';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Heading2 from '@/shared/Heading2';
import CarCardH from '@/components/CarCardH';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import CarCard from '@/components/CarCard';
import eventTicket from '@/images/event_ticket2.jpg';
import SectionHeroMainPage from './about/SectionHeroMainPage';

const DEMO_CARS = DEMO_CAR_LISTINGS.filter((_, i) => i < 12)


function PageHome() {


	return (
		<main className="nc-PageHome relative overflow-hidden">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />

			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
				{/* SECTION HERO */}
				<SectionHero className="pt-10 lg:pb-16 lg:pt-16" />

				{/* event ticket grid */}
				<Heading2
					heading="Billets d'événement"
					subHeading=""
				/>
				<div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{DEMO_CARS.map((car) => (
						<CarCard key={car.id} data={car} />
					))}
				</div>


				{/* active compaigns  */}
				<SectionSliderNewCategories
					heading="Campagnes de collecte de fonds actives"
					subHeading="."
					categoryCardType="card4"
					itemPerRow={4}
				/>



				{/* about company */}
				<SectionHeroMainPage
					rightImg={eventTicket}
					heading="👋 À propos de nous."
					btnText=""
					subHeading="Afrik Ticket est une plateforme guinéenne de billetterie en ligne dédiée à la simplification de l'achat de billets pour tous types d'événements. Nous offrons une expérience fluide et sécurisée, permettant à nos utilisateurs d'accéder facilement à des événements culturels, sportifs, artistiques et plus encore. En plus de notre engagement à rendre l'événementiel plus accessible, nous soutenons activement des initiatives caritatives par le biais du financement participatif. Chaque billet acheté est une opportunité de contribuer à des projets solidaires et de faire une différence dans la communauté."
				/>



				{/* SECTION 1 */}
				{/* <SectionSliderNewCategories categories={DEMO_CATS} /> */}

				{/* <SectionOurFeatures /> */}

				{/* <SectionGridFeaturePlaces cardType="card2" /> */}

				{/* <SectionHowItWork /> */}

				{/* <div className="relative py-16">
					<BackgroundSection className="bg-orange-50 dark:bg-black/20" />
					<SectionSliderNewCategories
						categories={DEMO_CATS_2}
						categoryCardType="card4"
						itemPerRow={4}
						heading="Suggestions for discovery"
						subHeading="Popular charity events and donation opportunities that Afrik Ticket recommends for you"
						sliderStyle="style2"
					/>
				</div> */}

				{/* <SectionSubscribe2 /> */}

				{/* <div className="relative py-16">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox />
				</div> */}

				{/* <SectionGridCategoryBox /> */}

				{/* <div className="relative py-16">
					<BackgroundSection />
					<SectionBecomeAnAuthor />
				</div> */}
				{/* 
				<SectionSliderNewCategories
					heading="Explore by types of stays"
					subHeading="Explore houses based on 10 types of stays"
					categoryCardType="card5"
					itemPerRow={5}
				/> */}

				{/* <SectionVideos /> */}

				{/* <div className="relative py-16">
					<BackgroundSection />
					<SectionClientSay />
				</div> */}
			</div>
		</main>
	)
}

export default PageHome
