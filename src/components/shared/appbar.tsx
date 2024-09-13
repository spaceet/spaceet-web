import { ChevronDown, Menu } from "lucide-react"
import { RiUserLine } from "@remixicon/react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGlobalStore, useUserStore } from "@/store/z-store"
import { CurrencySelector } from "./currency-selector"
import { LanguageSelector } from "./language-selector"
import { Separator } from "@/components/ui/separator"
import { UnuserMenu } from "./unuser-menu"
import { TabPanel } from "./tab-panel"
import { UserMenu } from "./user-menu"
import { getInitials } from "@/lib"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const tabs = ["language & regions", "currency"]

export const Appbar = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [current, setCurrent] = React.useState(0)
	const [open, setOpen] = React.useState(false)
	const { language } = useGlobalStore()
	const { user } = useUserStore()
	const router = useRouter()

	const isOnBecomeAHostPage = router.pathname === "/become-a-host"

	return (
		<nav
			role="menubar"
			className="static left-0 top-0 !z-30 flex max-h-[100px] w-screen items-center justify-center border-b bg-white">
			<div className="container mx-auto flex h-[100px] items-center justify-between overflow-hidden">
				<div className="flex items-center gap-4 text-sm text-neutral-600">
					<Link href="/" className="text-xl font-bold">
						<Image src="/spaceet.svg" alt="spaceet" width={140} height={30} priority />
					</Link>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<button className="flex items-center">
								<span className="min-w-16 font-medium">{language}</span>
								<ChevronDown
									className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
									size={12}
								/>
							</button>
						</DialogTrigger>
						<DialogContent className="h-[70vh] w-full max-w-4xl overflow-y-scroll">
							<DialogTitle hidden></DialogTitle>
							<DialogDescription hidden></DialogDescription>
							<div className="flex w-full flex-col gap-4">
								<div className="flex items-center">
									{tabs.map((tab, index) => (
										<button
											key={index}
											onClick={() => setCurrent(index)}
											className={`"flex min-w-[100px] items-center justify-center font-medium capitalize ${current === index ? "text-neutral-900" : "text-neutral-500"}`}>
											{tab}
										</button>
									))}
								</div>
								<TabPanel tabValue={0} selectedTab={current}>
									<LanguageSelector />
								</TabPanel>
								<TabPanel tabValue={1} selectedTab={current}>
									<CurrencySelector />
								</TabPanel>
							</div>
						</DialogContent>
					</Dialog>
					<Separator orientation="vertical" className="h-6" />
					{!isOnBecomeAHostPage && (
						<div className="flex items-center gap-4">
							<Link href="/apartments" className="link">
								Book a Space
							</Link>
							<Link href="/become-a-host" className="link">
								Become a Host
							</Link>
						</div>
					)}
				</div>
				{isOnBecomeAHostPage ? (
					<div className="flex items-center gap-4">
						<Link href="/">Go to Homepage</Link>
					</div>
				) : (
					<div className="flex items-center gap-4">
						{user ? (
							<p className="font-medium capitalize text-neutral-900">{user.firstName}</p>
						) : (
							<Link href="/signin" className="link font-medium text-neutral-900">
								Log In
							</Link>
						)}
						{user ? (
							<Popover open={isOpen} onOpenChange={setIsOpen}>
								<PopoverTrigger asChild>
									<button className="flex h-14 items-center gap-3 rounded-[36px] border px-3">
										<Menu size={24} />
										<Avatar className="size-10 border bg-primary-100 text-white">
											<AvatarImage src={user.imageUrl} alt={user.firstName} />
											<AvatarFallback className="text-sm font-medium">
												{getInitials(`${user.firstName} ${user.lastName}`)}
											</AvatarFallback>
										</Avatar>
									</button>
								</PopoverTrigger>
								<PopoverContent className="w-[180px] bg-white p-0">
									<UserMenu onClose={() => setIsOpen(false)} />
								</PopoverContent>
							</Popover>
						) : (
							<Popover open={isOpen} onOpenChange={setIsOpen}>
								<PopoverTrigger asChild>
									<button className="flex h-14 items-center gap-3 rounded-[36px] border px-3">
										<Menu size={24} />
										<div className="grid size-10 place-items-center rounded-full bg-primary-100 text-white">
											<RiUserLine size={24} />
										</div>
									</button>
								</PopoverTrigger>
								<PopoverContent className="w-[180px] bg-white p-0">
									<UnuserMenu onClose={() => setIsOpen(false)} />
								</PopoverContent>
							</Popover>
						)}
					</div>
				)}
			</div>
		</nav>
	)
}
