import { useQueries } from "@tanstack/react-query"
import React from "react"

import { GetAllPropertiesQuery, GetPropertiesByLocationQuery, GetAllReviewsQuery } from "@/queries"
import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	const [{}, {}, {}] = useQueries({
		queries: [
			{
				queryFn: () => GetAllPropertiesQuery({ limit: 12, page: 1 }),
				queryKey: ["all-properties"],
				enabled: false,
			},
			{
				queryFn: () => GetPropertiesByLocationQuery(),
				queryKey: ["properties-by-location"],
				enabled: false,
			},
			{
				queryFn: () => GetAllReviewsQuery({}),
				queryKey: ["get-reviews"],
				enabled: false,
			},
		],
	})

	return (
		<>
			<Seo title="Vacation rentals, cabins, beach houses, and more" />
			<Appbar />
			<main className="w-full"></main>
			<Footer />
		</>
	)
}

export default Page
