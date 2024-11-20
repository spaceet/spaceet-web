import { useQueries } from "@tanstack/react-query"
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

import { GetPaymentHistoryQuery, GetPaymentOverviewQuery } from "@/queries"
import { DataCard, PaymentItem, Withdrawal } from "@/components/dashboard"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Separator } from "@/components/ui/separator"
import { PaymentProps, TimelineProps } from "@/types"
import { Button } from "@/components/ui/button"
import { Seo } from "@/components/shared"
import { formatCurrency } from "@/lib"
import { useDebounce } from "@/hooks"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const statuses = ["all", "succeeded", "failed", "pending"]
type Status = (typeof statuses)[number] | (string & {})
const filters: { label: string; value: TimelineProps }[] = [
	{ label: "All", value: "ALL" },
	{ label: "Today", value: "TODAY" },
	{ label: "Yesterday", value: "YESTERDAY" },
	{ label: "Last 7 days", value: "LAST_7_DAYS" },
	{ label: "This week", value: "THIS_WEEK" },
	{ label: "Last week", value: "LAST_WEEK" },
	{ label: "This month", value: "THIS_MONTH" },
	{ label: "Last 6 months", value: "LAST_6_MONTHS" },
	{ label: "Last 12 months", value: "LAST_12_MONTHS" },
]

const Page = () => {
	const [filter, setFilter] = React.useState<TimelineProps>("ALL")
	const [status, setStatus] = React.useState<Status>("all")
	const input = React.useRef<HTMLInputElement>(null)!
	const [query, setQuery] = React.useState("")
	useDebounce(query, 500)

	const [{}, {}] = useQueries({
		queries: [
			{
				queryFn: () => GetPaymentOverviewQuery({ timeLine: filter }),
				queryKey: ["get-payment-overview", filter],
			},
			{
				queryFn: () => GetPaymentHistoryQuery({}),
				queryKey: ["get-payment-overview"],
				enabled: false,
			},
		],
	})

	const [payments] = React.useState<PaymentProps[]>([])

	const handleCommand = (e: KeyboardEvent) => {
		if (e.ctrlKey || e.metaKey) {
			if (e.key === "k") {
				e.preventDefault()
				if (input.current) {
					input.current.focus()
				}
			}
		} else if (e.key === "Escape") {
			if (input.current) {
				input.current.blur()
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
				<div className="flex h-full w-full flex-col gap-10 overflow-y-auto px-0 py-[35px] lg:px-8">
					<div className="flex w-full flex-col gap-5">
						<div className="hidden w-full items-center justify-between lg:flex">
							<p>Overview</p>
							<div className="flex items-center gap-5">
								<Select value={filter} onValueChange={setFilter}>
									<SelectTrigger className="h-10 w-[130px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{filters.map(({ label, value }) => (
											<SelectItem key={value} value={value}>
												{label}
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
										<Withdrawal />
									</DialogContent>
								</Dialog>
							</div>
						</div>
						<div className="flex w-full flex-col items-center gap-3 overflow-x-hidden px-5 lg:hidden">
							<div className="flex w-full items-center gap-x-2 overflow-x-scroll">
								<DataCard
									direction="up"
									icon={RiHome8Line}
									label="Total Earnings"
									percentage={5.6}
									value={formatCurrency(3500, "NGN")}
									className="w-[170px] rounded border p-4"
								/>
								<DataCard
									direction="up"
									icon={RiCalendarCheckLine}
									label="Current Wallet Balance"
									percentage={5.6}
									value={formatCurrency(3500, "NGN")}
									className="w-[170px] rounded border p-4"
								/>
								<DataCard
									direction="down"
									icon={RiHome8Line}
									label="Total Withdrawals"
									percentage={5.6}
									value={formatCurrency(3500, "NGN")}
									className="w-[170px] rounded border p-4"
								/>
								<DataCard
									direction="up"
									icon={RiHotelBedLine}
									label="Total Bookings"
									percentage={5.6}
									value={formatCurrency(3500, "NGN")}
									className="w-[170px] rounded border p-4"
								/>
							</div>
							<div className="flex w-full items-center justify-center gap-[6px]">
								{[...Array(4)].map((_, index) => (
									<button key={index} className={`size-2 rounded-full bg-neutral-400`}></button>
								))}
							</div>
							<Drawer>
								<DrawerTrigger asChild>
									<Button variant="outline" className="mt-5 w-full">
										Make Withdrawal
									</Button>
								</DrawerTrigger>
								<DrawerContent className="flex flex-col gap-4 p-5">
									<DrawerTitle className="font-body text-base font-medium">Make Withdrawal</DrawerTitle>
									<DrawerDescription hidden></DrawerDescription>
									<Withdrawal />
								</DrawerContent>
							</Drawer>
						</div>
						<div className="hidden h-[135px] w-full items-center rounded-md border lg:flex">
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
						<div className="flex w-full flex-col items-start gap-6 lg:w-fit lg:flex-row lg:items-center">
							<p className="px-5 lg:px-0">Payment Hitory</p>
							<div className="flex h-11 w-full items-center border-b p-1 lg:w-fit lg:rounded-lg lg:border">
								{statuses.map((item) => (
									<button
										key={item}
										onClick={() => setStatus(item)}
										className={`relative flex flex-1 items-center justify-center rounded-md px-4 py-2 text-sm capitalize before:absolute before:-bottom-[5px] before:left-0 before:h-0.5 before:bg-primary-100 lg:min-w-[107px] ${item === status ? "text-primary-100 before:w-full lg:bg-primary-100 lg:text-white lg:before:w-0" : "bg-transparent before:w-0"}`}>
										{item}
									</button>
								))}
							</div>
						</div>
						<div className="flex h-full w-full flex-col gap-6 px-5 py-3 lg:rounded-lg lg:border lg:px-5">
							<div className="flex w-full flex-col items-center justify-between gap-2 py-2 lg:flex-row">
								<div className="flex h-9 w-full items-center gap-2 rounded-md border px-3 py-[10px] lg:min-w-[389px]">
									<RiSearch2Line size={16} />
									<input
										ref={input}
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
