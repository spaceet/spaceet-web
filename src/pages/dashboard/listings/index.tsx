import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Listings" />
			<DashboardLayout>
				<div className="w-full">Listings</div>
			</DashboardLayout>
		</>
	)
}

export default Page
