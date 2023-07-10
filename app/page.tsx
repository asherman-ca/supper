'use client'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

export default function Home() {
	useEffect(() => {
		themeChange(false)
	}, [])
	return (
		<main>
			<button data-toggle-theme='dark,light' data-act-class='ACTIVECLASS'>
				Toggle
			</button>
			<p>LOREM IPSUM</p>
		</main>
	)
}
