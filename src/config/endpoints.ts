import { Maybe } from "@/types"

export const encodeQueryParams = (params: { [key: string]: string | number }) => {
	return Object.keys(params)
		.filter((key) => params[key] !== null && params[key] !== undefined && params[key] !== "")
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
		.join("&")
}

const endpoints = (id?: Maybe<string>) => {
	const amenities = {
		get_all: `/apartment/get-amenities`,
		get_one: `/apartment/${id}`,
	}

	const apartment = {
		get_all: `/apartment/fetch`,
		get_by_location: `/apartment/location}`,
		get_one: `/apartment/view/${id}`,
		search: `/apartment/search`,
		create: `/apartment`,
		update: `/apartment/${id}`,
		delete: `/apartment/${id}`,
	}

	const auth = {
		signin: `/users/login`,
		signup: `/users/signup`,
		signout: `/users/signout`,
		google: `/users/google`,
		verify: `/users/signup/verify`,
		reset_password: `/users/reset-password`,
		forgot_password: `/users/forgot-password`,
		become_a_host: `/users/become-a-host`,
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

	const reviews = {
		get_all: `/reviews`,
		get_one: `/reviews/${id}`,
		create: `/apartment/review/write/${id}`,
		update: `/reviews/${id}`,
		delete: `/reviews/${id}`,
	}

	const users = {
		get_all: `/users`,
		get_one: `/users/profile`,
		update: `/users/${id}`,
	}

	return {
		amenities,
		apartment,
		auth,
		bookings,
		payments,
		reviews,
		users,
	}
}

export { endpoints }
