import __stayListing from './jsons/__stayListing.json'
import __carsListing from './jsons/__carsListing.json'
import __experiencesListing from './jsons/__experiencesListing.json'
import { DEMO_STAY_CATEGORIES, DEMO_EXPERIENCES_CATEGORIES } from './taxonomies'
import { CarDataType, ExperiencesDataType, StayDataType } from './types'
import { DEMO_AUTHORS } from './authors'
import event1 from '@/images/1.jpg'
import event2 from '@/images/2.jpg'
import event3 from '@/images/3.png'
import event4 from '@/images/4.jpg'
import event5 from '@/images/5.jpg'
import event6 from '@/images/6.jpg'
import event7 from '@/images/7.jpg'
import event8 from '@/images/8.jpg'
import event9 from '@/images/9.jpg'
import event10 from '@/images/10.jpg'
import event11 from '@/images/11.jpg'
import event12 from '@/images/12.jpg'
import { Route } from '@/routers/types'
const eventsImgs = [
	event1,
	event2,
	event3,
	event4,
	event5,
	event6,
	event7,
	event8,
	event9,
	event10,
	event11,
	event12,
]
const eventTitle = [
	'Le Piège En Salle',
	`Concert M'mah kouyaté`,
	'Spectacle Slam & Humour',
	'BANTIGNEL EVENTS',
	'Tiakola au paradis',
	'Place au soleil à Room',
	'Questions pour un Champion',
	'Brunch de la CAN',
	'Magic Park',
	'Brunch de la CAN',
	'REINE D’AFRIQUE',
	'Tiakola au paradis',
]

const DEMO_STAY_LISTINGS = __stayListing.map((post, index): StayDataType => {
	//  ##########  GET CATEGORY BY CAT ID ######## //
	const category = DEMO_STAY_CATEGORIES.filter(
		(taxonomy) => taxonomy.id === post.listingCategoryId,
	)[0]

	return {
		...post,
		id: `stayListing_${index}_`,
		saleOff: !index ? '-20% today' : post.saleOff,
		isAds: !index ? true : post.isAds,
		author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
		listingCategory: category,
		href: post.href as Route,
	}
})

const DEMO_EXPERIENCES_LISTINGS = __experiencesListing.map(
	(post, index): ExperiencesDataType => {
		//  ##########  GET CATEGORY BY CAT ID ######## //
		const category = DEMO_EXPERIENCES_CATEGORIES.filter(
			(taxonomy) => taxonomy.id === post.listingCategoryId,
		)[0]

		return {
			...post,
			id: `experiencesListing_${index}_`,
			saleOff: !index ? '-20% today' : post.saleOff,
			isAds: !index ? true : post.isAds,
			author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
			listingCategory: category,
			href: post.href as Route,
		}
	},
)

const DEMO_CAR_LISTINGS = __carsListing.map((post, index): CarDataType => {
	//  ##########  GET CATEGORY BY CAT ID ######## //
	const category = DEMO_EXPERIENCES_CATEGORIES.filter(
		(taxonomy) => taxonomy.id === post.listingCategoryId,
	)[0]

	return {
		...post,
		id: `carsListing_${index}_`,
		saleOff: !index ? '-20% today' : post.saleOff,
		isAds: !index ? true : post.isAds,
		author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
		listingCategory: category,
		featuredImage: eventsImgs[index],
		href: post.href as Route,
		title: eventTitle[index],
	}
})

export { DEMO_STAY_LISTINGS, DEMO_EXPERIENCES_LISTINGS, DEMO_CAR_LISTINGS }
