import { initReactI18next } from "react-i18next"
import i18n from "i18next"

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				"Welcome to React": "Welcome to React and react-i18next",
			},
		},
	},
	lng: "en",
	fallbackLng: "en",
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
})
