import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/z-store"
import { user_links } from "@/config"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
	onClose: () => void
}

export const UserMenu = ({ onClose }: Props) => {
	const [open, setOpen] = React.useState(false)
	const { signOut } = useUserStore()

	return (
		<div className="flex w-full flex-col">
			{user_links.map((link, index) => {
				if (!link.url) {
					return (
						<Dialog key={index} open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<button className="flex items-center gap-2 px-[10px] py-3 text-sm capitalize text-red-700 first:rounded-t-md last:rounded-b-md hover:bg-red-100">
									<link.icon size={20} />
									{link.label}
								</button>
							</DialogTrigger>
							<DialogContent className="w-[400px]">
								<DialogTitle>Logout</DialogTitle>
								<DialogDescription>Are you sure you want to logout?</DialogDescription>
								<div className="my-4 grid w-full grid-cols-2 gap-5">
									<Button onClick={() => setOpen(false)}>Cancel</Button>
									<Button onClick={() => signOut()} variant="destructive">
										Logout
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					)
				} else {
					return (
						<Link
							key={index}
							href={link.url}
							onClick={onClose}
							className="flex items-center gap-2 px-[10px] py-3 text-sm capitalize text-neutral-900 first:rounded-t-md last:rounded-b-md hover:bg-neutral-200">
							<link.icon size={20} />
							{link.label}
						</Link>
					)
				}
			})}
		</div>
	)
}
