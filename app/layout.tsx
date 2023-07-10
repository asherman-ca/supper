import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '../components/Nav'

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
			<body className={inter.className}>
				<Nav />
				{children}
			</body>
		</html>
	)
}
