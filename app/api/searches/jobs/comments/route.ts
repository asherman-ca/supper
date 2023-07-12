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
