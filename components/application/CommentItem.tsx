'use client'
import { Comment } from '@prisma/client'
import { FC } from 'react'
import { XCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface CommentItemProps {
	comment: Comment
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
	const router = useRouter()

	const { mutate: deleteSearch, isLoading } = useMutation({
		mutationFn: async (id: string) => {
			const { data } = await axios.delete(
				`/api/searches/jobs/comments?id=${id}`
			)
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
		<div className='flex flex-col gap-2'>
			<div className='text-sm font-semibold flex justify-between items-center'>
				Posted {comment.CreatedAt.toDateString()}
				<button
					onClick={() => deleteSearch(comment.id)}
					className='hover:text-red-500'
				>
					<XCircle
						className={`h-5 w-5 ${isLoading && 'animate-spin text-red-500'}`}
					/>
				</button>
			</div>
			{comment.content}
		</div>
	)
}

export default CommentItem
