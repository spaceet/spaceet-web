import React from "react"
import {
	RiCalendarCheckLine,
	RiCommandLine,
	RiDownload2Line,
	RiFilter3Line,
	RiHome8Line,
	RiHotelBedLine,
	RiSearch2Line,
} from "@remixicon/react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DataCard, PaymentItem } from "@/components/dashboard"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Seo } from "@/components/shared"
import { PaymentProps } from "@/types"
import { formatCurrency } from "@/lib"
import { useDebounce } from "@/hooks"
import { filters } from "@/config"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const filters2 = ["all", "succeeded", "failed", "pending"]
type Filter2 = (typeof filters2)[number] | (string & {})
type Filter = (typeof filters)[number] | (string & {})

const Page = () => {
	const [filter2, setFilter2] = React.useState<Filter2>("all")
	const [filter, setFilter] = React.useState<Filter>("all")
	const ref = React.useRef<HTMLInputElement>(null)!
	const [query, setQuery] = React.useState("")
	useDebounce(query, 500)

	const [payments] = React.useState<PaymentProps[]>([])

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
			<Seo title="Payments" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-10 overflow-y-auto px-8 py-[35px]">
					<div className="flex w-full flex-col gap-5">
						<div className="flex w-full items-center justify-between">
							<p>Overview</p>
							<div className="flex items-center gap-5">
								<Select value={filter} onValueChange={setFilter}>
									<SelectTrigger className="h-10 w-[130px] capitalize">
										<SelectValue />
									</SelectTrigger>
									<SelectContent className="capitalize">
										{filters.map((filter) => (
											<SelectItem key={filter} value={filter}>
												{filter}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline">Make Withdrawal</Button>
									</DialogTrigger>
									<DialogContent className="w-[400px]">
										<DialogTitle className="font-body">Make Withdrawal</DialogTitle>
										<DialogDescription hidden></DialogDescription>
									</DialogContent>
								</Dialog>
							</div>
						</div>
						<div className="flex h-[135px] w-full items-center rounded-md border">
							<DataCard
								direction="up"
								icon={RiHome8Line}
								label="Total Earnings"
								percentage={5.6}
								value={formatCurrency(3500, "NGN")}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="up"
								icon={RiCalendarCheckLine}
								label="Current Wallet Balance"
								percentage={5.6}
								value={formatCurrency(3500, "NGN")}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="down"
								icon={RiHome8Line}
								label="Total Withdrawals"
								percentage={5.6}
								value={formatCurrency(3500, "NGN")}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="up"
								icon={RiHotelBedLine}
								label="Total Bookings"
								percentage={5.6}
								value={formatCurrency(3500, "NGN")}
							/>
						</div>
					</div>
					<div className="flex h-full w-full flex-col gap-4">
						<div className="flex w-fit items-center gap-6">
							<p>Payment Hitory</p>
							<div className="flex h-11 w-fit items-center rounded-lg border p-1">
								{filters2.map((item) => (
									<button
										key={item}
										onClick={() => setFilter2(item)}
										className={`flex min-w-[107px] items-center justify-center rounded-md px-4 py-2 text-sm capitalize ${item === filter2 ? "bg-primary-100 text-white" : "bg-transparent"}`}>
										{item}
									</button>
								))}
							</div>
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
									<div className="col-span-2 w-full py-1">GUEST NAME</div>
									<div className="col-span-2 w-full py-1">DATE RECEIVED</div>
									<div className="col-span-2 w-full py-1">NIGHTS</div>
									<div className="w-full py-1">PRICE</div>
									<div className="w-full py-1">STATUS</div>
								</div>
								<div className="flex h-[calc(100%-30px)] w-full flex-col gap-4 overflow-y-scroll">
									{payments.map((payment) => (
										<PaymentItem key={payment.id} payment={payment} />
									))}
								</div>
							</div>
							<div className="h-[50px] w-full border"></div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
