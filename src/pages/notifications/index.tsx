import React from "react"

import { Appbar, Pagination, Seo } from "@/components/shared"

const Page = () => {
	const [page, setPage] = React.useState(1)
	return (
		<>
			<Seo title="Notifications" />
			<Appbar />
			<main className="container mx-auto my-12 flex flex-col gap-6">
				<h3 className="font-medium capitalize lg:text-2xl">Notifications</h3>
				<div className="flex h-full w-full flex-col gap-6">
					<div className="flex w-full flex-col"></div>
					<Pagination
						current={page}
						onPageChange={setPage}
						onRowChange={() => {}}
						pageSize={10}
						total={0}
					/>
				</div>
			</main>
		</>
	)
}

export default Page
