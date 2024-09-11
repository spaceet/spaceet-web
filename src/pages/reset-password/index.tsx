import { useMutation } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { ResetPasswordDto, ResetPasswordMutation } from "@/queries"
import { PasswordMeter, Seo, Spinner } from "@/components/shared"
import { AuthLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HttpError } from "@/types"

const initialValues: ResetPasswordDto = {
	confirm_password: "",
	password: "",
	token: "",
}

const Page = () => {
	const router = useRouter()
	// const { token } = router.query

	const { isPending } = useMutation({
		mutationFn: (payload: ResetPasswordDto) => ResetPasswordMutation(payload),
		mutationKey: ["signin"],
		onSuccess: (data) => {
			console.log(data)
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			console.error(message)
		},
	})

	const { handleChange, handleSubmit, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			if (!values.password) {
				toast.error("Password is required!")
				return
			}
			if (!values.confirm_password) {
				toast.error("Re-enter your password!")
				return
			}
			if (values.password !== values.confirm_password) {
				toast.error("Password do not match!")
				return
			}
			console.log(values)
		},
	})

	return (
		<>
			<Seo title="Reset Password" />
			<AuthLayout>
				<div className="w-full max-w-[446px]">
					<div className="mb-16">
						<Button onClick={() => router.back()} size="sm" variant="outline">
							<ChevronLeft size={14} />
							Back
						</Button>
					</div>
					<div className="mb-9 flex flex-col gap-3">
						<h2 className="text-[28px] font-semibold leading-[30px]">Set New Password</h2>
						<p className="text-neutral-600">
							Enter your new password. Make sure you remember it this time 😉
						</p>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<Input
							type="password"
							name="password"
							label="New Password"
							onChange={handleChange}
							required
						/>
						<Input
							type="password"
							name="confirm_password"
							label="Confirm New Pssword"
							onChange={handleChange}
							required
						/>
						<PasswordMeter password={values.password} />
						<Button type="submit" disabled={isPending}>
							{isPending ? <Spinner /> : "Continue"}
						</Button>
						<p className="flex w-full items-center justify-center gap-1 text-center text-sm text-neutral-600">
							Sorry, I remember now
							<Link href="/signin" className="text-primary-100 underline">
								Log in
							</Link>
						</p>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
