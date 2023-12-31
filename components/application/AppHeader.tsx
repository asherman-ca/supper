import { Job } from '@prisma/client'
import { FC } from 'react'
import { statusMap } from '@/lib/statusMap'

interface AppHeaderProps {
	job: Job
	onSubmit: (e: any) => void
}

const AppHeader: FC<AppHeaderProps> = ({ job, onSubmit }) => {
	return (
		<div className='flex justify-between items-center px-4 pb-4 border-b border-gray-200'>
			<div className='font-medium'>Status: {statusMap[job.status]}</div>
			<div className='flex gap-4'>
				<button className='btn btn-sm'>Edit</button>
				<button className='btn btn-sm' onClick={onSubmit}>
					Generate CV
				</button>
			</div>
		</div>
	)
}

export default AppHeader
