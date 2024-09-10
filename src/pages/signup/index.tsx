import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import Link from "next/link"
import React from "react"

import { PhoneInput, Seo } from "@/components/shared"
import { SignUpDto, SignUpMutation } from "@/queries"
import { AuthLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleSvg } from "@/assets/svg"
import { HttpError } from "@/types"

const initialValues: SignUpDto = { firstName: "", lastName: "", email: "", password: "", phone: "" }

const Page = () => {
	const { isPending } = useMutation({
		mutationFn: (payload: SignUpDto) => SignUpMutation(payload),
		mutationKey: ["register"],
		onSuccess: (data) => {
			console.log(data)
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			console.error(message)
		},
	})

	const { handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return (
		<>
			<Seo title="Create your Spaceet account" />
			<AuthLayout>
				<div className="flex w-full max-w-[446px] flex-col gap-9">
					<div className="flex flex-col gap-3">
						<h2 className="w-[250px] text-[28px] font-semibold leading-[30px]">
							Create your Spaceet account
						</h2>
						<p className="text-neutral-600">Login to your Spaceet account</p>
					</div>
					<Button type="button" variant="outline">
						<GoogleSvg />
						Continue with Google
					</Button>
					<div className="relative h-[1px] w-full bg-neutral-400 text-center">
						<span className="absolute left-1/2 top-1/2 !z-[2] w-fit -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-xs text-neutral-400">
							OR
						</span>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div className="grid w-full grid-cols-2 gap-4">
							<Input type="text" name="firstName" label="First Name" onChange={handleChange} required />
							<Input type="text" name="lastName" label="Last Name" onChange={handleChange} required />
						</div>
						<Input type="email" name="email" label="Email Address" onChange={handleChange} required />
						<PhoneInput
							name="phone"
							label="Phone Number"
							onPhoneNumberChange={(value) => setFieldValue("phone", value)}
							required
						/>
						<Input type="password" name="password" label="Password" onChange={handleChange} required />
						<Button type="submit" disabled={isPending}>
							Register
						</Button>
						<p className="flex w-full items-center justify-center gap-1 text-center text-sm">
							Already have a Spaceet account?{" "}
							<Link href="/signin" className="text-primary-100 underline">
								Sign in
							</Link>
						</p>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
