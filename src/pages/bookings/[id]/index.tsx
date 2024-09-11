import { useRouter } from "next/router"
import React from "react"

import { Appbar, Seo } from "@/components/shared"

const Page = () => {
	const router = useRouter()
	const { id } = router.query

	return (
		<>
			<Seo title="Bookings" />
			<Appbar />
			<main className="container mx-auto my-12">Bookings {id}</main>
		</>
	)
}

export default Page
