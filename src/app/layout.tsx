import { Poppins } from 'next/font/google'
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import ClientCommons from './ClientCommons'
import '@/app/globals.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import Footer2 from '@/components/Footer2'
import ThemeProvider from './theme-provider'
import { headers } from 'next/headers'

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Get the current path server-side
	const headersList = headers()
	const pathname = headersList.get("x-pathname") || "/"
	const noFooterRoutes = ['/login', '/signup']
	const showFooter = !noFooterRoutes.includes(pathname)

	return (
		<html lang="en" className={poppins.className}>
			<ThemeProvider>
				<body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
					<div>
						{showFooter && <SiteHeader />}
						{children}
						{showFooter && <Footer2 />}
					</div>
					<ClientCommons />
				</body>
			</ThemeProvider>
		</html>
	)
}
