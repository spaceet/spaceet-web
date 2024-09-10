import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Vacation rentals, cabins, beach houses, and more" />
			<Appbar />
			<main className="container mx-auto my-12">
				<section className="w-full"></section>
				<section className="w-full"></section>
				<section className="w-full"></section>
				<section className="w-full"></section>
			</main>
			<Footer />
		</>
	)
}

export default Page
