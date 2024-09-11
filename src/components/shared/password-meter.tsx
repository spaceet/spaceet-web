import { Check, X } from "lucide-react"
import React from "react"

import { ValidatePasswordProps, validatePassword } from "@/lib"

interface Props {
	password: string
}

const readers = {
	uppercase: "At least 1 uppercase",
	number: "At least 1 number",
	length: "At least 8 characters",
} as const

export const PasswordMeter = ({ password }: Props) => {
	const [passwordStrength, setPasswordStrength] = React.useState<ValidatePasswordProps>({
		length: false,
		number: false,
		uppercase: false,
	})

	React.useEffect(() => {
		setPasswordStrength(validatePassword(password))
	}, [password])

	return (
		<div className="flex w-full flex-col gap-2">
			<div className="grid w-full grid-cols-3 gap-2">
				{Object.values(passwordStrength)
					.reverse()
					.map((value, index) => (
						<div
							key={index}
							className={`h-1 w-full rounded ${value ? "bg-green-500" : "bg-neutral-400"}`}></div>
					))}
			</div>
			<p className="text-neutral-600">Strong password must contain at least:</p>
			<div className="flex flex-col gap-2">
				{Object.keys(passwordStrength)
					.reverse()
					.map((key, index) => (
						<div key={index} className="flex items-center gap-1">
							<div
								className={`grid place-items-center rounded-full p-1 text-white ${passwordStrength[key as keyof ValidatePasswordProps] ? "bg-green-500" : "bg-neutral-400"}`}>
								{passwordStrength[key as keyof ValidatePasswordProps] ? (
									<Check size={10} />
								) : (
									<X size={10} />
								)}
							</div>
							<span className="text-sm text-neutral-600">{readers[key as keyof typeof readers]}</span>
						</div>
					))}
			</div>
		</div>
	)
}
