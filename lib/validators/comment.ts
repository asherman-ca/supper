import { z } from 'zod'

export const CommentValidator = z.object({
	content: z.string().min(3).max(240),
	jobId: z.string(),
})

export type CreateCommentValidator = z.infer<typeof CommentValidator>
