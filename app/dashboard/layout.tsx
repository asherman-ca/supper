import CreateSearch from '@/components/dashboard/CreateSearch'
import SearchListItem from '@/components/dashboard/SearchListItem'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession()
	const searches = await db.search.findMany({
		where: {
			userId: session?.user.id,
		},
		orderBy: {
			CreatedAt: 'desc',
		},
	})
	return (
		<div className='flex flex-1'>
			<div className='flex-1 flex flex-col gap-4 border-r border-gray-200 p-5'>
				<CreateSearch />
				<hr className='bg-gray-200 h-[2px]' />
				<div className='flex flex-col gap-4'>
					{searches?.map((search) => {
						return <SearchListItem key={search.id} search={search} />
					})}
				</div>
			</div>
			<div className='flex-[3] flex justify-start p-5'>{children}</div>
		</div>
	)
}

export default layout
