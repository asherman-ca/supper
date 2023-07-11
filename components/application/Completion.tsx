'use client'

import { useCompletion } from 'ai/react'

export default function Completion() {
	const { completion, handleSubmit } = useCompletion({
		initialInput: 'write a short coverletter',
	})

	const onSubmit = (e: any) => {
		e.preventDefault()
		handleSubmit(e)
	}

	return (
		<div>
			<button onClick={onSubmit}>Submit</button>
			<div className='whitespace-pre-wrap my-6'>{completion}</div>
		</div>
	)
}
