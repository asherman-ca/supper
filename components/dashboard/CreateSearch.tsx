'use client'
import { FC, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { CreateSearchValidator, SearchValidator } from '@/lib/validators/search'
import { zodResolver } from '@hookform/resolvers/zod'

interface CreateSearchProps {
	userId: string | undefined
}

const CreateSearch: FC<CreateSearchProps> = ({ userId }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateSearchValidator>({
		defaultValues: {
			name: 'Enter Search Name...',
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
			console.log(data)
			modalRef.current!.close()
		},
		onError: (err) => {
			alert('error')
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
				onClick={() => window.my_modal_1.showModal()}
			>
				<PlusCircle />
				CreateSearch
			</div>
			<dialog id='my_modal_1' className='modal' ref={modalRef}>
				<form method='dialog' className='modal-box'>
					<label>
						Search Name
						<input {...register('name')} />
					</label>
					{errors.name && (
						<p className='text-red-400 mt-2'>{errors.name.message}</p>
					)}
					<div className='flex items-center justify-between'>
						<div className='modal-action'>
							<button className='btn' onClick={handleSubmit(onSubmit)}>
								Submit
							</button>
						</div>

						<div className='modal-action'>
							{/* if there is a button in form, it will close the modal */}
							<button className='btn'>Close</button>
						</div>
					</div>
				</form>
			</dialog>
		</>
	)
}

export default CreateSearch
