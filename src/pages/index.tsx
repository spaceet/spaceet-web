import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Vacation rentals, cabins, beach houses, and more" />
			<Appbar />
			<main className="container mx-auto my-12">
				<h3 className="text-4xl">Home</h3>
			</main>
			<Footer />
		</>
	)
}

export default Page
