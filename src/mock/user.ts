import { generateUuid } from "@/lib"
import { UserProps } from "@/types"

export const mock_user: UserProps = {
	id: generateUuid(),
	bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc nec ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nunc nisl sit amet nunc. Sed euismod, nunc nec ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nunc nisl sit amet nunc.",
	createdAt: "2024-09-11T00:00:00.000Z",
	deletedAt: null,
	first_name: "Samson",
	last_name: "Okunola",
	email: "john.doe@example.com",
	phoneNumber: "+1234567890",
	profile_image:
		"https://images.unsplash.com/photo-1701025812558-ca9ca4e24d71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXIlMjBjYXJ0b29ufGVufDB8fDB8fHww",
	isVerified: true,
	role: "user",
	updatedAt: null,
	rating: 0,
}
