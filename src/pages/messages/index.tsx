import { EllipsisVertical, Search } from "lucide-react"
import { useQueries } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { GetUserByIdQuery, GetAllMessagesQuery } from "@/queries"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Appbar, Seo } from "@/components/shared"
import { UserProps } from "@/types"

const tablist = ["all", "read", "unread"] as const
type TabList = (typeof tablist)[number]

const Page = () => {
	const [currentUser, setCurrentUser] = React.useState<UserProps | null>(null)
	const [current, setcurrent] = React.useState<TabList>("all")
	const [isOpen, setIsOpen] = React.useState(false)
	const router = useRouter()
	const { user } = router.query

	const hosts: UserProps[] = []

	const [] = useQueries({
		queries: [
			{
				queryFn: () => GetUserByIdQuery(String(user)),
				queryKey: ["get-host", user],
				enabled: !!user,
			},
			{
				queryFn: () => GetAllMessagesQuery(),
				queryKey: ["get-messages"],
				enabled: false,
			},
		],
	})

	return (
		<>
			<Seo title={"Messages"} />
			<Appbar />
			<main className="container mx-auto my-12 h-[calc(100vh-196px)]">
				<div className="flex h-full w-full items-center rounded-3xl border">
					<div className="flex h-full w-[336px] flex-col">
						<div className="flex h-20 min-h-20 w-full items-center justify-between border-b px-5">
							<p className="font-medium lg:text-xl">Messages</p>
							<button className="grid size-10 place-items-center">
								<Search />
							</button>
						</div>
						<div className="my-[18px] w-full px-5">
							<div className="flex w-fit items-center rounded-[43px] border p-1">
								{tablist.map((tab) => (
									<button
										key={tab}
										onClick={() => setcurrent(tab)}
										className={`flex w-24 items-center justify-center rounded-[43px] py-3 text-xs capitalize transition-all duration-500 lg:text-sm ${current === tab ? "bg-primary-100 font-semibold text-white" : "bg-transparent font-light text-neutral-600"}`}>
										{tab}
									</button>
								))}
							</div>
						</div>
						<div className="h-auto w-full overflow-y-scroll">
							{!hosts.length ? (
								<div className="mt-[87px] flex flex-col items-center px-5 text-center">
									<div className="mb-6 size-8"></div>
									<p className="font-medium lg:text-sm">No messages here yet.</p>
									<p className="text-neutral-400 lg:text-xs">
										When you receive a new message, it will appear here.
									</p>
								</div>
							) : (
								<>
									{hosts.map((host, index) => (
										<button
											key={index}
											onClick={() => setCurrentUser(host)}
											className={`flex h-20 w-full items-center gap-3 border-t px-5 ${host.id === currentUser?.id ? "bg-neutral-200" : "bg-white"}`}>
											<Avatar className="size-10">
												<AvatarImage src={host.profile_image} alt={host.first_name} className="object-cover" />
											</Avatar>
											<div className="flex w-full flex-col gap-2">
												<div className="flex w-full items-center justify-between">
													<p className="font-medium lg:text-sm">
														{host.first_name} {host.last_name}
													</p>
													<p className="text-neutral-400 lg:text-xs">11:12 AM</p>
												</div>
												<div className="flex w-full items-center justify-between">
													<p className="max-w-[75%] text-neutral-400 lg:text-xs">
														Lorem ipsum dolor sit amet...
													</p>
													<span className="rounded-xl bg-neutral-900 px-3 py-0.5 text-white lg:text-[10px]">
														2
													</span>
												</div>
											</div>
										</button>
									))}
								</>
							)}
						</div>
					</div>
					<Separator orientation="vertical" className="h-full bg-neutral-300" />
					<div className="h-full w-full flex-1">
						<div className="flex h-20 w-full items-center justify-between border-b px-5">
							{currentUser !== null && (
								<div className="flex items-center gap-3">
									<Avatar className="size-10">
										<AvatarImage
											src={currentUser.profile_image}
											alt={currentUser.first_name}
											className="object-cover"
										/>
									</Avatar>
									<div className="flex flex-col">
										<p className="font-medium lg:text-sm">
											{currentUser.first_name} {currentUser.last_name}
										</p>
										<p className="text-neutral-400 lg:text-xs">Online</p>
									</div>
								</div>
							)}
							<div></div>
							{currentUser !== null && (
								<Popover open={isOpen} onOpenChange={setIsOpen}>
									<PopoverTrigger asChild>
										<button className="grid size-10 place-items-center rounded bg-neutral-200">
											<EllipsisVertical size={16} />
										</button>
									</PopoverTrigger>
									<PopoverContent className="mr-28 w-[180px] bg-white p-0">
										<button className="w-full px-4 py-3 text-neutral-600 lg:text-sm">Archive</button>
										<hr />
										<button className="w-full px-4 py-3 text-neutral-600 lg:text-sm">Mark as read</button>
										<hr />
										<button className="w-full px-4 py-3 text-neutral-600 lg:text-sm">Delete chat</button>
									</PopoverContent>
								</Popover>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default Page
