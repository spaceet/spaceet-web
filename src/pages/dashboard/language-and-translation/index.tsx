import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Language & Translation" />
			<DashboardLayout>
				<div className="w-full">Language & Translation</div>
			</DashboardLayout>
		</>
	)
}

export default Page
