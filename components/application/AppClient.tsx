'use client'
import { Comment, Job } from '@prisma/client'
import { FC } from 'react'
import AppHeader from './AppHeader'
import { useCompletion } from 'ai/react'
import CommentForm from '../dashboard/CommentForm'
import CommentItem from './CommentItem'

type ExtendedJob = Job & {
	comments: Comment[]
}

interface AppClientProps {
	job: ExtendedJob
	username: string
	searchId: string
}

const AppClient: FC<AppClientProps> = ({ job, username, searchId }) => {
	const { completion, handleSubmit } = useCompletion({
		initialInput: `write a short coverletter for a ${job.role} role at a company named ${job.company}. The applicant has several years of experience and is named ${username}.`,
	})

	const onSubmit = (e: any) => {
		e.preventDefault()
		handleSubmit(e)
	}

	return (
		<div className='flex-[3] flex flex-col py-4'>
			<AppHeader job={job!} onSubmit={onSubmit} />
			<div className='p-4 flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Company:</p>
					<p>{job?.company}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Role:</p>
					<p>{job?.role}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Location:</p>
					<p>{job?.location}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium text-lg'>Created:</p>
					<p>{job?.CreatedAt.toDateString()}</p>
				</div>
			</div>
			<CommentForm jobId={job.id} />
			{job.comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
			<div className='whitespace-pre-wrap px-4'>{completion}</div>
		</div>
	)
}

export default AppClient
