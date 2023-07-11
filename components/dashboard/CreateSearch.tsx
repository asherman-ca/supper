'use client'
import { FC, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Loader2, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { CreateSearchValidator, SearchValidator } from '@/lib/validators/search'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

interface CreateSearchProps {
	userId: string | undefined
}

const CreateSearch: FC<CreateSearchProps> = ({ userId }) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateSearchValidator>({
		defaultValues: {
			name: '',
		},
		resolver: zodResolver(SearchValidator),
	})
	const modalRef = useRef<HTMLDialogElement>(null)

	const { mutate: createSearch, isLoading } = useMutation({
		mutationFn: async ({ name }: CreateSearchValidator) => {
			const payload: CreateSearchValidator = { name }
			const { data } = await axios.post('/api/searches', payload)
			return data
		},
		onSuccess: (data) => {
			modalRef.current!.close()
			reset()
			router.push(`/dashboard/${data}`)
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				alert(err.response?.data)
			}
		},
	})

	const onSubmit = (data: CreateSearchValidator) => {
		const payload: CreateSearchValidator = { name: data.name }

		createSearch(payload)
	}

	return (
		<>
			<div
				className='flex gap-2 cursor-pointer'
				// @ts-ignore
				onClick={() => window.my_modal_1.showModal()}
			>
				<PlusCircle />
				CreateSearch
			</div>
			<dialog id='my_modal_1' className='modal' ref={modalRef}>
				<form method='dialog' className='modal-box'>
					<label>
						<input
							{...register('name')}
							type='text'
							placeholder='Enter Search Name'
							className='input input-bordered w-full max-w-xs'
						/>
					</label>
					{errors.name && (
						<p className='text-red-400 mt-2'>{errors.name.message}</p>
					)}
					<div className='flex items-center justify-between'>
						<div className='modal-action'>
							<button className='btn' onClick={handleSubmit(onSubmit)}>
								{isLoading && <Loader2 className='animate-spin' />}
								Submit
							</button>
						</div>

						<div className='modal-action'>
							<button className='btn'>Close</button>
						</div>
					</div>
				</form>
			</dialog>
		</>
	)
}

export default CreateSearch
