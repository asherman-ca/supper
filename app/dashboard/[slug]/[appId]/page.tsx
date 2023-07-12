import AppClient from '@/components/application/AppClient'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { FC } from 'react'

interface pageProps {
	params: {
		slug: string
		appId: string
	}
}

const page: FC<pageProps> = async ({ params }) => {
	const session = await getAuthSession()
	const { slug, appId } = params

	const job = await db.job.findUnique({
		where: {
			id: appId,
		},
		include: {
			comments: true,
		},
	})
	return <AppClient job={job!} username={session?.user.name!} searchId={slug} />
}

export default page
