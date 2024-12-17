import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logoImage from '@/images/logos/logo-afrik-ticket.png'

export interface LogoProps {
	className?: string
}

const Logo: React.FC<LogoProps> = ({ className = 'w-24' }) => {
	return (
		<Link
			href="/"
			className={`ttnc-logo text-primary-600 inline-block focus:outline-none focus:ring-0 ${className}`}
			style={{ width: '150px', height: '25px' }}
		>
			<Image src={logoImage} alt="Logo" />
		</Link>
	)
}

export default Logo
