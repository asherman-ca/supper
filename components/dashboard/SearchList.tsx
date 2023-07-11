'use client'
import { FC } from 'react'
import { Search } from '@prisma/client'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { XCircle } from 'lucide-react'
import SearchListItem from './SearchListItem'

interface SearchListProps {
	initialSearches: Search[]
}

const SearchList: FC<SearchListProps> = ({ initialSearches }) => {
	const router = useRouter()

	const { mutate: deleteSearch, isLoading } = useMutation({
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
			{initialSearches.map((search) => {
				return (
					<div key={search.id} className='flex justify-between items-center'>
						<Link
							href={`/dashboard/${search.id}`}
							className='font-medium truncate'
						>
							{search.name}
						</Link>
						<button
							onClick={() => deleteSearch(search.id)}
							className='hover:text-red-500'
							key={search.id}
							disabled={isLoading}
						>
							<XCircle className={`h-5 w-5`} />
						</button>
					</div>
				)
			})}
		</div>
	)
}

export default SearchList
