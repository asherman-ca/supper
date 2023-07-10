import CreateSearch from '@/components/dashboard/CreateSearch'
import { getAuthSession } from '@/lib/auth'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession()
	return (
		<div className='flex p-5'>
			<div className='flex-1 flex flex-col'>
				<CreateSearch userId={session?.user.id} />
			</div>
			<div className='flex-[2] flex justify-start'>{children}</div>
		</div>
	)
}

export default layout
