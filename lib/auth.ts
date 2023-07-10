import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	pages: {
		signIn: '/sign-in',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ session, user }) {
			if (user) {
				session.user.id = user.id
				session.user.name = user.name
				session.user.email = user.email
				session.user.image = user.image
			}

			return session
		},
		redirect() {
			// redirect to homepage on login
			return '/dashboard'
		},
	},
}

export const getAuthSession = () => getServerSession(authOptions)
