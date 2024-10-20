import { NextURL } from "next/dist/server/web/next-url"
import { NextRequest, NextResponse } from "next/server"

export const config = {
	matcher: [
		"/account/:path*",
		"/become-a-host",
		"/bookings/:path*",
		"/dashbboard/:path*",
		"/favorites/:path*",
		"/messages/:path*",
		"/notifications/:path*",
		"/signin",
	],
	name: "middleware",
}

export function middleware(req: NextRequest) {
	const requestHeaders = new Headers(req.headers) // Init new request headers
	requestHeaders.set("x-next-pathname", req.nextUrl.pathname) // Set the new header for pathname

	const hasToken = req.cookies.has("SPACEET_TOKEN")
	const isHost = req.cookies.get("IS_SPACEET_HOST")?.value === "true"
	const url = req.nextUrl.clone() // Clone the URL to modify it

	// access the pathname of protected routes
	const isOnNotifications = url.pathname.startsWith("/notifications")
	const isOnBecomeAHost = url.pathname.startsWith("/become-a-host")
	const isOnDashboard = url.pathname.startsWith("/dashboard")
	const isOnFavorites = url.pathname.startsWith("/favorites")
	const isOnMessages = url.pathname.startsWith("/messages")
	const isOnBooking = url.pathname.startsWith("/bookings")
	const isOnAccount = url.pathname.startsWith("/account")
	const isOnSignin = url.pathname.startsWith("/signin")

	const redirectResponse = (url: string | NextURL) => {
		const response = NextResponse.redirect(url)
		response.headers.set("x-middleware-cache", "no-cache") // !FIX: Disable caching
		return response
	}

	// Redirect unauthenticated users to signin
	if (
		!hasToken &&
		(isOnAccount ||
			isOnBooking ||
			isOnFavorites ||
			isOnMessages ||
			isOnNotifications ||
			isOnBecomeAHost ||
			isOnDashboard)
	) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	// Redirect authenticated users away from signin
	if (hasToken && isOnSignin) {
		url.pathname = "/"
		return redirectResponse(url)
	}

	// Redirect non-hosts away from dashboard
	if (hasToken && !isHost && isOnDashboard) {
		url.pathname = "/"
		return redirectResponse(url)
	}

	return NextResponse.next()
}
