import { HttpResponse, UserProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export interface SignUpDto {
	firstName: string
	lastName: string
	email: string
	password: string
	phone: string
}

export interface SignInDto {
	email: string
	password: string
}

export interface ResetPasswordDto {
	email: string
	password: string
	token: string
}

export type SignInResponse = {
	user: UserProps
	token: string
}

const SignUpMutation = async (payload: SignUpDto) => {
	return axios.post(endpoints().auth.signup, payload).then((res) => res.data)
}

const SignInMutation = async (payload: SignInDto) => {
	return axios
		.post<HttpResponse<SignInResponse>>(endpoints().auth.signin, payload)
		.then((res) => res.data)
}

const SignOutMutation = async () => {
	return axios.post<HttpResponse<string>>(endpoints().auth.signout).then((res) => res.data)
}

const VerifyAccountMutation = async () => {
	return axios.post<HttpResponse<string>>(endpoints().auth.verify).then((res) => res.data)
}

const ForgotPasswordMutation = async (email: string) => {
	return axios.post(endpoints().auth.forgot_password, { email }).then((res) => res.data)
}

const ResetPasswordMutation = async (payload: ResetPasswordDto) => {
	return axios.post(endpoints().auth.reset_password, payload).then((res) => res.data)
}

export {
	ForgotPasswordMutation,
	ResetPasswordMutation,
	SignInMutation,
	SignOutMutation,
	SignUpMutation,
	VerifyAccountMutation,
}
