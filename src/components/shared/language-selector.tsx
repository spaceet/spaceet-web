import React from "react"

import { useGlobalStore } from "@/store/z-store"
import { locales } from "@/config"

export const LanguageSelector = () => {
	const { language, setLanguage } = useGlobalStore()

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="text-xl font-medium">Choose a region</h2>
			<div className="grid w-full grid-cols-5 gap-5">
				{locales.map((locale, index) => (
					<button
						key={index}
						onClick={() => setLanguage(locale.code)}
						className={`flex w-full flex-col gap-1 rounded border p-2 text-xs font-medium transition-all hover:bg-neutral-200 ${language === locale.code ? "border-neutral-700" : "border-transparent"}`}>
						<p>{locale.language}</p>
						<span className="flex items-center gap-1">{locale.region}</span>
					</button>
				))}
			</div>
		</div>
	)
}
