import { Job } from '@prisma/client'
import { ChangeEvent, FC } from 'react'
import JobItem from './JobItem'
import { ExtendedSearch } from '@/types/search'

interface JobTableProps {
	search: ExtendedSearch
	displayJobs: Job[]
	setSelectedJobs: (arg: (prev: string[]) => string[]) => void
	selectedJobs: string[]
}

const JobTable: FC<JobTableProps> = ({
	search,
	displayJobs,
	setSelectedJobs,
	selectedJobs,
}) => {
	const handleCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
		if (e.target.checked) {
			setSelectedJobs((prev: string[]) => [...prev, id])
		} else {
			setSelectedJobs((prev: string[]) => prev.filter((job) => job !== id))
		}
	}

	const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSelectedJobs((prev) => displayJobs.map((job) => job.id))
		} else {
			setSelectedJobs((prev) => [])
		}
	}

	return (
		<div className='py-4 px-4'>
			<div className='flex pb-2 font-medium border-b border-gray-200'>
				<label className='flex items-center mr-4'>
					<input
						type='checkbox'
						className='checkbox'
						onChange={handleCheckAll}
					/>
				</label>
				<div className='basis-[20%]'>Company</div>
				<div className='basis-[20%] text-end'>Role</div>
				<div className='basis-[20%] text-end'>Location</div>
				<div className='basis-[20%] text-end'>Status</div>
				<div className='basis-[20%] text-end'>Date</div>
			</div>
			{displayJobs.map((job) => {
				const isSelected = selectedJobs.includes(job.id)
				return (
					<JobItem
						isSelected={isSelected}
						key={job.id}
						job={job}
						searchId={search.id}
						handleCheck={handleCheck}
					/>
				)
			})}
		</div>
	)
}

export default JobTable
