import { RiMessage2Line, RiSearchLine } from "@remixicon/react"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"
import { message_types } from "@/config"
import { MessageProps } from "@/types"
import { useDebounce } from "@/hooks"

type Tabs = (typeof message_types)[number]

const Page = () => {
	const [messages] = React.useState<MessageProps[]>([])
	const [tab, setTab] = React.useState<Tabs>("all")
	const [query, setQuery] = React.useState("")
	const _query = useDebounce(query, 300)

	React.useEffect(() => {
		console.log("query: ", _query)
	}, [_query])

	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout>
				<div className="flex h-full w-full items-center">
					<div className="flex h-full w-full max-w-[360px] flex-col border-r">
						<div className="grid h-20 w-full place-items-center border-b px-8">
							<div className="flex w-full items-center gap-2 rounded-full border px-4 py-3">
								<input
									type="search"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="h-full w-full text-sm outline-none"
									placeholder="Search"
								/>
								<RiSearchLine />
							</div>
						</div>
						<div className="w-full px-8 py-5">
							<div className="flex w-full items-center rounded-full border p-1">
								{message_types.map((type) => (
									<button
										key={type}
										onClick={() => setTab(type)}
										className={`flex w-full flex-1 items-center justify-center rounded-3xl py-[9px] text-sm capitalize transition-all ${type === tab ? "bg-primary-100 font-medium text-white" : "bg-transparent text-neutral-400"}`}>
										{type}
									</button>
								))}
							</div>
						</div>
						<div className="flex h-auto w-full flex-col overflow-y-auto">{/* user list here */}</div>
					</div>
					<div className="flex h-full w-full flex-col">
						<div className="h-20 w-full border-b"></div>
						<div className="h-[calc(100%-80px)] w-full">
							{messages.length ? (
								<div className="flex h-full w-full flex-col overflow-y-auto"></div>
							) : (
								<div className="grid h-full w-full place-items-center">
									<div className="flex w-[282px] flex-col items-center justify-center gap-6">
										<RiMessage2Line size={32} />
										<div className="flex w-full flex-col gap-2 text-center">
											<p className="font-medium">No messages here yet</p>
											<p className="text-sm text-neutral-400">
												When you receive a new message, it will appear here.
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
