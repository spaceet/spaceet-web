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
		get_user_apartments: `/apartment/get-my-apartments`,
		search: `/apartment/search`,
		create: `/apartment/create`,
		update: `/apartment/${id}`,
		delete: `/apartment/${id}`,
		types: `/apartment/get-types`,
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

	const calendar = {
		get_reservations: `/reservation/calendar-reservations`,
	}

	const messages = {
		get_all: `/messages`,
		get_one: `/messages/${id}`,
		delete: `/messages/${id}`,
		send: `/messages/send`,
		read: `/messages/read/${id}`,
		archive: `/messages/archive/${id}`,
	}

	const payments = {
		generate_link: `/payment/generate-link`,
		payment_overview: `/payment/overview`,
		payment_history: `/payment/get-transaction-logs`,
		create_pin: `/payment/setup-transaction-pin`,
		update_pin: `/payment/update-transaction-pin`,
		request_reset_pin: `/payment/request-transaction-pin-reset`,
		reset_pin: `/payment/reset-transaction-pin`,
		initiate_withdrawal: `/payment/initiate-wallet-withdrawal`,
		complete_withdrawal: `/payment/complete-wallet-withdrawal`,
		webhook: `/payment/paystack-callback`,
	}

	const reservations = {
		get_hosts: `/reservation/for-host`,
		get_all: `/reservation/get-my-reservations`,
		get_one: `/reservation/${id}`,
		create: `/reservation/create`,
		cancel: `/reservation/cancel/${id}`,
		get_pricing: `/reservation/get-price-details`,
		get_calendar: `/reservation/calendar-reservations`,
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
		get_one: `/users/view-host-profile/${id}`,
		me: `/users/profile`,
		update: `/users/${id}`,
	}

	return {
		amenities,
		apartment,
		auth,
		bookings,
		calendar,
		messages,
		payments,
		reservations,
		reviews,
		users,
	}
}

export { endpoints }
