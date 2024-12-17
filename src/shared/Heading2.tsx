import React from 'react'
import { ReactNode } from 'react'

export interface Heading2Props {
	heading?: ReactNode
	subHeading?: ReactNode
	className?: string
}

const Heading2: React.FC<Heading2Props> = ({
	className = '',
	heading = 'Stays in Tokyo',
	subHeading,
}) => {
	return (
		<div className={`mb-12 lg:mb-16 ${className}`}>
			<h2 className="text-4xl font-semibold">{heading}</h2>
		</div>
	)
}

export default Heading2
