import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Cancellation Policy" />
			<Appbar />
			<main className="container mx-auto my-12"></main>
			<Footer />
		</>
	)
}

export default Page
