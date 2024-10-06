import { RiArrowLeftSLine } from "@remixicon/react"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"
import { user_tabs } from "@/config"

const Page = () => {
	const [active, setActive] = React.useState(0)
	const ActiveComponent = user_tabs[active].component

	return (
		<>
			<Seo title="Settings" />
			<DashboardLayout>
				<div className="mt-9 flex w-full items-center border-b lg:hidden">
					{user_tabs.map(({ label }, index) => (
						<button
							key={index}
							onClick={() => setActive(index)}
							className={`relative flex flex-1 items-center justify-center px-2 py-3 text-sm capitalize before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-primary-100 ${active === index ? "font-medium text-primary-100 before:w-full" : "text-neutral-400"}`}>
							{label}
						</button>
					))}
				</div>
				<div className="flex h-full w-full items-start gap-8 overflow-y-scroll px-5 py-12 lg:px-8">
					<div className="hidden w-60 flex-col gap-4 lg:flex">
						<button className="flex items-center gap-2 font-semibold">
							<RiArrowLeftSLine size={20} /> Back
						</button>
						<p className="text-2xl font-semibold">Personal Information</p>
						<div className="flex w-full flex-col gap-3 rounded-xl border p-6">
							<p className="text-xs text-neutral-400">MY ACCOUNT</p>
							<div className="flex w-full flex-col gap-3">
								{user_tabs.map(({ icon: Icon, label }, index) => (
									<button
										onClick={() => setActive(index)}
										key={index}
										className={`flex w-full items-center gap-1 rounded-md p-2 font-medium capitalize ${active === index ? "bg-neutral-200" : ""}`}>
										<Icon size={20} /> {label}
									</button>
								))}
							</div>
						</div>
					</div>
					<div className="w-[600px]">
						<ActiveComponent />
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
