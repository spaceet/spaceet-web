import { RiCalendarCheckLine, RiHome8Line, RiHotelBedLine } from "@remixicon/react"
import Link from "next/link"
import React from "react"

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
									value={15}
									className="w-[170px] flex-shrink-0 rounded border p-4"
								/>
								<DataCard
									direction="up"
									icon={RiCalendarCheckLine}
									label="Total Reservation"
									percentage={5.6}
									value={15}
									className="w-[170px] flex-shrink-0 rounded border p-4"
								/>
								<DataCard
									direction="down"
									icon={RiHome8Line}
									label="Total Listing"
									percentage={5.6}
									value={15}
									className="w-[170px] flex-shrink-0 rounded border p-4"
								/>
								<DataCard
									direction="up"
									icon={RiHotelBedLine}
									label="Total Listing"
									percentage={5.6}
									value={15}
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
								value={15}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="up"
								icon={RiCalendarCheckLine}
								label="Total Reservation"
								percentage={5.6}
								value={15}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="down"
								icon={RiHome8Line}
								label="Total Listing"
								percentage={5.6}
								value={15}
							/>
							<Separator orientation="vertical" className="h-[72px] bg-neutral-300" />
							<DataCard
								direction="up"
								icon={RiHotelBedLine}
								label="Total Listing"
								percentage={5.6}
								value={15}
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
									0
								</span>
							</p>
						</div>
						<div className="flex w-auto items-center gap-5 overflow-x-scroll">
							{[...Array(3)].map((_, index) => (
								<div key={index} className="h-[257px] w-[250px] flex-shrink-0 lg:w-[362px]">
									<div className="h-[200px] w-full bg-red-300"></div>
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
