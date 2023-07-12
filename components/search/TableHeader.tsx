'use client'
import { FC } from 'react'
import { ExtendedSearch } from '@/types/search'
import { FileEdit, Filter, Option, TrashIcon } from 'lucide-react'
import CreateJob from './CreateJob'
import { StatusType } from '@prisma/client'

interface TableHeaderProps {
	search: ExtendedSearch | null
	setFilter: (value: StatusType) => void
	selectedJobs?: string[]
	onStateUpdate: (e: any, state: StatusType) => void
	onDelete: () => void
	isLoading: boolean
}

const TableHeader: FC<TableHeaderProps> = ({
	search,
	setFilter,
	selectedJobs,
	onStateUpdate,
	onDelete,
	isLoading,
}) => {
	return (
		<div className='flex items-center justify-between border-b border-gray-200 pb-4 px-4'>
			<div className='flex items-center gap-4'>
				<h2 className='font-medium'>Job Search: {search?.name}</h2>
				<hr className='bg-gray-200 w-[2px] h-6' />
				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-sm m-1'>
						<Filter className='h-4 w-4' />
					</label>
					<ul
						tabIndex={0}
						className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 font-medium'
					>
						<li>
							<a onClick={() => setFilter('ACTIVE')}>Active</a>
						</li>
						<li>
							<a onClick={() => setFilter('INACTIVE')}>Inactive</a>
						</li>
						<li>
							<a onClick={() => setFilter('INTERVIEW')}>Interview</a>
						</li>
					</ul>
				</div>

				{selectedJobs?.length! > 0 && (
					<>
						<div className='dropdown'>
							<label tabIndex={0} className='btn btn-sm m-1'>
								<FileEdit className='h-4 w-4' />
							</label>
							<ul
								tabIndex={0}
								className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 font-medium'
							>
								<li>
									<a onClick={() => setFilter('ACTIVE')}>Active</a>
								</li>
								<li>
									<a onClick={() => setFilter('INACTIVE')}>Inactive</a>
								</li>
								<li>
									<a onClick={() => setFilter('INTERVIEW')}>Interview</a>
								</li>
							</ul>
						</div>

						<button className='btn btn-sm' onClick={onDelete}>
							{!isLoading ? (
								<TrashIcon className={`h-4 w-4`} />
							) : (
								<span className='loading loading-spinner loading-sm'></span>
							)}
						</button>
					</>
				)}
			</div>

			<CreateJob searchId={search?.id} />
		</div>
	)
}

export default TableHeader
