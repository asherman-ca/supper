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
			return new Response('Search already exists', { status: 409 })
		}

		const newSearch = await db.search.create({
			data: {
				name,
				userId: session.user.id,
			},
		})

		return new Response(newSearch.id, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not create search', { status: 500 })
	}
}

export async function PATCH(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const url = new URL(req.url)
		const id = url.searchParams.get('id')

		if (!id) {
			return new Response('Missing search id', { status: 400 })
		}

		const search = await db.search.findFirst({
			where: {
				id,
				userId: session.user.id,
			},
		})

		if (!search) {
			return new Response('Search not found', { status: 404 })
		}

		await db.search.delete({
			where: {
				id,
			},
		})

		return new Response('Search deleted', { status: 200 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not delete search', { status: 500 })
	}
}
