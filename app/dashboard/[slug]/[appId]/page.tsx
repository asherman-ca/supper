import AppHeader from '@/components/application/AppHeader'
import Completion from '@/components/application/Completion'
import { db } from '@/lib/db'
import { FC } from 'react'

interface pageProps {
	params: {
		slug: string
		appId: string
	}
}

const page: FC<pageProps> = async ({ params }) => {
	const { slug, appId } = params

	const job = await db.job.findUnique({
		where: {
			id: appId,
		},
	})
	return (
		<div className='flex-[3] flex flex-col py-4'>
			<AppHeader job={job!} />
			<div className='p-4 flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Company:</p>
					<p>{job?.company}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Role:</p>
					<p>{job?.role}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Location:</p>
					<p>{job?.location}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Created:</p>
					<p>{job?.CreatedAt.toDateString()}</p>
				</div>
			</div>
			<Completion />
		</div>
	)
}

export default page
