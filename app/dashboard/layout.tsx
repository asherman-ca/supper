import CreateSearch from '@/components/dashboard/CreateSearch'
import { getAuthSession } from '@/lib/auth'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession()
	return (
		<div className='flex flex-1'>
			<div className='flex-1 flex flex-col border-r border-gray-200 p-5'>
				<CreateSearch userId={session?.user.id} />
			</div>
			<div className='flex-[3] flex justify-start p-5'>{children}</div>
		</div>
	)
}

export default layout
