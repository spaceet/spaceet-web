import { RiCommandLine, RiDownload2Line, RiFilter3Line, RiSearch2Line } from "@remixicon/react"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { BookingItem } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Seo } from "@/components/shared"
import { BookingProps } from "@/types"
import { useDebounce } from "@/hooks"

const filters = ["all", "upcoming", "completed", "cancelled"]
type Filter = (typeof filters)[number]

const Page = () => {
	const [filter, setFilter] = React.useState<Filter>("all")
	const [bookings] = React.useState<BookingProps[]>([])
	const ref = React.useRef<HTMLInputElement>(null)!
	const [query, setQuery] = React.useState("")
	useDebounce(query, 500)

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
				<div className="flex h-full w-full flex-col gap-4 px-8 py-5">
					<div className="flex h-11 w-fit items-center rounded-lg border p-1">
						{filters.map((item) => (
							<button
								key={item}
								onClick={() => setFilter(item)}
								className={`flex min-w-[107px] items-center justify-center rounded-md px-4 py-2 text-sm capitalize ${item === filter ? "bg-primary-100 text-white" : "bg-transparent"}`}>
								{item}
							</button>
						))}
					</div>
					<div className="flex h-full w-full flex-col gap-6 rounded-lg border px-5 py-3">
						<div className="flex w-full items-center justify-between py-2">
							<div className="flex h-9 min-w-[389px] items-center gap-2 rounded-md border px-3 py-[10px]">
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
							<div className="flex items-center gap-4">
								<Button className="h-9" variant="outline">
									<RiDownload2Line size={16} />
									Export Data
								</Button>
								<Button className="h-9" variant="outline">
									<RiFilter3Line size={16} />
									Filter
								</Button>
							</div>
						</div>
						<div className="h-full w-full">
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
								{bookings.map((booking) => (
									<BookingItem key={booking.id} booking={booking} />
								))}
							</div>
						</div>
						<div className="h-[50px] w-full border"></div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
