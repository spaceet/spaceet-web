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
				<div className="flex h-full w-full flex-col gap-10 overflow-y-auto px-8 py-[35px]">
					<div className="flex w-full flex-col gap-5">
						<div className="flex w-full items-center justify-between">
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
						<div className="flex h-[135px] w-full items-center rounded-md border">
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
						<div className="grid h-[209px] w-full grid-cols-3 gap-5">
							{quick_actions.map(({ content, icon: Icon, label, text, url }, index) => (
								<div key={index} className="flex w-full flex-col gap-5 rounded-md border p-5">
									<div className="grid size-[45px] place-items-center rounded-md bg-primary-100/25 text-primary-100">
										<Icon size={34} />
									</div>
									<div className="flex min-h-20 w-full flex-col gap-3">
										<p className="text-lg">{label}</p>
										<p className="text-sm text-neutral-400">{content}</p>
									</div>
									<Link href={url} className="text-sm text-primary-100">
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
						<div className="flex w-full items-center gap-5 overflow-x-auto"></div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
