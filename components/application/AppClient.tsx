'use client'
import { Comment, Job } from '@prisma/client'
import { FC } from 'react'
import AppHeader from './AppHeader'
import { useCompletion } from 'ai/react'
import CommentForm from '../dashboard/CommentForm'
import CommentItem from './CommentItem'
import { motion } from 'framer-motion'

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
			<div className='p-4 flex flex-col gap-4 border border-gray-200 mx-4 my-4'>
				<div className='flex items-center gap-2'>
					<p className='font-medium'>Company:</p>
					<p>{job?.company}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium'>Role:</p>
					<p>{job?.role}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium'>Location:</p>
					<p>{job?.location}</p>
				</div>
				<div className='flex items-center gap-2'>
					<p className='font-medium'>Created:</p>
					<p>{job?.CreatedAt.toDateString()}</p>
				</div>
			</div>
			{job.comments.length > 0 && (
				<div className='px-4 flex flex-col gap-2 mb-4'>
					{job.comments.map((comment) => (
						<CommentItem key={comment.id} comment={comment} />
					))}
				</div>
			)}
			{completion && (
				<motion.div
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					className='whitespace-pre-wrap mx-4 mb-4 p-4 border border-gray-200'
				>
					{completion}
				</motion.div>
			)}
			<CommentForm jobId={job.id} />
		</div>
	)
}

export default AppClient
