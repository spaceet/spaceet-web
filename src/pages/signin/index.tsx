import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import Link from "next/link"
import React from "react"

import { SignInDto, SignInMutation } from "@/queries"
import { AuthLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Seo } from "@/components/shared"
import { GoogleSvg } from "@/assets/svg"
import { HttpError } from "@/types"

const initialValues: SignInDto = { email: "", password: "" }

const Page = () => {
	const { isPending } = useMutation({
		mutationFn: (payload: SignInDto) => SignInMutation(payload),
		mutationKey: ["signin"],
		onSuccess: (data) => {
			console.log(data)
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			console.error(message)
		},
	})

	const { handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return (
		<>
			<Seo title="Sign In" />
			<AuthLayout>
				<div className="flex w-full max-w-[446px] flex-col gap-9">
					<div className="flex flex-col gap-3">
						<h2 className="w-[200px] text-[28px] font-semibold leading-[30px]">
							Welcome back to Spaceet
						</h2>
						<p className="text-neutral-600">Login to your Spaceet account</p>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<Input type="email" name="email" label="Email Address" onChange={handleChange} required />
						<div className="flex flex-col gap-3">
							<Input type="password" name="password" label="Password" onChange={handleChange} required />
							<Link href="/forgot-password" className="self-end text-sm text-neutral-600 underline">
								Forgot Password?
							</Link>
						</div>
						<div className="relative h-[1px] w-full bg-neutral-400 text-center">
							<span className="absolute left-1/2 top-1/2 !z-[2] w-fit -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-xs text-neutral-400">
								OR
							</span>
						</div>
						<Button type="button" variant="outline" className="mb-4">
							<GoogleSvg />
							Continue with Google
						</Button>
						<Button type="submit" disabled={isPending}>
							Login In
						</Button>
						<p className="flex w-full items-center justify-center gap-1 text-center text-sm">
							New to Spaceet?{" "}
							<Link href="/signup" className="text-primary-100 underline">
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
