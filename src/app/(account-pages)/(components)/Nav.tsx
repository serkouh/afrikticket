'use client'

import { Route } from '@/routers/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Nav = () => {
	const pathname = usePathname()

	// Define the routes and their respective French labels
	const listNav: { path: Route; label: string }[] = [
		{ path: '/account', label: 'Compte' },
		{ path: '/account-password', label: 'Mot de passe du compte' },
	]

	return (
		<div className="container">
			<div className="hiddenScrollbar flex space-x-8 overflow-x-auto md:space-x-14">
				{listNav.map(({ path, label }) => {
					const isActive = pathname === path
					return (
						<Link
							key={path}
							href={path}
							className={`block flex-shrink-0 border-b-2 py-5 capitalize md:py-8 ${
								isActive
									? 'border-primary-500 font-medium'
									: 'border-transparent'
							}`}
						>
							{label}
						</Link>
					)
				})}
			</div>
		</div>
	)
}
