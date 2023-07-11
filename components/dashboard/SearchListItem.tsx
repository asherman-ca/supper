'use client'
import { FC, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FolderOpen, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Search } from '@prisma/client'

interface SearchListItemProps {
	search: Search
}

const SearchListItem: FC<SearchListItemProps> = ({ search }) => {
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
		<div className='flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-500/25 py-2 px-4 rounded-full'>
			<Link
				href={`/dashboard/${search.id}`}
				className='flex-1 flex items-center gap-2 font-medium dark:hover:text-white hover:text-slate-500 truncate'
			>
				<FolderOpen className='w-5 h-5' />
				{search.name}
			</Link>
			<button
				onClick={() => deleteSearch(search.id)}
				className='hover:text-red-500'
				key={search.id}
			>
				<XCircle
					className={`h-5 w-5 ${isLoading && 'animate-spin text-red-500'}`}
				/>
			</button>
		</div>
	)
}

export default SearchListItem
