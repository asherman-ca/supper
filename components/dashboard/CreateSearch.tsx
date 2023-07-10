'use client'
import { FC, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

interface CreateSearchProps {
	userId: string | undefined
}

const CreateSearch: FC<CreateSearchProps> = ({ userId }) => {
	const { register, handleSubmit } = useForm()
	const modalRef = useRef<HTMLDialogElement>(null)

	const { mutate: createSearch, isLoading } = useMutation({
		mutationFn: async (formData: any) => {
			const { data } = await axios.post('/api/searches', formData)
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

	const onSubmit = (data: any) => {
		console.log('hits')
		// console.log('data', data)
		createSearch(data)
		// window.my_modal_1.close()
	}

	return (
		<>
			<div className='flex gap-2' onClick={() => window.my_modal_1.showModal()}>
				<PlusCircle />
				CreateSearch
			</div>
			<dialog id='my_modal_1' className='modal' ref={modalRef}>
				<form
					// onSubmit={handleSubmit(onSubmit)}
					method='dialog'
					className='modal-box'
				>
					<label>
						Search Name
						<input {...register('searchName')} />
					</label>
					<div className='flex items-center justify-between'>
						<div className='modal-action'>
							<button onClick={handleSubmit(onSubmit)}>Submit</button>
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
