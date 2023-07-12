import JobItem from '@/components/dashboard/JobItem'
import TableHeader from '@/components/search/TableHeader'
import { db } from '@/lib/db'
import { ExtendedSearch } from '@/types/search'
import React from 'react'

const page = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params

	const search: ExtendedSearch | null = await db.search.findUnique({
		where: {
			id: slug,
		},
		include: {
			jobs: true,
		},
	})

	return (
		<div className='flex-[3] flex flex-col py-4'>
			<TableHeader search={search} />
			<div className='py-4'>
				<div className='flex mb-2 px-4 font-medium'>
					<div className='basis-[20%]'>Company</div>
					<div className='basis-[20%] text-end'>Role</div>
					<div className='basis-[20%] text-end'>Location</div>
					<div className='basis-[20%] text-end'>Status</div>
					<div className='basis-[20%] text-end'>Date</div>
				</div>
				{search?.jobs.map((job) => (
					<JobItem job={job} searchId={search.id} />
				))}
			</div>
		</div>
	)
}

export default page
