import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Report an Issue" />
			<Appbar />
			<main className="container mx-auto my-12">Report an Issue</main>
			<Footer />
		</>
	)
}

export default Page
