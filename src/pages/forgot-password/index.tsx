import { useMutation } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { ForgotPasswordMutation } from "@/queries"
import { Seo, Spinner } from "@/components/shared"
import { AuthLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HttpError } from "@/types"

const Page = () => {
	const router = useRouter()

	const { isPending } = useMutation({
		mutationFn: (email: string) => ForgotPasswordMutation(email),
		mutationKey: ["forgot-password"],
		onSuccess: (data) => {
			console.log(data)
			const { message } = data
			toast.success(message)
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			console.error(message)
			toast.error(message)
		},
	})

	const { handleChange, handleSubmit } = useFormik({
		initialValues: { email: "" },
		onSubmit: (values) => {
			console.log(values)
			router.push("/reset-password")
		},
	})

	return (
		<>
			<Seo title="Forgot Password" />
			<AuthLayout>
				<div className="w-full max-w-[446px]">
					<div className="mb-16">
						<Button onClick={() => router.back()} size="sm" variant="outline">
							<ChevronLeft size={14} />
							Back
						</Button>
					</div>
					<div className="mb-9 flex flex-col gap-3">
						<h2 className="text-[28px] font-semibold leading-[30px]">Forgot Password</h2>
						<p className="text-neutral-600">
							Don&apos;t worry, it happens to the best of us 😅
							<br />
							Enter your registered email address to reset your password
						</p>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<Input type="email" name="email" label="Email Address" onChange={handleChange} required />
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
