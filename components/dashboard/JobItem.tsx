'use client'
import { Job } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { statusMap } from '@/lib/statusMap'
import { motion } from 'framer-motion'

interface JobItemProps {
	job: Job
	searchId: string
}

const JobItem: FC<JobItemProps> = ({ job, searchId }) => {
	return (
		<motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
			<Link
				href={`/dashboard/${searchId}/${job.id}`}
				className='flex py-2 hover:shadow-md dark:hover:bg-gray-100/25 px-4 cursor-pointer border-b border-gray-200'
			>
				<div className='basis-[20%] font-medium'>{job.company}</div>
				<div className='basis-[20%] text-end'>{job.role}</div>
				<div className='basis-[20%] text-end'>{job.location}</div>
				<div className='basis-[20%] text-end'>{statusMap[job.status]}</div>
				<div className='basis-[20%] text-end'>
					{job.CreatedAt.toDateString()}
				</div>
			</Link>
		</motion.div>
	)
}

export default JobItem
