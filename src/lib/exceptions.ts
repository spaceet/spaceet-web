import React from "react"

export abstract class UIError<E extends string = string> extends Error {
	__proto__ = Error

	public code: `SPACEET.${E}`

	constructor(code: E, message: string, source: string | React.FC<unknown>) {
		super(message)

		const label =
			typeof source === "string" ? source : source.displayName ? `<${source.displayName}>` : undefined

		this.code = `SPACEET.${code.toUpperCase()}` as `SPACEET.${E}`
		this.message = label ? `[SPACEET > ${label}] ${message}` : `[SPACEET] ${message}`

		Object.setPrototypeOf(this, UIException.prototype)
	}
}

export class UIException<E extends string = string> extends UIError<E> {
	__proto__ = Error

	constructor(code: E, message: string, source: string | React.FC<unknown>) {
		super(code, message, source)
	}
}

export const createErrorWithCode = <E extends string>(
	code: E,
	message: string,
	source: string | React.FC<unknown>
): UIError<E> => {
	return new UIException(code, message, source)
}

export const createError = (
	message: string,
	source: string | React.FC<unknown>
): UIError<"ERROR"> => {
	return new UIException("ERROR", message, source)
}
