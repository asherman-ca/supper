'use client'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { CreateSearchValidator, SearchValidator } from '@/lib/validators/search'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const CreateSearch = () => {
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
			router.refresh()
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
				className='flex items-center justify-between mx-2 gap-2 cursor-pointer font-medium dark:hover:text-white hover:text-slate-500 hover:bg-gray-100 dark:hover:bg-gray-500/25 py-2 px-4 rounded-full'
				// @ts-ignore
				onClick={() => window.my_modal_1.showModal()}
			>
				CreateSearch
				<PlusCircle className='h-5 w-5' />
			</div>
			<dialog id='my_modal_1' className='modal' ref={modalRef}>
				<form method='dialog' className='modal-box'>
					<h2 className='text-2xl font-semibold mb-4'>Start New Search</h2>
					<label>
						<input
							{...register('name')}
							type='text'
							placeholder='Enter Search Name'
							className='input input-bordered w-full max-w-xs'
						/>
					</label>
					{errors.name && (
						<p className='text-red-400 mt-2'>
							{errors.name?.message?.replace(/String/gi, 'Name')}
						</p>
					)}
					<div className='flex items-center justify-between'>
						<div className='modal-action'>
							<button className='btn' onClick={handleSubmit(onSubmit)}>
								{isLoading && (
									<span className='loading loading-spinner loading-sm'></span>
								)}
								Submit
							</button>
						</div>
					</div>
				</form>
				<form method='dialog' className='modal-backdrop'>
					<button>close</button>
				</form>
			</dialog>
		</>
	)
}

export default CreateSearch
