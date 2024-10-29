import { useQuery } from "@tanstack/react-query"
import React from "react"

import { Appbar, Loading, Pagination, Seo } from "@/components/shared"
import { GetReservationsQuery } from "@/queries"

const LIMIT = 10

const Page = () => {
	const [page, setPage] = React.useState(1)

	const { data, isLoading } = useQuery({
		queryKey: ["bookings", page],
		queryFn: () => GetReservationsQuery({ limit: LIMIT, page }),
		staleTime: 5000,
	})

	if (isLoading) return <Loading />

	if (!data) return <div>Something went wrong</div>

	return (
		<>
			<Seo title="Bookings" />
			<Appbar />
			<main className="container mx-auto my-12">
				<div className=""></div>
				<Pagination
					current={page}
					onPageChange={setPage}
					onRowChange={() => {}}
					pageSize={LIMIT}
					total={data?.data.meta.itemCount}
				/>
			</main>
		</>
	)
}

export default Page
