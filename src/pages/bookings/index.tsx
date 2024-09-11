import React from "react"

import { Appbar, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Bookings" />
			<Appbar />
			<main className="container mx-auto my-12">Bookings</main>
		</>
	)
}

export default Page
