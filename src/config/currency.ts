export const currencies = [
	{
		name: "United States dollar",
		code: "USD",
		symbol: "$",
	},
	{
		name: "Euro",
		code: "EUR",
		symbol: "€",
	},
	{
		name: "British pound",
		code: "GBP",
		symbol: "£",
	},
	{
		name: "Nigerian naira",
		code: "NGN",
		symbol: "₦",
	},
	{
		name: "UAE dirham",
		code: "AED",
		symbol: "د.إ",
	},
	{
		name: "Australian dollar",
		code: "AUD",
		symbol: "$",
	},
	{
		name: "Brazilian real",
		code: "BRL",
		symbol: "R$",
	},
	{
		name: "Canadian dollar",
		code: "CAD",
		symbol: "$",
	},
	{
		name: "Swiss franc",
		code: "CHF",
		symbol: "Fr",
	},
	{
		name: "Chinese yuan",
		code: "CNY",
		symbol: "¥",
	},
	{
		name: "Chilean peso",
		code: "CLP",
		symbol: "$",
	},
	{
		name: "Colombian peso",
		code: "COP",
		symbol: "$",
	},
	{
		name: "Czech koruna",
		code: "CZK",
		symbol: "Kč",
	},
	{
		name: "Danish krone",
		code: "DKK",
		symbol: "kr",
	},
	{
		name: "Hong Kong dollar",
		code: "HKD",
		symbol: "$",
	},
	{
		name: "Hungarian forint",
		code: "HUF",
		symbol: "Ft",
	},
	{
		name: "Indonesian rupiah",
		code: "IDR",
		symbol: "Rp",
	},
	{
		name: "Israeli new shekel",
		code: "ILS",
		symbol: "₪",
	},
	{
		name: "Indian rupee",
		code: "INR",
		symbol: "₹",
	},
	{
		name: "Japanese yen",
		code: "JPY",
		symbol: "¥",
	},
	{
		name: "South Korean won",
		code: "KRW",
		symbol: "₩",
	},
	{
		name: "Mexican peso",
		code: "MXN",
		symbol: "$",
	},
	{
		name: "Malaysian ringgit",
		code: "MYR",
		symbol: "RM",
	},
	{
		name: "Norwegian krone",
		code: "NOK",
		symbol: "kr",
	},
	{
		name: "New Zealand dollar",
		code: "NZD",
		symbol: "$",
	},
	{
		name: "Philippine peso",
		code: "PHP",
		symbol: "₱",
	},
	{
		name: "Polish zloty",
		code: "PLN",
		symbol: "zł",
	},
	{
		name: "Romanian leu",
		code: "RON",
		symbol: "lei",
	},
	{
		name: "Russian ruble",
		code: "RUB",
		symbol: "₽",
	},
	{
		name: "Saudi riyal",
		code: "SAR",
		symbol: "﷼",
	},
	{
		name: "Swedish krona",
		code: "SEK",
		symbol: "kr",
	},
	{
		name: "Singapore dollar",
		code: "SGD",
		symbol: "$",
	},
	{
		name: "Thai baht",
		code: "THB",
		symbol: "฿",
	},
	{
		name: "Turkish lira",
		code: "TRY",
		symbol: "₺",
	},
	{
		name: "South African rand",
		code: "ZAR",
		symbol: "R",
	},
] as const

export const currencyCodes = currencies.map((item) => item.code)
