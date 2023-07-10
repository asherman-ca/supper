/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: ['class', '[data-theme="dark"]'],
	daisyui: {
		themes: ['light', 'dark', 'cupcake'],
	},
	plugins: [require('daisyui')],
}
