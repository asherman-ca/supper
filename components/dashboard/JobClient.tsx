'use client'
import { ExtendedSearch } from '@/types/search'
import { FC, useMemo, useState } from 'react'
import TableHeader from '../search/TableHeader'
import JobTable from './JobTable'
import { StatusType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { set } from 'zod'

interface JobClientProps {
	search: ExtendedSearch
}

const JobClient: FC<JobClientProps> = ({ search }) => {
	const router = useRouter()
	const [filter, setFilter] = useState<StatusType>('ACTIVE')
	const [selectedJobs, setSelectedJobs] = useState<string[]>([])

	const displayJobs = useMemo(() => {
		return search.jobs?.filter((job) => job.status === filter)
	}, [filter, search])

	const onStateUpdate = () => {}

	// Delete Logic

	const { mutate: deleteJobs, isLoading } = useMutation({
		mutationFn: async (ids: string[]) => {
			const res = await axios.delete(`/api/searches/jobs?ids=${ids.join(',')}`)
			return res.data
		},
		onSuccess: (data) => {
			setSelectedJobs([])
			router.refresh()
		},
		onError: (err) => {
			console.log(err)
		},
	})

	const onDelete = () => {
		deleteJobs(selectedJobs)
	}

	return (
		<div className='flex-[3] flex flex-col py-4'>
			<TableHeader
				search={search}
				setFilter={setFilter}
				selectedJobs={selectedJobs}
				onStateUpdate={onStateUpdate}
				onDelete={onDelete}
				isLoading={isLoading}
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
