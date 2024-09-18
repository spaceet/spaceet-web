import React from "react"

import { useGlobalStore } from "@/store/z-store"
import { locales } from "@/config"

export const LanguageSelector = () => {
	const { locale, setLocale } = useGlobalStore()

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="text-xl font-medium">Choose a region</h2>
			<div className="grid w-full grid-cols-5 gap-5">
				{locales.map((local, index) => (
					<button
						key={index}
						onClick={() => setLocale(local)}
						className={`flex w-full flex-col gap-1 rounded border p-2 text-xs font-medium transition-all hover:bg-neutral-200 ${local.code === locale.code ? "border-neutral-700" : "border-transparent"}`}>
						<p>{local.language}</p>
						<span className="flex items-center gap-1">{local.region}</span>
					</button>
				))}
			</div>
		</div>
	)
}
