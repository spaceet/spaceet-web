import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Calendar" />
			<DashboardLayout>
				<div className="w-full">Calendar</div>
			</DashboardLayout>
		</>
	)
}

export default Page
