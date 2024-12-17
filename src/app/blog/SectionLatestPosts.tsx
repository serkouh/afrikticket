import React, { FC } from 'react'
import Heading from '@/shared/Heading'
import { DEMO_POSTS } from '@/data/posts'
import { PostDataType } from '@/data/types'
import Pagination from '@/shared/Pagination'
import ButtonPrimary from '@/shared/ButtonPrimary'
import WidgetTags from './WidgetTags'
import WidgetCategories from './WidgetCategories'
import WidgetPosts from './WidgetPosts'
import Card3 from './Card3'

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 14)
//
export interface SectionLatestPostsProps {
	posts?: PostDataType[]
	className?: string
	postCardName?: 'card3'
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
	posts = postsDemo,
	postCardName = 'card3',
	className = '',
}) => {
	const renderCard = (post: PostDataType) => {
		switch (postCardName) {
			case 'card3':
				return <Card3 key={post.id} className="" post={post} />

			default:
				return null
		}
	}

	return (
		<div className={`nc-SectionLatestPosts relative ${className}`}>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
					<Heading>Latest Articles 🎈</Heading>
					<div className={`grid grid-cols-1 gap-6 md:gap-8`}>
						{posts.map((post) => renderCard(post))}
					</div>
					<div className="mt-12 flex flex-col space-y-5 sm:flex-row sm:items-center sm:justify-between sm:space-x-3 sm:space-y-0 md:mt-20">
						<Pagination />
						<ButtonPrimary loading>Show me more</ButtonPrimary>
					</div>
				</div>
				<div className="mt-24 w-full space-y-7 lg:mt-0 lg:w-2/5 lg:pl-10 xl:w-1/3 xl:pl-0">
					<WidgetTags />
					<WidgetCategories />
					<WidgetPosts />
				</div>
			</div>
		</div>
	)
}

export default SectionLatestPosts
