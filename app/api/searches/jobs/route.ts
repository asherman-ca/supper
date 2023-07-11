import { JobValidator } from '@/lib/validators/job'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: Request) {
	console.log('post')
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		const { role, company, location, status, searchId } =
			JobValidator.parse(body)

		const newJob = await db.job.create({
			data: {
				role,
				company,
				location,
				status,
				userId: session.user.id,
				searchId,
			},
		})

		return new Response(newJob.id, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not create job', { status: 500 })
	}
}
