import { RiArrowLeftSLine } from "@remixicon/react"
import React from "react"

import { Appbar, Seo } from "@/components/shared"
import { useUserStore } from "@/store/z-store"
import { user_tabs } from "@/components/user"
import { capitalizeWords } from "@/lib"

const Page = () => {
	const [current, setCurrent] = React.useState(0)
	const { user } = useUserStore()

	const ActiveComponent = user_tabs[current].component

	const handlePrev = () => {
		if (current > 0) {
			setCurrent(current - 1)
		}
	}

	return (
		<>
			<Seo title={capitalizeWords(String(`${user?.first_name} ${user?.last_name}`))} />
			<Appbar />
			<main className="container mx-auto my-12 h-full">
				<div className="mt-9 flex w-full items-center border-b lg:hidden">
					{user_tabs.map(({ label }, index) => (
						<button
							key={index}
							onClick={() => setCurrent(index)}
							className={`relative flex flex-1 items-center justify-center px-2 py-3 text-sm capitalize before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-primary-100 ${current === index ? "font-medium text-primary-100 before:w-full" : "text-neutral-400"}`}>
							{label}
						</button>
					))}
				</div>
				<div className="flex h-full w-full items-start gap-8 overflow-y-scroll">
					<div className="hidden w-60 flex-col gap-4 lg:flex lg:w-[300px]">
						<button onClick={handlePrev} className="flex items-center gap-2 font-semibold">
							<RiArrowLeftSLine size={20} /> Back
						</button>
						<p className="text-2xl font-semibold">Personal Information</p>
						<div className="flex w-full flex-col gap-3 rounded-xl border px-5 py-6">
							<p className="text-xs text-neutral-400">MY ACCOUNT</p>
							<div className="flex w-full flex-col gap-3">
								{user_tabs.map(({ icon: Icon, label }, index) => (
									<button
										onClick={() => setCurrent(index)}
										key={index}
										className={`flex w-full items-center gap-1 rounded-md p-2 font-medium capitalize ${current === index ? "bg-neutral-200" : ""}`}>
										<Icon size={20} /> {label}
									</button>
								))}
							</div>
						</div>
					</div>
					<div className="w-full flex-1">
						<ActiveComponent />
					</div>
				</div>
			</main>
		</>
	)
}

export default Page
