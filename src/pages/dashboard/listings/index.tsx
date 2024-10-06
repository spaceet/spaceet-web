import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"

const filters = ["all", "reserved", "vacant", "draft"] as const
type Filter = (typeof filters)[number]

const Page = () => {
	const [filter, setFilter] = React.useState<Filter>("all")

	const numberOfApartments: Record<Filter, number> = React.useMemo(() => {
		return {
			all: 12,
			reserved: 7,
			vacant: 4,
			draft: 1,
		}
	}, [])

	return (
		<>
			<Seo title="Listings" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-4 px-0 py-5 lg:px-8">
					<div className="flex h-11 w-full items-center border-b p-1 lg:w-fit lg:rounded-lg lg:border">
						{filters.map((item) => (
							<button
								key={item}
								onClick={() => setFilter(item)}
								className={`relative flex flex-1 items-center justify-center rounded-md px-4 py-2 text-xs capitalize before:absolute before:-bottom-[5px] before:left-0 before:h-0.5 before:bg-primary-100 lg:min-w-[107px] lg:text-sm ${item === filter ? "text-primary-100 before:w-full lg:bg-primary-100 lg:text-white" : "bg-transparent before:w-0"}`}>
								{item} ({numberOfApartments[item]})
							</button>
						))}
					</div>
					<div className="h-full w-full overflow-y-scroll px-5 lg:px-0">
						<div className="grid h-full w-full grid-cols-1 gap-x-4 gap-y-[22px] lg:grid-cols-3">
							{[...Array(12)].map((_, index) => (
								<div key={index} className="flex w-full flex-col gap-3">
									<div className="relative aspect-[1.8/1] w-full animate-pulse bg-neutral-300"></div>
									<div className="flex w-full flex-col">
										<p className="font-medium">Apartment name</p>
										<p className="text-sm text-neutral-400">Apartment location</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
