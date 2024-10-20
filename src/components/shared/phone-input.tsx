import { CountryCode, parsePhoneNumber, formatNumber } from "libphonenumber-js"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { countries } from "@/config"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onPhoneNumberChange: (phoneNumber: string) => void
	error?: string
	label?: string
	wrapperClassName?: string
}

const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, error, label, onPhoneNumberChange, required, type, wrapperClassName, ...props },
		ref
	) => {
		const nigeria = countries.find((country) => country.code === "NG")
		const [selectedCountry, setSelectedCountry] = React.useState(nigeria || countries[0])
		const containerRef = React.useRef<HTMLDivElement>(null)!
		const [inputValue, setInputValue] = React.useState("")
		const [isOpen, setIsOpen] = React.useState(false)

		const sorted = React.useMemo(
			() => [...countries].sort((a, b) => a.dial_code.localeCompare(b.dial_code)),
			[]
		)

		const handlePhoneNumberChange = React.useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value
				setInputValue(value)
				const phoneNumber = parsePhoneNumber(value, selectedCountry.code as CountryCode)
				const formatted = formatNumber(phoneNumber.number, "INTERNATIONAL")
				onPhoneNumberChange(formatted)
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[inputValue, selectedCountry.dial_code]
		)

		React.useEffect(() => {
			if (inputValue) {
				const phoneNumber = parsePhoneNumber(inputValue, selectedCountry.code as CountryCode)
				const formatted = formatNumber(phoneNumber.number, "INTERNATIONAL")
				onPhoneNumberChange(formatted)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [inputValue, selectedCountry.dial_code])

		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}

		React.useEffect(() => {
			document.addEventListener("mousedown", handleClickOutside)
			return () => document.removeEventListener("mousedown", handleClickOutside)
		})

		return (
			<div className={cn("flex w-full flex-col gap-2", wrapperClassName)}>
				{label && (
					<label htmlFor={props.id ?? props.name} className="text-sm font-medium text-neutral-800">
						{label} {required && <span className="text-red-500">*</span>}
					</label>
				)}
				<div className="flex h-[45px] w-full items-center">
					<div className="relative h-full w-24">
						<button
							type="button"
							className="flex h-full w-24 items-center justify-center gap-1 rounded-l-md border border-r-0 border-neutral-400 bg-transparent px-3 py-2 text-xs focus:outline-none"
							onClick={() => setIsOpen(!isOpen)}>
							<span
								className="size-5 rounded-full border bg-cover"
								style={{
									backgroundImage: `url(https://flagsapi.com/${selectedCountry.code}/flat/64.png)`,
								}}></span>
							{selectedCountry.dial_code}
							<ChevronDown
								className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
								size={14}
							/>
						</button>
						{isOpen && (
							<div
								ref={containerRef}
								className="absolute z-10 mt-1 max-h-60 w-36 overflow-auto rounded-md border bg-white shadow-lg">
								{sorted.map((country, index) => (
									<button
										key={index}
										type="button"
										className="flex w-full items-center px-3 py-2 text-sm hover:bg-neutral-100"
										onClick={() => {
											setSelectedCountry(country)
											setIsOpen(false)
										}}>
										<span
											className="mr-2 size-5 rounded-full border bg-cover"
											style={{
												backgroundImage: `url(https://flagsapi.com/${country.code}/flat/64.png)`,
											}}></span>
										<span>{country.dial_code}</span>
									</button>
								))}
							</div>
						)}
					</div>
					<input
						type="tel"
						className={cn(
							"flex h-full w-full rounded-md rounded-l-none border border-neutral-400 bg-transparent px-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							className
						)}
						value={inputValue}
						onChange={handlePhoneNumberChange}
						ref={ref}
						inputMode="tel"
						{...props}
					/>
				</div>
				{error && <span className="text-xs font-medium text-error-400">{error}</span>}
			</div>
		)
	}
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
