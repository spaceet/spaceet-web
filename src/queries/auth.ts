import { HttpResponse, UserProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

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

const ForgotPasswordMutation = async (email: string) => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.forgot_password, { email })
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

export {
	ForgotPasswordMutation,
	ResetPasswordMutation,
	SignInMutation,
	SignOutMutation,
	SignUpMutation,
	VerifyAccountQuery,
}
