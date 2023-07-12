'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import google from '@/public/google.png'
import Image from 'next/image'

const Login = () => {
	const onLogin = async (e: any) => {
		await signIn('google', {
			callbackUrl: '/dashboard',
		})
	}

	return (
		<button
			className='flex items-center gap-2 btn btn-sm ml-2'
			onClick={onLogin}
		>
			<Image src={google} alt='google' className='w-4 h-4' />
			Login
		</button>
	)
}

export default Login
