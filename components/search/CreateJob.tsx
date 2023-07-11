import { CreateJobValidator, JobValidator } from '@/lib/validators/job'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

interface CreateJobProps {}

const CreateJob: FC<CreateJobProps> = ({}) => {
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
		},
		resolver: zodResolver(JobValidator),
	})

	const onSubmit = (data: CreateJobValidator) => {
		console.log(data)
	}

	return (
		<button className='btn btn-sm'>
			<PlusCircle className='w-4 h-4' />
			Add Job
		</button>
	)
}

export default CreateJob
