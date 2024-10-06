import { useFormik } from "formik"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const Page = () => {
	const {} = useFormik({
		initialValues: {},
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return (
		<>
			<Seo title="Listings" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-4 px-8 py-5">New Listing</div>
			</DashboardLayout>
		</>
	)
}

export default Page
