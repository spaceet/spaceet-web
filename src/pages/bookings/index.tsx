import { useQuery } from "@tanstack/react-query"
import React from "react"

import { Appbar, DataTable, Loading, Pagination, Seo } from "@/components/shared"
import { GetReservationsQuery } from "@/queries"
import { reservationColumns } from "@/config"

const Page = () => {
	const [pageSize, setPageSize] = React.useState(10)
	const [page, setPage] = React.useState(1)

	const { data, isLoading } = useQuery({
		queryKey: ["bookings", page, pageSize],
		queryFn: () => GetReservationsQuery({ limit: pageSize, page }),
		staleTime: 5000,
	})

	if (isLoading) return <Loading />

	if (!data) return <div>Something went wrong</div>

	return (
		<>
			<Seo title="Bookings" />
			<Appbar />
			<main className="container mx-auto my-12 flex flex-col gap-6">
				<h3 className="font-medium capitalize lg:text-2xl">Bookings</h3>
				<div className="flex h-full w-full flex-col gap-6">
					<DataTable columns={reservationColumns} data={data.data.data} />
					<Pagination
						current={page}
						onPageChange={setPage}
						onRowChange={setPageSize}
						pageSize={pageSize}
						total={data?.data.meta.itemCount}
					/>
				</div>
			</main>
		</>
	)
}

export default Page
