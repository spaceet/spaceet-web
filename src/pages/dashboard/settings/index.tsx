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
				<div className="flex h-full w-full items-start gap-8 px-8 py-12">
					<div className="flex w-60 flex-col gap-4">
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
