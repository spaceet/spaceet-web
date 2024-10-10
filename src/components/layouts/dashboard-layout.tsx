import { RiAddLine, RiArrowDownSLine, RiMenuLine, RiNotification4Line } from "@remixicon/react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getInitials, normalized } from "@/lib"
import { useUserStore } from "@/store/z-store"
import { useAppHeader } from "./app-header"
import { dashboard_links } from "@/config"
import { Button } from "../ui/button"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"

interface Props {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
	const [open, setOpen] = React.useState(false)
	const { user } = useUserStore()
	const router = useRouter()

	const isOnRoute = (path: string) => normalized(router.pathname) === path

	return (
		<div className="flex h-screen w-screen overflow-hidden">
			<aside className="hidden h-full w-0 lg:block lg:w-64">
				<div className="grid h-24 w-full place-items-center border-b">
					<Link href="/">
						<Image src="/spaceet.svg" alt="spaceet" width={140} height={30} priority />
					</Link>
				</div>
				<div className="h-full w-full px-6 py-8">
					<div className="flex w-full flex-col gap-6">
						{dashboard_links.map((dashboard) => (
							<div key={dashboard.label} className="flex w-full flex-col gap-4">
								<p className="text-xs uppercase text-neutral-400">{dashboard.label}</p>
								<div className="flex w-full flex-col gap-2">
									{dashboard.links.map(({ icon: Icon, name, url }, index) => (
										<Link
											key={index}
											href={url}
											className={`flex w-full items-center gap-2 rounded-md p-2 ${isOnRoute(url) ? "bg-neutral-200" : ""}`}>
											<Icon size={20} />
											<span className="text-sm font-medium">{name}</span>
										</Link>
									))}
								</div>
							</div>
						))}
						<Link href="/dashboard/listings/new">
							<Button className="h-9 w-full">
								<RiAddLine size={20} />
								New Apartment
							</Button>
						</Link>
					</div>
				</div>
			</aside>
			<Separator orientation="vertical" className="bg-neutral-300" />
			<main className="h-full w-full flex-1">
				<nav className="flex h-24 w-full items-center justify-between border-b px-8">
					<Link href="/" className="block lg:hidden">
						<Image src="/spaceet.svg" alt="spaceet" width={140} height={30} priority />
					</Link>
					{useAppHeader(router.pathname)}
					<div className="flex items-center gap-3">
						<button className="relative grid size-10 place-items-center rounded-full border">
							<RiNotification4Line size={24} />
						</button>
						<Sheet>
							<SheetTrigger asChild>
								<button className="relative grid size-10 place-items-center rounded-full border lg:hidden">
									<RiMenuLine size={24} />
								</button>
							</SheetTrigger>
							<SheetContent className="bg-white">
								<SheetTitle hidden></SheetTitle>
								<SheetDescription hidden></SheetDescription>
							</SheetContent>
						</Sheet>
						<Separator orientation="vertical" className="hidden h-7 bg-neutral-300 lg:block" />
						<button onClick={() => setOpen(!open)} className="hidden items-center gap-2 lg:flex">
							<Avatar className="size-10 border bg-primary-100 text-white">
								<AvatarImage src={user?.profile_image} alt={user?.first_name} />
								<AvatarFallback className="text-sm font-medium">
									{getInitials(`${user?.first_name} ${user?.last_name}`)}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col items-start">
								<p className="text-sm font-medium">
									{user?.first_name} {user?.last_name}
								</p>
								<p className="text-xs text-neutral-400">{user?.email}</p>
							</div>
							<RiArrowDownSLine
								size={20}
								className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`}
							/>
						</button>
					</div>
				</nav>
				<div className="h-[calc(100vh-96px)] w-full overflow-hidden">{children}</div>
			</main>
		</div>
	)
}

export default DashboardLayout
