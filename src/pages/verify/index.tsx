import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { Loading, Seo } from "@/components/shared"
import { AuthLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { VerifyAccountQuery } from "@/queries"

const Page = () => {
	const router = useRouter()
	const { confirm, email } = router.query

	const { data, error } = useQuery({
		queryFn: () => VerifyAccountQuery(String(email), String(confirm)),
		queryKey: ["verify-account"],
		enabled: !!confirm && !!email,
	})

	if (!data) return <Loading />

	if (error) {
		console.log(error)

		return (
			<>
				<Seo title="Verify your account" />
				<AuthLayout>
					<div className="flex w-full max-w-[446px] flex-col gap-9">
						<div className="flex flex-col gap-3">
							<h2 className="w-[250px] text-[28px] font-semibold leading-[30px]">Something went wrong</h2>
							<p className="text-neutral-600">Please try again or contact support.</p>
						</div>
						<Link href="/">
							<Button>Continue</Button>
						</Link>
					</div>
				</AuthLayout>
			</>
		)
	}

	toast.success("Your account has been verified")

	return (
		<>
			<Seo title="Verify your account" />
			<AuthLayout>
				<div className="flex w-full max-w-[446px] flex-col gap-9">
					<div className="flex flex-col gap-3">
						<h2 className="w-[250px] text-[28px] font-semibold leading-[30px]">
							Your Spaceet account has been verified
						</h2>
						<p className="text-neutral-600">You can now login to your Spaceet account.</p>
					</div>
					<Link href="/sigin">
						<Button>Continue</Button>
					</Link>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
