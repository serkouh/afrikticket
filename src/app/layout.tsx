'use client'; // Convert this file to a Client Component

import { Poppins } from 'next/font/google'
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import ClientCommons from './ClientCommons'
import '@/app/globals.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import Footer2 from '@/components/Footer2'
import { Metadata } from 'next'
import ThemeProvider from './theme-provider'
import { usePathname } from 'next/navigation'

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

// export const metadata: Metadata = {
// 	title: 'Afrik Ticket - Billetterie en ligne',
// 	description: "Afrik Ticket est une plateforme guinéenne de billetterie en ligne, conçue pour simplifier l'achat de billets d'événements et pour soutenir des initiatives caritatives par le financement participatif. Axée sur l’accessibilité, la sécurité et la performance.",
// 	keywords: 'Afrik Ticket, Billetterie en ligne, Guinée, Événements, Financement participatif, Accessibilité, Sécurité, Performance',
// }

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: any
}) {
	const pathname = usePathname();

	// Define routes where the footer should not appear
	const noFooterRoutes = ['/login', '/signup'];

	// Check if the current route is in the noFooterRoutes array
	const showFooter = !noFooterRoutes.includes(pathname);

	return (
		<html lang="en" className={poppins.className}>
			<ThemeProvider>
				<body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
					<div>
						{showFooter && <SiteHeader />}
						{children}
						{/* Render Footer2 only if the current route is not in noFooterRoutes */}
						{showFooter && <Footer2 />}
					</div>
					<ClientCommons />
				</body>
			</ThemeProvider>
		</html>
	)
}
