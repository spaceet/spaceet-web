import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Dashboard" />
			<Appbar />
			<main className="container mx-auto"></main>
			<Footer />
		</>
	)
}

export default Page
