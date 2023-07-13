import { JobValidator } from '@/lib/validators/job'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { StatusType } from '@prisma/client'

export async function POST(req: Request) {
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

// DELETE

export async function DELETE(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const url = new URL(req.url)
		const ids = url.searchParams.get('ids')

		const idsArray = ids?.split(',')

		if (!idsArray) {
			return new Response('Invalid ids', { status: 422 })
		}

		const jobs = await db.job.findMany({
			where: {
				id: {
					in: idsArray,
				},
			},
		})

		const jobIds = jobs.map((job) => job.id)

		if (jobIds.length === 0) {
			return new Response('No jobs found', { status: 404 })
		}

		const deletedJobs = await db.job.deleteMany({
			where: {
				id: {
					in: jobIds,
				},
			},
		})

		return new Response(deletedJobs.count.toString(), { status: 200 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not delete jobs', { status: 500 })
	}
}

// UPDATE

export async function PATCH(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const url = new URL(req.url)
		const ids = url.searchParams.get('ids')
		const state = url.searchParams.get('state') as StatusType

		const idsArray = ids?.split(',')

		if (!idsArray) {
			return new Response('Invalid ids', { status: 422 })
		}

		if (!state) {
			return new Response('Invalid state', { status: 422 })
		}

		console.log(idsArray)
		console.log(state)

		const jobs = await db.job.findMany({
			where: {
				id: {
					in: idsArray,
				},
			},
		})

		const jobIds = jobs.map((job) => job.id)

		if (jobIds.length === 0) {
			return new Response('No jobs found', { status: 404 })
		}

		const updatedJobs = await db.job.updateMany({
			where: {
				id: {
					in: jobIds,
				},
			},
			data: {
				status: state,
			},
		})

		return new Response(updatedJobs.count.toString(), { status: 200 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 })
		}

		return new Response('Could not update jobs', { status: 500 })
	}
}
