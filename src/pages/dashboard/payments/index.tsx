import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Payments" />
			<DashboardLayout>
				<div className="w-full">Payments</div>
			</DashboardLayout>
		</>
	)
}

export default Page
