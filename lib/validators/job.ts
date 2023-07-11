import { z } from 'zod'

export const JobValidator = z.object({
	role: z.string().min(3).max(21),
	company: z.string().min(3).max(21),
	location: z.string().min(3).max(21),
	status: z.enum(['INTERVIEW', 'ACTIVE', 'INACTIVE']),
	searchId: z.string(),
})

export type CreateJobValidator = z.infer<typeof JobValidator>
