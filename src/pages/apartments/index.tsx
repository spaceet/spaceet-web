import { useQuery } from "@tanstack/react-query"
import React from "react"

import { GetAllPropertiesQuery, PaginationDto } from "@/queries"
import { Appbar, Card, Loading, Seo } from "@/components/shared"

const Page = () => {
	const [pagination] = React.useState<PaginationDto>({ page: 1, limit: 20 })

	const { data: apartments } = useQuery({
		queryFn: () => GetAllPropertiesQuery(pagination),
		queryKey: ["get-apartments", pagination.page],
		enabled: false,
	})

	if (!apartments) return <Loading />

	return (
		<>
			<Seo title="Apartments Listing" />
			<Appbar />
			<main className="container mx-auto my-12 flex flex-col gap-8">
				<div className="flex w-full items-center justify-center"></div>
				<section className="grid w-full grid-cols-4 gap-5 py-10">
					{apartments.data.data.map((apartment) => (
						<Card key={apartment.id} apartment={apartment} />
					))}
				</section>
			</main>
		</>
	)
}

export default Page
