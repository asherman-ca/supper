'use client'
import React, { FC, useEffect } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import Link from 'next/link'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<User, 'name' | 'image' | 'email'>
}

const Dropdown: FC<UserAccountNavProps> = ({ user }) => {
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
					{/* <button data-toggle-theme='dark,light' data-act-class='ACTIVECLASS'>
						Dark/Light Mode
					</button> */}
					<Link href='/dashboard'>Dashboard</Link>
				</li>
				<li>
					<p onClick={async () => await signOut()}>Logout</p>
				</li>
			</ul>
		</div>
	)
}

export default Dropdown
