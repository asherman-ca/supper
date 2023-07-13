import Image from 'next/image'
import dashboardpreview from '../public/dashboardpreview.jpg'

export default function Home() {
	return (
		<main className='flex-1 flex flex-col p-4 gap-8'>
			<div className='flex flex-col gap-4 mt-4'>
				<h1 className='font-bold text-5xl'>Organize your Job Search</h1>
				<h2 className='font-semibold text-lg'>Optimized CVs with Openai</h2>
				<p className='font-semibold text-lg max-w-[50%]'>
					Save time and use AI to write coverletters from your laptop or phone
					instead of wasting countless hours. Organize your job searches and
					applications with our streamlined dashboard.
				</p>
			</div>
			<div className='flex justify-between gap-4 max-w-fit'>
				<div>
					<h3 className='font-semibold text-xl mb-2'>Dashboard</h3>
					<Image
						src={dashboardpreview}
						alt='dashboard preview'
						className='border border-gray-200 rounded-md'
					/>
				</div>
				<div>
					<h3 className='font-semibold text-xl mb-2'>Application Page</h3>
					<Image
						src={dashboardpreview}
						alt='dashboard preview'
						className='border border-gray-200 rounded-md'
					/>
				</div>
			</div>
		</main>
	)
}
