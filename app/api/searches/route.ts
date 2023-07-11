import { SearchValidator } from '@/lib/validators/search'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		const { name } = SearchValidator.parse(body)

		const searchExists = await db.search.findFirst({
			where: {
				name,
				userId: session.user.id,
			},
		})

		if (searchExists) {
			return new Response('Subreddit already exists', { status: 409 })
		}

		await db.search.create({
			data: {
				name,
				userId: session.user.id,
			},
		})

		return new Response(name, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not create search', { status: 500 })
	}
}
