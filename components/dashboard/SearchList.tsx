'use client'
import { FC } from 'react'
import { Search } from '@prisma/client'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface SearchListProps {
	initialSearches: Search[]
}

const SearchList: FC<SearchListProps> = ({ initialSearches }) => {
	const router = useRouter()

	const { mutate: deleteSearch } = useMutation({
		mutationFn: async (id: string) => {
			const { data } = await axios.patch(`/api/searches?id=${id}`)
			return data
		},
		onSuccess: () => {
			router.refresh()
		},
		onError: (err) => {
			alert(err)
		},
	})

	return (
		<div className='flex flex-col gap-4'>
			{initialSearches.map((search) => (
				<div key={search.id}>
					<Link
						href={`/dashboard/${search.id}`}
						className='font-medium hover:font-semibold'
					>
						{search.name}
					</Link>
					<button
						onClick={() => deleteSearch(search.id)}
						className='text-red-500 hover:text-red-600'
					>
						Delete
					</button>
				</div>
			))}
		</div>
	)
}

export default SearchList
