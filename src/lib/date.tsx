export const getMonthInWords = (date: Date | string) => {
	return new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(date))
}
