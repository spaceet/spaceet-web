import { useRouter } from "next/router"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	const router = useRouter()
	const { id } = router.query

	return (
		<>
			<Seo title="Reservation" />
			<DashboardLayout>
				<div className="w-full">Reservation {id}</div>
			</DashboardLayout>
		</>
	)
}

export default Page
