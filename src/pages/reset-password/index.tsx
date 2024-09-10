import React from "react"

import { AuthLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Reset Password" />
			<AuthLayout>
				<div className="w-full max-w-[446px]"></div>
			</AuthLayout>
		</>
	)
}

export default Page
