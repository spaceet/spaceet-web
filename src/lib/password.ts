export type ValidatePasswordProps = {
	uppercase: boolean
	number: boolean
	length: boolean
}

export const validatePassword = (password: string): ValidatePasswordProps => {
	const length = /.{8,}/g
	const number = /[0-9]/g
	const uppercase = /[A-Z]/g

	return {
		length: length.test(password),
		number: number.test(password),
		uppercase: uppercase.test(password),
	}
}
