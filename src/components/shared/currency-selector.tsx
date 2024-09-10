import React from "react"

import { useGlobalStore } from "@/store/z-store"
import { currencies } from "@/config"

export const CurrencySelector = () => {
	const { currency, setCurrency } = useGlobalStore()
	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="text-xl font-medium">Choose a currency</h2>
			<div className="grid w-full grid-cols-5 gap-5">
				{currencies.map((item) => (
					<button
						key={item.code}
						onClick={() => setCurrency(item.code)}
						className={`flex w-full flex-col gap-1 rounded border p-2 text-xs font-medium transition-all hover:bg-neutral-200 ${currency === item.code ? "border-neutral-700" : "border-transparent"}`}>
						<p>{item.name}</p>
						<span className="flex items-center gap-1">
							{item.code} - {item.symbol}
						</span>
					</button>
				))}
			</div>
		</div>
	)
}
