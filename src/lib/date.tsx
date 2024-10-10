export const getMonthInWords = (date: Date | string) => {
	return new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(date))
}

export const getTimeFromNow = (date: Date | string) => {
	const now = new Date()
	const diffInMilliseconds = now.getTime() - new Date(date).getTime()

	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const month = day * 30
	const year = month * 12

	if (diffInMilliseconds < minute) {
		return `${Math.floor(diffInMilliseconds / second)} seconds ago`
	} else if (diffInMilliseconds < hour) {
		return `${Math.floor(diffInMilliseconds / minute)} minutes ago`
	} else if (diffInMilliseconds < day) {
		return `${Math.floor(diffInMilliseconds / hour)} hours ago`
	} else if (diffInMilliseconds < month) {
		return `${Math.floor(diffInMilliseconds / day)} days ago`
	} else if (diffInMilliseconds < year) {
		return `${Math.floor(diffInMilliseconds / month)} months ago`
	} else {
		return `${Math.floor(diffInMilliseconds / year)} years ago`
	}
}
