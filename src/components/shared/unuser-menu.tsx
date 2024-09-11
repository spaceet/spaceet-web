import Link from "next/link"
import React from "react"

import { unuser_links } from "@/config"

interface Props {
	onClose: () => void
}

export const UnuserMenu = ({ onClose }: Props) => {
	return (
		<div className="flex w-full flex-col">
			{unuser_links.map((link, index) => (
				<Link
					key={index}
					href={link.url}
					onClick={onClose}
					className="flex items-center gap-2 px-[10px] py-3 text-sm capitalize text-neutral-900 first:rounded-t-md last:rounded-b-md hover:bg-neutral-200">
					<link.icon size={20} />
					{link.label}
				</Link>
			))}
		</div>
	)
}
