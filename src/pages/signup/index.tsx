import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { PhoneInput, Seo, Spinner } from "@/components/shared"
import { SignUpDto, SignUpMutation } from "@/queries"
import { AuthLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleSvg } from "@/assets/svg"
import { SignUpSchema } from "@/schema"
import { HttpError } from "@/types"

const initialValues: SignUpDto = {
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	phone_number: "",
}

const Page = () => {
	const router = useRouter()

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: SignUpDto) => SignUpMutation(payload),
		mutationKey: ["register"],
		onSuccess: () => {
			toast.success("Account created successfully")
			router.push("/signin")
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			toast.error(message)
		},
	})

	const { errors, handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues,
		validationSchema: SignUpSchema,
		onSubmit: (values) => {
			mutateAsync(values)
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
							<Input
								type="text"
								name="first_name"
								label="First Name"
								onChange={handleChange}
								required
								error={errors.first_name}
							/>
							<Input
								type="text"
								name="last_name"
								label="Last Name"
								onChange={handleChange}
								required
								error={errors.last_name}
							/>
						</div>
						<Input
							type="email"
							name="email"
							label="Email Address"
							onChange={handleChange}
							required
							error={errors.email}
						/>
						<PhoneInput
							name="phone_number"
							label="Phone Number"
							onPhoneNumberChange={(value) => setFieldValue("phone_number", value)}
							required
							error={errors.phone_number}
						/>
						<Input
							type="password"
							name="password"
							label="Password"
							onChange={handleChange}
							required
							error={errors.password}
						/>
						<Button type="submit" disabled={isPending}>
							{isPending ? <Spinner /> : "Register"}
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
