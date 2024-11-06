import { RiMailDownloadLine } from "@remixicon/react"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Modal, Seo, Spinner } from "@/components/shared"
import { ForgotPasswordMutation } from "@/queries"
import { AuthLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { HttpError } from "@/types"

const Page = () => {
	const [message, setMessage] = React.useState("")
	const router = useRouter()

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (email: string) => ForgotPasswordMutation(email),
		mutationKey: ["forgot-password"],
		onSuccess: (data) => {
			console.log(data)
			setMessage(data.message)
		},
		onError: (error) => {
			console.error(error)
			toast.error(message)
		},
	})

	const { errors, handleChange, handleSubmit, values } = useFormik({
		initialValues: { email_or_phone_number: "" },
		onSubmit: (values) => {
			mutateAsync(values.email_or_phone_number)
		},
	})

	return (
		<>
			<Dialog open={!!message} onOpenChange={() => {}}>
				<DialogContent className="w-[400px] max-w-[90%] border-0 p-0">
					<DialogTitle hidden></DialogTitle>
					<DialogDescription hidden></DialogDescription>
					<Modal
						icon={RiMailDownloadLine}
						href="mailto:"
						label="Password Recovery Link"
						text="Go to my mail"
						priority="default">
						<div className="">
							<p>
								A recovery link was sent to{" "}
								<span className="text-primary-100 underline">{values.email_or_phone_number}</span>. Kindly
								click the link to reset your password.
							</p>
							<p>
								Didn&apos;t recieve the link?{" "}
								<button
									onClick={() => mutateAsync(values.email_or_phone_number)}
									className="text-primary-100 underline">
									Resend Recovery Code
								</button>
							</p>
						</div>
					</Modal>
				</DialogContent>
			</Dialog>
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
						<Input
							type="email"
							name="email_or_phone_number"
							label="Email Address"
							onChange={handleChange}
							required
							error={errors.email_or_phone_number}
						/>
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
