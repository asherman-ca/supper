import TableHeader from '@/components/search/TableHeader'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ExtendedSearch } from '@/types/search'
import React from 'react'

const page = async ({ params }: { params: { slug: string } }) => {
	const session = await getAuthSession()
	const { slug } = params

	const search: ExtendedSearch | null = await db.search.findUnique({
		where: {
			id: slug,
		},
		include: {
			jobs: true,
		},
	})

	return (
		<div className='flex-[3] flex flex-col py-4'>
			<TableHeader search={search} />
		</div>
	)
}

export default page
