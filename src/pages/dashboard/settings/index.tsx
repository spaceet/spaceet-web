import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Settings" />
			<DashboardLayout>
				<div className="w-full">Settings</div>
			</DashboardLayout>
		</>
	)
}

export default Page
