import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { GetAllHostPropertiesQuery } from "@/queries"
import { Seo } from "@/components/shared"

const filters = ["all", "reserved", "vacant", "draft"] as const
type Filter = (typeof filters)[number]

const Page = () => {
	const [filter, setFilter] = React.useState<Filter>("all")
	const [page, _setPage] = React.useState(1)

	const { data } = useQuery({
		queryFn: () => GetAllHostPropertiesQuery({ limit: 10, page }),
		queryKey: ["all-host-properties"],
	})

	const numberOfApartments: Record<Filter, number> = React.useMemo(() => {
		if (data) {
			const apartments = data.data.data
			const reserved = apartments.filter((apartment) => apartment.status === "RESERVED")
			const vacant = apartments.filter((apartment) => apartment.status === "VACANT")
			const draft = apartments.filter((apartment) => apartment.status === "DRAFT")
			return {
				all: apartments.length,
				reserved: reserved.length,
				vacant: vacant.length,
				draft: draft.length,
			}
		}
		return { all: 0, reserved: 0, vacant: 0, draft: 0 }
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
								className={`relative flex w-fit items-center justify-center rounded-md px-4 py-2 text-xs capitalize before:absolute before:-bottom-[5px] before:left-0 before:h-0.5 before:bg-primary-100 lg:min-w-[107px] lg:text-sm ${item === filter ? "text-primary-100 before:w-full lg:bg-primary-100 lg:text-white lg:before:w-0" : "bg-transparent before:w-0"}`}>
								{item} ({numberOfApartments[item]})
							</button>
						))}
					</div>
					<div className="h-full w-full overflow-y-scroll px-5 lg:px-0">
						{!data?.data.data.length ? (
							<div className="grid h-full w-full place-items-center">
								<p>No apartments here.</p>
							</div>
						) : (
							<div className="grid h-full w-full grid-cols-1 gap-x-4 gap-y-[22px] lg:grid-cols-3">
								{data.data.data.map((apartment) => (
									<div key={apartment.id} className="flex w-full flex-col gap-3">
										<div className="relative aspect-[1.8/1] w-full animate-pulse bg-neutral-300">
											<Image
												src={apartment.images[0]}
												alt={apartment.name}
												fill
												sizes="(max-width:1024px)100%"
												className="object-cover"
											/>
										</div>
										<div className="flex w-full flex-col">
											<p className="font-medium">{apartment.name}</p>
											<p className="text-sm capitalize text-neutral-400">
												{apartment.city}, {apartment.state}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
