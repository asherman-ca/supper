import JobTable from '@/components/dashboard/JobTable'
import TableHeader from '@/components/search/TableHeader'
import { db } from '@/lib/db'
import { ExtendedSearch } from '@/types/search'
import React from 'react'
import JobClient from '@/components/dashboard/JobClient'

const page = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params

	const search: ExtendedSearch | null = await db.search.findUnique({
		where: {
			id: slug,
		},
		include: {
			jobs: true,
		},
	})

	return <JobClient search={search!} />
}

export default page
