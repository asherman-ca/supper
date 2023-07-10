import { getAuthSession } from '@/lib/auth'
import DarkMode from './DarkMode'
import chefHat from '@/public/chef-hat.png'
import Image from 'next/image'
import Link from 'next/link'
import Login from './Login'
import Dropdown from './Dropdown'

const Nav = async () => {
	const session = await getAuthSession()

	return (
		<div className='navbar'>
			<div className='flex-1 px-2 lg:flex-none'>
				<Link
					href='/'
					className='text-xl font-semibold flex items-center gap-1 cursor-pointer'
				>
					<Image
						src={chefHat}
						alt='logo'
						className='h-8 w-8 dark:bg-gray-400 rounded-full p-[.125rem]'
					></Image>
					Supper
				</Link>
			</div>
			<div className='flex justify-end flex-1 px-2'>
				<div className='flex items-center gap-4'>
					<DarkMode />
					{session ? <Dropdown user={session.user} /> : <Login />}
				</div>
			</div>
		</div>
	)
}

export default Nav
