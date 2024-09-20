import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="About us" />
			<Appbar />
			<main className="container mx-auto my-12">About us</main>
			<Footer />
		</>
	)
}

export default Page
