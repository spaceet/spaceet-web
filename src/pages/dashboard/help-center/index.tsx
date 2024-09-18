import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Help Center" />
			<DashboardLayout>
				<div className="w-full">Help Center</div>
			</DashboardLayout>
		</>
	)
}

export default Page
