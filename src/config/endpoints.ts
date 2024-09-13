import { Maybe } from "@/types"

export const encodeQueryParams = (params: { [key: string]: string | number }) => {
	return Object.keys(params)
		.filter((key) => params[key] !== null && params[key] !== undefined && params[key] !== "")
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
		.join("&")
}

const endpoints = (path?: Maybe<string>, params?: { [key: string]: string | number }) => {
	let queryString = ""
	if (params) {
		queryString = "?" + encodeQueryParams(params)
	}

	const auth = {
		signin: `/auth/signin`,
		signup: `/auth/signup`,
		signout: `/auth/signout`,
		google: `/auth/google`,
		refresh: `/auth/refresh`,
		verify: `/auth/verify`,
		reset_password: `/auth/reset-password`,
		forgot_password: `/auth/forgot-password`,
	}

	const bookings = {
		get_all: `/bookings${queryString}`,
		get_one: `/bookings/${path}`,
		create: `/bookings`,
		update: `/bookings/${path}`,
		delete: `/bookings/${path}`,
	}

	const payments = {
		get_all: `/payments${queryString}`,
		get_one: `/payments/${path}`,
		create: `/payments`,
		update: `/payments/${path}`,
		delete: `/payments/${path}`,
	}

	const properties = {
		get_all: `/properties${queryString}`,
		get_by_location: `/properties/location}`,
		get_one: `/properties/${path}`,
		search: `/properties/search${queryString}`,
		create: `/properties`,
		update: `/properties/${path}`,
		delete: `/properties/${path}`,
	}

	const reviews = {
		get_all: `/reviews${queryString}`,
		get_one: `/reviews/${path}`,
		create: `/reviews`,
		update: `/reviews/${path}`,
		delete: `/reviews/${path}`,
	}

	const users = {
		get_all: `/users${queryString}`,
		get_one: `/users/${path}`,
		update: `/users/${path}`,
		delete: `/users/${path}`,
	}

	return {
		auth,
		bookings,
		payments,
		properties,
		reviews,
		users,
	}
}

export { endpoints }
