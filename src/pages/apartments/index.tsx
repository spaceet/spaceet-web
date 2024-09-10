import { useQuery } from "@tanstack/react-query"
import React from "react"

import { GetAllPropertiesQuery, PaginationDto } from "@/queries"
import { Appbar, Card, Footer, Seo } from "@/components/shared"
import { properties } from "@/mock/properties"

const Page = () => {
	const [pagination] = React.useState<PaginationDto>({ page: 1, limit: 20 })

	const {} = useQuery({
		queryFn: () => GetAllPropertiesQuery(pagination),
		queryKey: ["get-apartments", pagination.page],
		enabled: false,
	})

	return (
		<>
			<Seo title="" />
			<Appbar />
			<main className="container mx-auto my-12 flex flex-col gap-8">
				<div className="flex w-full items-center justify-center"></div>
				<section className="grid w-full grid-cols-4 gap-5 py-10">
					{properties.map((property) => (
						<Card key={property.id} apartment={property} />
					))}
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Page
