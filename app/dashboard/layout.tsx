import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex p-5'>
			<div className='flex-1 flex flex-col'>
				<div>Job Searches</div>
			</div>
			<div className='flex-[2] flex justify-start'>{children}</div>
		</div>
	)
}

export default layout
