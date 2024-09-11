import { NextURL } from "next/dist/server/web/next-url"
import { NextRequest, NextResponse } from "next/server"

export const config = {
	matcher: [
		"/account/:path*",
		"/become-a-host",
		"/bookings/:path*",
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
	const url = req.nextUrl.clone() // Clone the URL to modify it

	// access the pathname of protected routes
	const isOnNotifications = url.pathname.startsWith("/notifications")
	const isOnBecomeAHost = url.pathname.startsWith("/become-a-host")
	const isonFavorites = url.pathname.startsWith("/favorites")
	const isOnMessages = url.pathname.startsWith("/messages")
	const isOnBooking = url.pathname.startsWith("/bookings")
	const isOnAccount = url.pathname.startsWith("/account")

	const redirectResponse = (url: string | NextURL) => {
		const response = NextResponse.redirect(url)
		response.headers.set("x-middleware-cache", "no-cache") // !FIX: Disable caching
		return response
	}

	// Redirect users without a token trying to access any dashboard/* path
	if (!hasToken && isOnAccount) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	// Redirect users without a token trying to access any booking/* path
	if (!hasToken && isOnBooking) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	// Redirect users without a token trying to access any favorites/* path
	if (!hasToken && isonFavorites) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	// Redirect users without a token trying to access any messages/* path
	if (!hasToken && isOnMessages) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	// Redirect users without a token trying to access any notifications/* path
	if (!hasToken && isOnNotifications) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	// Redirect users without a token trying to access any become-a-host/* path
	if (!hasToken && isOnBecomeAHost) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	return NextResponse.next()
}
