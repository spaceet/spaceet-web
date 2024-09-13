import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Dashboard" />
			<DashboardLayout>
				<div className="w-full">Dashboard</div>
			</DashboardLayout>
		</>
	)
}

export default Page
