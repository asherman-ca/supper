import { z } from 'zod'

export const SearchValidator = z.object({
	name: z.string().min(3).max(21),
})

export type CreateSearchValidator = z.infer<typeof SearchValidator>
