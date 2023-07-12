import { getAuthSession } from '@/lib/auth'
import chefHat from '@/public/chef-hat.png'
import Image from 'next/image'
import Link from 'next/link'
import Login from './Login'
import Dropdown from './Dropdown'

const Nav = async () => {
	const session = await getAuthSession()

	return (
		<div className='navbar border-b border-gray-200'>
			<div className='flex-1 px-2 lg:flex-none'>
				<Link
					href='/'
					className='text-2xl font-semibold flex items-center gap-1 cursor-pointer'
				>
					<Image
						src={chefHat}
						alt='logo'
						className='h-10 w-10 dark:bg-gray-400 rounded-full p-[.125rem]'
					></Image>
					Supper
				</Link>
			</div>
			<div className='flex justify-end flex-1 px-2'>
				<div className='flex items-center gap-4'>
					{session ? <Dropdown user={session.user} /> : <Login />}
				</div>
			</div>
		</div>
	)
}

export default Nav
