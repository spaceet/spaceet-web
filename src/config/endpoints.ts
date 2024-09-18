import { Maybe } from "@/types"

export const encodeQueryParams = (params: { [key: string]: string | number }) => {
	return Object.keys(params)
		.filter((key) => params[key] !== null && params[key] !== undefined && params[key] !== "")
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
		.join("&")
}

const endpoints = (id?: Maybe<string>) => {
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
		get_all: `/bookings`,
		get_one: `/bookings/${id}`,
		create: `/bookings`,
		update: `/bookings/${id}`,
		delete: `/bookings/${id}`,
	}

	const payments = {
		get_all: `/payments`,
		get_one: `/payments/${id}`,
		create: `/payments`,
		update: `/payments/${id}`,
		delete: `/payments/${id}`,
	}

	const properties = {
		get_all: `/properties`,
		get_by_location: `/properties/location}`,
		get_one: `/properties/${id}`,
		search: `/properties/search`,
		create: `/properties`,
		update: `/properties/${id}`,
		delete: `/properties/${id}`,
	}

	const reviews = {
		get_all: `/reviews`,
		get_one: `/reviews/${id}`,
		create: `/reviews`,
		update: `/reviews/${id}`,
		delete: `/reviews/${id}`,
	}

	const users = {
		get_all: `/users`,
		get_one: `/users/${id}`,
		update: `/users/${id}`,
		delete: `/users/${id}`,
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
