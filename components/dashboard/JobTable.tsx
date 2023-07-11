import { Job } from '@prisma/client'
import { FC } from 'react'

interface JobTableProps {
	jobs: Job[] | undefined
}

const JobTable: FC<JobTableProps> = ({ jobs }) => {
	return (
		<div className='p-4 flex flex-col'>
			{jobs?.map((job) => (
				<div>{job.company}</div>
			))}
		</div>
	)
}

export default JobTable
