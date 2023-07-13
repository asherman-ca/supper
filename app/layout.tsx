import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '../components/Nav'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Welcome to Supper',
	description: 'Time to start singing',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' data-theme='light'>
			<body
				className={`${inter.className} min-h-screen flex flex-col scrollbar-hide`}
				suppressHydrationWarning={true}
			>
				<Providers>
					<Nav />
					{children}
				</Providers>
			</body>
		</html>
	)
}
