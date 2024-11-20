import { RiCommandLine, RiDownload2Line, RiFilter3Line, RiSearch2Line } from "@remixicon/react"
import { useQuery } from "@tanstack/react-query"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Pagination, Seo } from "@/components/shared"
import { BookingItem } from "@/components/dashboard"
import { GetReservationsQuery } from "@/queries"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks"

const filters = ["all", "upcoming", "completed", "cancelled"]
type Filter = (typeof filters)[number]

const Page = () => {
	const [filter, setFilter] = React.useState<Filter>("all")
	const [pageSize, setPageSize] = React.useState(10)
	const ref = React.useRef<HTMLInputElement>(null)!
	const [query, setQuery] = React.useState("")
	const [page, setPage] = React.useState(1)
	useDebounce(query, 500)

	const { data: bookings } = useQuery({
		queryFn: () => GetReservationsQuery({ limit: pageSize, page }),
		queryKey: ["get-reservations"],
	})

	const handleCommand = (e: KeyboardEvent) => {
		if (e.ctrlKey || e.metaKey) {
			if (e.key === "k") {
				e.preventDefault()
				if (ref.current) {
					ref.current.focus()
				}
			}
		}
	}

	React.useEffect(() => {
		document.addEventListener("keydown", handleCommand)
		return () => document.removeEventListener("keydown", handleCommand)
	})

	return (
		<>
			<Seo title="Reserrvations" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-4 px-0 py-5 lg:px-8">
					<div className="flex h-11 w-full items-center border-b p-1 lg:w-fit lg:rounded-lg lg:border">
						{filters.map((item) => (
							<button
								key={item}
								onClick={() => setFilter(item)}
								className={`relative flex flex-1 items-center justify-center rounded-md px-4 py-2 text-sm capitalize before:absolute before:-bottom-[5px] before:left-0 before:h-0.5 before:bg-primary-100 lg:min-w-[107px] lg:before:w-0 ${item === filter ? "text-primary-100 before:w-full lg:bg-primary-100 lg:text-white lg:before:w-0" : "bg-transparent before:w-0"}`}>
								{item}
							</button>
						))}
					</div>
					<div className="flex h-full w-full flex-col gap-6 rounded-lg px-5 py-3 lg:border">
						<div className="flex w-full flex-col items-center justify-between gap-2 py-2 lg:flex-row">
							<div className="flex h-9 w-full items-center gap-2 rounded-md border px-3 py-[10px] lg:min-w-[389px]">
								<RiSearch2Line size={16} />
								<input
									ref={ref}
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="flex-1 bg-transparent text-sm outline-none"
									placeholder="Search here..."
								/>
								<div className="flex h-7 w-[42px] items-center gap-2 rounded bg-neutral-200 p-1">
									<RiCommandLine size={16} /> K
								</div>
							</div>
							<div className="flex w-full items-center gap-4 lg:w-fit">
								<Button className="h-9 w-full lg:w-fit" variant="outline">
									<RiDownload2Line size={16} />
									Export Data
								</Button>
								<Button className="h-9 w-full lg:w-fit" variant="outline">
									<RiFilter3Line size={16} />
									Filter
								</Button>
							</div>
						</div>
						<div className="hidden h-full w-full lg:block">
							<div className="grid h-[30px] w-full grid-cols-12 gap-2 text-xs text-neutral-400">
								<div className="col-span-4 w-full py-1">APARTMENT</div>
								<div className="col-span-2 w-full py-1">DATE</div>
								<div className="w-full py-1">NIGHTS</div>
								<div className="w-full py-1">GUESTS</div>
								<div className="col-span-2 w-full py-1">GUEST NAME</div>
								<div className="w-full py-1">PRICE</div>
								<div className="w-full py-1">STATUS</div>
							</div>
							<div className="flex h-[calc(100%-30px)] w-full flex-col gap-4 overflow-y-scroll">
								{bookings && bookings?.data.meta.itemCount < 1 ? (
									<div className="grid h-full w-full place-items-center">
										<p className="">No results</p>
									</div>
								) : (
									<>
										{bookings?.data.data.map((booking) => (
											<BookingItem key={booking.reservation_id} booking={booking} />
										))}
									</>
								)}
							</div>
						</div>
						<div className="h-[50px] w-full border">
							<Pagination
								current={page}
								onPageChange={setPage}
								onRowChange={setPageSize}
								pageSize={pageSize}
								total={bookings?.data.meta.itemCount ?? 0}
							/>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
