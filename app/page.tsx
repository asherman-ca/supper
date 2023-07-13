import Image from 'next/image'
import dashboardpreviewcrop from '../public/dashboardpreviewcrop.jpg'

export default function Home() {
	return (
		<main className='flex-1 flex justify-center items-center p-4 gap-8 relative'>
			<div className='absolute top-0 right-0 -z-10 opacity-25'>
				<Image
					src={dashboardpreviewcrop}
					alt='dashboard preview'
					className='border border-gray-200'
				/>
			</div>
			<div className='flex flex-col  gap-4 mt-4 bg-white dark:bg-[#1D232A] p-8 border-2 border-gray-200 max-w-[50%] rounded-md shadow-md'>
				<h1 className='font-bold text-5xl'>Organize your Job Search</h1>
				<h2 className='font-semibold text-lg'>Optimized CVs with Openai</h2>
				<p className='font-semibold text-lg'>
					Save time and use AI to write coverletters from your laptop or phone
					instead of wasting countless hours. Organize your job searches and
					applications with our streamlined dashboard.
				</p>
			</div>
		</main>
	)
}
