import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout>
				<div className="w-full">Messages</div>
			</DashboardLayout>
		</>
	)
}

export default Page
