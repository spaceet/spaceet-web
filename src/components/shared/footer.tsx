import React from "react"

import { social_links } from "@/config"

export const Footer = () => {
	return (
		<footer role="contentinfo" className="w-screen bg-primary-100 py-5">
			<div className="container mx-auto"></div>
			<div className="container mx-auto flex items-center justify-between text-xs font-medium text-neutral-100">
				<p>&copy;{new Date().getFullYear()}. Spaceet. All right reserved.</p>
				<div className="flex items-center gap-4">
					{social_links.map((link) => (
						<a key={link.name} href={link.url} target="_blank" className="capitalize">
							{link.name}
						</a>
					))}
				</div>
			</div>
		</footer>
	)
}
