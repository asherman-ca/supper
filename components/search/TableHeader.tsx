'use client'
import { FC } from 'react'
import { ExtendedSearch } from '@/types/search'
import { Filter } from 'lucide-react'
import CreateJob from './CreateJob'

interface TableHeaderProps {
	search: ExtendedSearch | null
}

const TableHeader: FC<TableHeaderProps> = ({ search }) => {
	return (
		<div className='flex items-center justify-between border-b border-gray-200 pb-4 px-4'>
			<div className='flex items-center gap-4'>
				<h2 className='font-medium'>Job Search: {search?.name}</h2>
				<hr className='bg-gray-200 w-[2px] h-6' />
				<div className='flex items-center gap-2 font-medium cursor-pointer'>
					<Filter className='h-4 w-4' />
					Filter
				</div>
			</div>
			<CreateJob searchId={search?.id} />
		</div>
	)
}

export default TableHeader
