import { CommentValidator } from '@/lib/validators/comment'
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
		const { content, jobId } = CommentValidator.parse(body)

		const newComment = await db.comment.create({
			data: {
				content,
				userId: session.user.id,
				jobId,
			},
		})

		return new Response(newComment.id, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not create comment', { status: 500 })
	}
}

export async function DELETE(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const url = new URL(req.url)
		const id = url.searchParams.get('id')

		if (!id) {
			return new Response('Missing comment id', { status: 400 })
		}

		const comment = await db.comment.findFirst({
			where: {
				id,
				userId: session.user.id,
			},
		})

		if (!comment) {
			return new Response('Search not found', { status: 404 })
		}

		await db.comment.delete({
			where: {
				id,
			},
		})

		return new Response('Search deleted', { status: 200 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not delete comment', { status: 500 })
	}
}
