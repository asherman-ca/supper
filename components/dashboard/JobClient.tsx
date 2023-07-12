'use client'
import { ExtendedSearch } from '@/types/search'
import { FC, useMemo, useState } from 'react'
import TableHeader from '../search/TableHeader'
import JobTable from './JobTable'
import { StatusType } from '@prisma/client'

interface JobClientProps {
	search: ExtendedSearch
}

const JobClient: FC<JobClientProps> = ({ search }) => {
	const [filter, setFilter] = useState<StatusType>('ACTIVE')
	const [selectedJobs, setSelectedJobs] = useState<string[]>([])

	const displayJobs = useMemo(() => {
		return search.jobs?.filter((job) => job.status === filter)
	}, [filter])

	const handleStateUpdate = (e, state) => {}

	return (
		<div className='flex-[3] flex flex-col py-4'>
			<TableHeader
				search={search}
				setFilter={setFilter}
				selectedJobs={selectedJobs}
				handleStateUpdate={handleStateUpdate}
			/>
			<JobTable
				search={search!}
				displayJobs={displayJobs}
				setSelectedJobs={setSelectedJobs}
				selectedJobs={selectedJobs}
			/>
		</div>
	)
}

export default JobClient
