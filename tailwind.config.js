/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: ['class', '[data-theme="dark"]'],
	daisyui: {
		themes: ['light', 'dark'],
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
		require('tailwind-scrollbar-hide'),
	],
}
