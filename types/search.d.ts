import { Job, Search } from '@prisma/client'

export type ExtendedSearch = Search & {
	jobs: Job[]
}
