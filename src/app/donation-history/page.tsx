'use client'

import React, { FC } from 'react'
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
import LikeSaveBtns from '@/components/LikeSaveBtns'
import { usePathname, useRouter } from 'next/navigation'
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
import Heading2 from '@/shared/Heading2'
import FlightCard, { FlightCardProps } from '@/components/FlightCard'
import FlightCard2 from '@/components/FlightCard2'

export interface ListingCarDetailPageProps { }

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({ }) => {
    // USE STATE

    const thisPathname = usePathname()
    const router = useRouter()

    const handleOpenModalImageGallery = () => {
        router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
    }


    //

    const renderSection2 = () => {
        return (
            <div className="listingSection__wrap">
                <div className="relative w-full h-96">
                    <Image
                        fill
                        src={eventTicket2}
                        alt="photo 0"
                        className="rounded-md object-cover sm:rounded-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                </div>
                <h2 className="text-2xl font-semibold">Event Name</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                <div className="text-neutral-600 dark:text-neutral-300">
                    <p>
                        Date: 12/12/2014
                        <br />
                        <br />
                        Price: 10,000 FGN
                        <br />
                        <br />
                        No.of attendes: 10
                    </p>
                </div>
                <div className="text-neutral-600 dark:text-neutral-300">
                    <ButtonPrimary>Download Ticket</ButtonPrimary>
                </div>
            </div>
        )
    }

    const DEMO_DATA: FlightCardProps["data"][] = [
		{
			id: "1",
			price: "10,000 FGN",
			airlines: {
				logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
				name: "Nom de l'événement",
			},
		},
		{
			id: "2",
			price: "5,000 FGN",
			airlines: {
				logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
				name: "Nom de l'événement",
			},
		},
		{
			id: "3",
			price: "15,000 FGN",
			airlines: {
				logo: "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
				name: "Nom de l'événement",
			},
		},
		{
			id: "3",
			price: "10,000 FGN",
			airlines: {
				logo: "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
				name: "Nom de l'événement",
			},
		},
		{
			id: "3",
			price: "10,000 FGN",
			airlines: {
				logo: "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
				name: "Nom de l'événement",
			},
		},
		{
			id: "3",
			price: "10,000 FGN",
			airlines: {
				logo: "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
				name: "Nom de l'événement",
			},
		},
	];




    return (
        <div className={`nc-ListingCarDetailPage`}>


            <main className="relative z-10 mt-11 flex justify-center">
            <Heading2
					heading="Historique des dons"
					subHeading=""
				/>
            </main>

            <div className=" mt-10 container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
				<div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
					{DEMO_DATA.map((item, index) => (
						<FlightCard2 key={index} data={item} />
					))}

					{/* <div className="flex mt-12 justify-center items-center">
						<ButtonPrimary loading>Show more</ButtonPrimary>
					</div> */}
				</div>
            </div>

        </div>
    )
}

export default ListingCarDetailPage
