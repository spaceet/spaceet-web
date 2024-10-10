import * as Yup from "yup"

import { ResetPasswordDto, SignInDto, SignUpDto } from "@/queries"

const PASSWORD = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,20}$/

const SignUpSchema: Yup.ObjectSchema<SignUpDto> = Yup.object({
	email: Yup.string().email("Please enter a valid email!").required("Your email is required!"),
	first_name: Yup.string().required("First name is required!"),
	last_name: Yup.string().required("Last name is required!"),
	password: Yup.string()
		.required("Password is required!")
		.matches(
			PASSWORD,
			"Password must be at least 8 characters and contain at least one uppercase, lowercase, number and special character!"
		),
	phone_number: Yup.string().required("Phone number is required!"),
})

const SignInSchema: Yup.ObjectSchema<SignInDto> = Yup.object({
	email_or_phone_number: Yup.string()
		.email("Please enter a valid email!")
		.required("Your email is required!"),
	password: Yup.string()
		.required("Password is required!")
		.matches(
			PASSWORD,
			"Password must be at least 8 characters and contain at least one uppercase, lowercase, number and special character!"
		),
})

const ResetPasswordSchema: Yup.ObjectSchema<ResetPasswordDto> = Yup.object({
	confirm_password: Yup.string()
		.required("Please re-enter your new password")
		.oneOf([Yup.ref("password")], "Passwords do not match!"),
	password: Yup.string()
		.required("Password is required!")
		.matches(
			PASSWORD,
			"Password must be at least 8 characters and contain at least one uppercase, lowercase, number and special character!"
		),
	token: Yup.string().required(),
})

export { ResetPasswordSchema, SignInSchema, SignUpSchema }
