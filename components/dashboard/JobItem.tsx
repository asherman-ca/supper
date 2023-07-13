'use client'
import { Job } from '@prisma/client'
import Link from 'next/link'
import { ChangeEvent, FC } from 'react'
import { statusMap } from '@/lib/statusMap'
import { motion } from 'framer-motion'

interface JobItemProps {
	job: Job
	searchId: string
	handleCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void
	isSelected: boolean
}

const JobItem: FC<JobItemProps> = ({
	job,
	searchId,
	handleCheck,
	isSelected,
}) => {
	return (
		<motion.div
			layout
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			className='flex items-center gap-4 border-b border-gray-200 py-2'
		>
			<label className='flex items-center'>
				<input
					checked={isSelected}
					type='checkbox'
					className='checkbox'
					onChange={(e) => handleCheck(e, job.id)}
				/>
			</label>
			<Link
				href={`/dashboard/${searchId}/${job.id}`}
				className='flex flex-1 items-center py-2 hover:text-gray-500 dark:hover:text-white cursor-pointer'
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
