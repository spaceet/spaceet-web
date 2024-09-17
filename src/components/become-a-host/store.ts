import { createPersistMiddleware } from "@/store/middleware"

import {
	DocumentFormProps,
	IdentityFormProps,
	ProfileFormProps,
	PropertyFormProps,
	RulesFormProps,
	UploadFormProps,
	UtilitiesFormProps,
} from "./form-components"

interface CreateHostStore {
	personalInformation: ProfileFormProps
	setPersonalInformation: (personalInformation: ProfileFormProps) => void
	identityVerification: IdentityFormProps
	setIdentityVerification: (identityVerification: IdentityFormProps) => void
	propertyDetails: PropertyFormProps
	setPropertyDetails: (propertyDetails: PropertyFormProps) => void
	uploadPhotos: UploadFormProps
	setUploadPhotos: (uploadPhotos: UploadFormProps) => void
	verifyProperty: DocumentFormProps
	setVerifyProperty: (verifyProperty: DocumentFormProps) => void
	utilities: UtilitiesFormProps
	setUtilities: (utilities: UtilitiesFormProps) => void
	rules: RulesFormProps
	setRules: (rules: RulesFormProps) => void
}

const initialState: CreateHostStore = {
	personalInformation: {
		address: "",
		bio: "",
		city: "",
		firstName: "",
		image: null,
		lastName: "",
		phoneNumber: "",
		state: "",
	},
	setPersonalInformation: () => {},
	identityVerification: {
		idExpiry: "",
		idImages: [],
		idNumber: "",
		idType: "bankVerificationNumber",
	},
	setIdentityVerification: () => {},
	propertyDetails: {
		address: "",
		bedrooms: 0,
		bathrooms: 0,
		city: "",
		description: "",
		name: "",
		price: 0,
		propertyType: "",
		serviceCharge: 0,
		state: "",
		postalCode: "",
	},
	setPropertyDetails: () => {},
	uploadPhotos: {
		images: [],
	},
	setUploadPhotos: () => {},
	verifyProperty: {
		documentImages: [],
		documentType: "",
	},
	setVerifyProperty: () => {},
	utilities: {
		utilities: [],
	},
	setUtilities: () => {},
	rules: {
		checkIn: [],
		checkOut: "",
		customRules: [],
		events: false,
		filming: false,
		maxGuests: 0,
		pets: false,
		quietHours: false,
		smoking: false,
	},
	setRules: () => {},
}

const useCreateHostStore = createPersistMiddleware<CreateHostStore>("become-a-host", (set) => ({
	...initialState,
	setPersonalInformation: (personalInformation) => set({ personalInformation }),
	setIdentityVerification: (identityVerification) => set({ identityVerification }),
	setPropertyDetails: (propertyDetails) => set({ propertyDetails }),
	setUploadPhotos: (uploadPhotos) => set({ uploadPhotos }),
	setVerifyProperty: (verifyProperty) => set({ verifyProperty }),
	setUtilities: (utilities) => set({ utilities }),
	setRules: (rules) => set({ rules }),
}))

export { useCreateHostStore }
