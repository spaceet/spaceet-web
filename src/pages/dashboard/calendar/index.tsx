import React from "react"

import { CalendarLarge, CalendarSmall } from "@/components/dashboard/calendar"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Calendar" />
			<DashboardLayout>
				<CalendarLarge />
				<CalendarSmall />
			</DashboardLayout>
		</>
	)
}
export default Page
