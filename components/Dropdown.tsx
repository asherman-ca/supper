'use client'
import React, { FC } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import Link from 'next/link'
// import DarkMode from './DarkMode'
import { useRouter } from 'next/navigation'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<User, 'name' | 'image' | 'email'>
}

const Dropdown: FC<UserAccountNavProps> = ({ user }) => {
	const router = useRouter()

	const onLogout = async (e: any) => {
		await signOut({
			callbackUrl: '/',
		})
	}

	return (
		<div className='dropdown dropdown-end'>
			<label tabIndex={0}>
				<Image
					src={user.image!}
					alt='avatar'
					height={30}
					width={30}
					className='rounded-full cursor-pointer h-8 w-8'
				/>
			</label>
			<ul
				tabIndex={0}
				className='menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4'
			>
				<li>
					<Link href='/dashboard'>Dashboard</Link>
				</li>
				<li>
					<Link href='/'>Homepage</Link>
				</li>
				<hr className='w-full bg-gray-200 h-[1px] my-2' />
				<li>
					<p onClick={onLogout}>Logout</p>
				</li>
			</ul>
		</div>
	)
}

export default Dropdown
