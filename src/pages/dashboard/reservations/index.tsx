import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Reserrvations" />
			<DashboardLayout>
				<div className="w-full">Reservations</div>
			</DashboardLayout>
		</>
	)
}

export default Page
