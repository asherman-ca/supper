'use client'
import { Job } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'

interface JobItemProps {
	job: Job
	searchId: string
}

const JobItem: FC<JobItemProps> = ({ job, searchId }) => {
	return (
		<Link
			href={`/dashboard/${searchId}/${job.id}`}
			className='flex py-1 hover:shadow-md dark:hover:bg-gray-100/25 px-4 cursor-pointer'
		>
			<div className='basis-[20%] font-medium'>{job.company}</div>
			<div className='basis-[20%] text-end'>{job.role}</div>
			<div className='basis-[20%] text-end'>{job.location}</div>
			<div className='basis-[20%] text-end'>{job.status}</div>
			<div className='basis-[20%] text-end'>{job.CreatedAt.toDateString()}</div>
		</Link>
	)
}

export default JobItem
