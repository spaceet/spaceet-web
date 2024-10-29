import React from "react"

import { Appbar, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Notifications" />
			<Appbar />
			<main className="container mx-auto my-12">Notifications</main>
		</>
	)
}

export default Page
