import { CreateJobValidator, JobValidator } from '@/lib/validators/job'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'

interface CreateJobProps {
	searchId: string | undefined
}

const CreateJob: FC<CreateJobProps> = ({ searchId }) => {
	const router = useRouter()
	const modalRef = useRef<HTMLDialogElement>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateJobValidator>({
		defaultValues: {
			role: '',
			company: '',
			location: '',
			status: 'ACTIVE',
			searchId: searchId,
		},
		resolver: zodResolver(JobValidator),
	})

	const { mutate: createJob, isLoading } = useMutation({
		mutationFn: async ({
			role,
			company,
			location,
			status,
			searchId,
		}: CreateJobValidator) => {
			console.log('hitsss')
			const payload: CreateJobValidator = {
				role,
				company,
				location,
				status,
				searchId,
			}
			const { data } = await axios.post('/api/searches/jobs', payload)
			return data
		},
		onSuccess: (data) => {
			modalRef.current!.close()
			reset()
			router.refresh()
			// router.push(`/dashboard/${searchId}/${data}`)
		},
		onError: (err) => {
			alert('error')
		},
	})

	const onSubmit = (data: CreateJobValidator) => {
		console.log('hits')
		createJob(data)
	}

	console.log(errors)

	return (
		<>
			<button
				className='btn btn-sm'
				// @ts-ignore
				onClick={() => window.my_modal_2.showModal()}
			>
				<PlusCircle className='w-4 h-4' />
				Add Job
			</button>
			<dialog id='my_modal_2' className='modal' ref={modalRef}>
				<form method='dialog' className='modal-box'>
					<div className='flex flex-col gap-4'>
						<h2 className='text-2xl font-semibold'>Add New Job</h2>
						<label>
							<input
								{...register('role')}
								type='text'
								placeholder='Enter Job Role'
								className='input input-bordered w-full max-w-xs'
							/>
							{errors.role && (
								<p className='text-red-400 mt-2'>
									{errors.role?.message?.replace(/String/gi, 'Role')}
								</p>
							)}
						</label>

						<label>
							<input
								{...register('company')}
								type='text'
								placeholder='Enter Company Name'
								className='input input-bordered w-full max-w-xs'
							/>
							{errors.company && (
								<p className='text-red-400 mt-2'>
									{errors.company?.message?.replace(/String/gi, 'Company')}
								</p>
							)}
						</label>

						<label>
							<input
								{...register('location')}
								type='text'
								placeholder='Enter Location'
								className='input input-bordered w-full max-w-xs'
							/>
							{errors.location && (
								<p className='text-red-400 mt-2'>
									{errors.location?.message?.replace(/String/gi, 'Location')}
								</p>
							)}
						</label>

						<div className='self-start'>
							<button className='btn' onClick={handleSubmit(onSubmit)}>
								{isLoading && <span className='loading loading-spinner'></span>}
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

export default CreateJob
