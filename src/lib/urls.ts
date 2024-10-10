export const sanitizeQueryParams = <T>(values: { [key: string]: string | number }): T => {
	type Value = keyof typeof values
	Object.keys(values).forEach((key) => {
		if (
			!values[key as Value] ||
			values[key as Value] === "" ||
			values[key as Value] === 0 ||
			values[key as Value] === "undefined"
		) {
			delete values[key as Value]
		}
	})
	return values as T
}
