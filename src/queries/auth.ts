import { IdentityFormProps, ProfileFormProps } from "@/components/become-a-host/form-components"
import { HttpResponse, UserProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export type BecomeAHostDto = IdentityFormProps & ProfileFormProps

export interface SignUpDto {
	first_name: string
	last_name: string
	email: string
	password: string
	phone_number: string
}

export interface SignInDto {
	email_or_phone_number: string
	password: string
}

export interface ResetPasswordDto {
	confirm_password: string
	password: string
	token: string
}

const SignUpMutation = async (payload: SignUpDto) => {
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.signup, payload)
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error)
		})
}

const SignInMutation = async (payload: SignInDto) => {
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.signin, payload)
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error)
		})
}

const SignOutMutation = async () => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.signout)
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error)
		})
}

const VerifyAccountQuery = async (email: string, confirm: string) => {
	return axios
		.get<HttpResponse<UserProps>>(endpoints().auth.verify, { params: { email, confirm } })
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error)
		})
}

const ForgotPasswordMutation = async (email_or_phone_number: string) => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.forgot_password, { email_or_phone_number })
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error)
		})
}

const ResetPasswordMutation = async (payload: ResetPasswordDto) => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.reset_password, payload)
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error)
		})
}

const GetUserByIdQuery = async (id: string) => {
	return axios
		.get<HttpResponse<UserProps>>(endpoints(id).users.get_one)
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error)
		})
}

const BecomeAHostMutation = async (payload: BecomeAHostDto) => {
	console.log(payload.identification_expiry_date)
	const formData = new FormData()
	formData.append("address", payload.address)
	formData.append("bio", payload.bio)
	formData.append("city", payload.city)
	formData.append("first_name", payload.first_name)
	formData.append("identification_expiry_date", payload.identification_expiry_date)
	formData.append("identification_number", payload.identification_number)
	formData.append("identification_type", payload.identification_type)
	for (let i = 0; i < payload.images.length; i++) {
		if (payload.images[i]) {
			formData.append("images", payload.images[i])
		}
	}
	formData.append("last_name", payload.last_name)
	formData.append("phone_number", payload.phone_number)
	if (payload.profile_image) {
		formData.append("profile_image", payload.profile_image)
	}
	formData.append("state", payload.state)
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.become_a_host, formData)
		.then((res) => res.data)
}

export {
	BecomeAHostMutation,
	ForgotPasswordMutation,
	GetUserByIdQuery,
	ResetPasswordMutation,
	SignInMutation,
	SignOutMutation,
	SignUpMutation,
	VerifyAccountQuery,
}
