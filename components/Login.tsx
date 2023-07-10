'use client'
import React from 'react'
import { signIn } from 'next-auth/react'

const Login = () => {
	return (
		<button className='btn ml-2' onClick={async () => await signIn('google')}>
			Login
		</button>
	)
}

export default Login
