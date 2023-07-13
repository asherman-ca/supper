import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
} as any)

const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(50, '1 h'),
})

async function middleware(req: any) {
	const pathname = req.nextUrl.pathname

	if (pathname.startsWith('/api')) {
		const ip = req.ip ?? '127.0.0.1'
		try {
			const { success } = await ratelimit.limit(ip)

			if (!success) return NextResponse.json({ error: 'Too Many Requests' })
			return NextResponse.next()
		} catch (error) {
			return NextResponse.json({ error: 'Internal Server Error' })
		}
	} else {
		return NextResponse.next()
	}
}

export const config = {
	matcher: ['/api/:path*'],
}

export default middleware
