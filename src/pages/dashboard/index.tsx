import {
	RiCalendarCheckLine,
	RiHome8Line,
	RiHotelBedLine,
	RiRadioButtonLine,
} from "@remixicon/react"
import { useQueries } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { GetAllHostPropertiesQuery, GetHostReservationsQuery } from "@/queries"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Separator } from "@/components/ui/separator"
import { filters, quick_actions } from "@/config"
import { DataCard } from "@/components/dashboard"
import { Seo } from "@/components/shared"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

type Filter = (typeof filters)[number] | (string & {})

const Page = () => {
	const [filter, setFilter] = React.useState<Filter>("all")

	const [{ data }, { data: reservations }] = useQueries({
		queries: [
			{
				queryFn: () => GetAllHostPropertiesQuery({}),
				queryKey: ["host-properties"],
			},
			{
				queryFn: () => GetHostReservationsQuery({}),
				queryKey: ["host-reservations"],
			},
		],
	})

	const apartments = React.useMemo(() => {
		if (!data) return []
		return data.data.data
	}, [data])

	return (
		<>
			<Seo title="Dashboard" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-10 overflow-y-auto px-5 py-[35px] lg:px-8">
					<div className="flex w-full flex-col gap-5">
						<div className="hidden w-full items-center justify-between lg:flex">
							<p>Overview</p>
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
						</div>
						<div className="flex w-full flex-col items-center gap-3 overflow-x-hidden lg:hidden">
							<div className="flex w-full items-center gap-x-2 overflow-x-scroll">
								<DataCard
									direction="up"
									icon={RiHome8Line}
									label="Total Listing"
									percentage={5.6}
									value={apartments.length}
									className="w-[170px] flex-shrink-0 rounded border p-4"
								/>
								<DataCard
									direction="up"
									icon={RiCalendarCheckLine}
									label="Total Reservation"
									percentage={5.6}
									value={Number(reservations?.data.meta.itemCount)}
									className="w-[170px] flex-shrink-0 rounded border p-4"
								/>
								<DataCard
									direction="down"
									icon={RiHome8Line}
									label="Upcoming Reservations"
									percentage={5.6}
									value={15}
									className="w-[170px] flex-shrink-0 rounded border p-4"
								/>
								<DataCard
									direction="up"
									icon={RiHotelBedLine}
									label="Total Listing"
									percentage={5.6}
									value={apartments.length}
									className="w-[170px] flex-shrink-0 rounded border p-4"
								/>
							</div>
							<div className="flex w-full items-center justify-center gap-[6px]">
								{[...Array(4)].map((_, index) => (
									<button key={index} className={`size-2 rounded-full bg-neutral-400`}></button>
								))}
							</div>
						</div>
						<div className="hidden h-[135px] w-full items-center rounded-md border lg:flex">
							<DataCard
								direction="up"
								icon={RiHome8Line}
								label="Total Listing"
								percentage={5.6}
								value={apartments.length}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="up"
								icon={RiCalendarCheckLine}
								label="Total Reservation"
								percentage={5.6}
								value={Number(reservations?.data.meta.itemCount)}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="down"
								icon={RiHome8Line}
								label="Upcoming Reservations"
								percentage={5.6}
								value={15}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="up"
								icon={RiHotelBedLine}
								label="Total Listing"
								percentage={5.6}
								value={apartments.length}
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-5">
						<div className="flex w-full items-center justify-between">
							<p>Quick Actions</p>
						</div>
						<div className="flex w-auto items-center gap-5 overflow-x-scroll">
							{quick_actions.map(({ content, icon: Icon, label, text, url }, index) => (
								<div
									key={index}
									className="flex h-[209px] w-[200px] flex-shrink-0 flex-col gap-5 rounded-md border p-5 lg:w-[360px] lg:flex-1">
									<div className="grid size-9 place-items-center rounded-md bg-primary-100/25 text-primary-100 lg:size-[45px]">
										<Icon className="size-5 lg:size-9" />
									</div>
									<div className="flex min-h-20 w-full flex-col gap-3">
										<p className="text-base lg:text-lg">{label}</p>
										<p className="text-xs text-neutral-400 lg:text-sm">{content}</p>
									</div>
									<Link href={url} className="text-xs text-primary-100 lg:text-sm">
										{text}
									</Link>
								</div>
							))}
						</div>
					</div>
					<div className="flex w-full flex-col gap-5">
						<div className="flex w-full items-center justify-between">
							<p className="flex items-center gap-2">
								Listings{" "}
								<span className="grid h-5 w-5 place-items-center rounded-full bg-black text-xs text-white">
									{apartments.length}
								</span>
							</p>
						</div>
						<div className="grid w-full grid-cols-3 gap-5">
							{apartments.map((apartment, index) => (
								<div key={index} className="h-[257px] w-[250px] flex-shrink-0 lg:w-[362px]">
									<div className="relative h-[200px] w-full">
										<div
											className={`absolute right-5 top-2 !z-10 flex items-center gap-1 rounded bg-white p-1 text-[10px] capitalize ${apartment.status === "VACANT" ? "text-red-500" : "text-green-500"}`}>
											<RiRadioButtonLine size={10} />
											{apartment.status.toLowerCase()}
										</div>
										<Image
											src={apartment.images[0]}
											alt={apartment.name}
											fill
											sizes="(max-width:1024px)100%"
											className="object-cover"
										/>
									</div>
									<p className="text-2xl font-medium capitalize">{apartment.name}</p>
									<p className="text-sm capitalize">
										{apartment.city}, {apartment.state}
									</p>
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
