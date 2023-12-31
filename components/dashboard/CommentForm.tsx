import { FC } from 'react'
import {
	CommentValidator,
	CreateCommentValidator,
} from '@/lib/validators/comment'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

interface CommentFormProps {
	jobId: string
}

const CommentForm: FC<CommentFormProps> = ({ jobId }) => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateCommentValidator>({
		defaultValues: {
			content: '',
			jobId: jobId,
		},
		resolver: zodResolver(CommentValidator),
	})

	const { mutate: createComment, isLoading } = useMutation({
		mutationFn: async ({ content, jobId }: CreateCommentValidator) => {
			const payload: CreateCommentValidator = { content, jobId }
			const { data } = await axios.post('/api/searches/jobs/comments', payload)
			return data
		},
		onSuccess: (data) => {
			reset()
			router.refresh()
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				alert(err.response?.data)
			}
		},
	})

	const onSubmit = (data: CreateCommentValidator) => {
		console.log('hits')
		const payload: CreateCommentValidator = { content: data.content, jobId }

		createComment(payload)
	}

	return (
		<>
			<form className='mx-4 mt-auto relative' onSubmit={handleSubmit(onSubmit)}>
				<textarea
					{...register('content')}
					placeholder='Write a comment...'
					className='textarea textarea-bordered textarea-md w-full rounded-none min-h-[8rem] !border-gray-200'
				></textarea>
				<button className='absolute bottom-4 right-2 btn btn-sm' type='submit'>
					{isLoading && (
						<span className='loading loading-spinner loading-sm'></span>
					)}
					Post
				</button>
				{errors.content && (
					<p className='text-red-400 absolute left-4 bottom-4'>
						{errors.content?.message?.replace(/String/gi, 'Content')}
					</p>
				)}
			</form>
		</>
	)
}

export default CommentForm
