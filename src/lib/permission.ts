import { UserProps } from "@/types"

enum PermissionLevel {
	Create = "Create",
	Delete = "Delete",
	Edit = "Edit",
	View = "View",
}

type PermissionProps = {
	HOST: PermissionLevel[]
	USER: PermissionLevel[]
}

const RolePermissions: PermissionProps = {
	HOST: [PermissionLevel.Create, PermissionLevel.Delete, PermissionLevel.Edit, PermissionLevel.View],
	USER: [PermissionLevel.View],
}

interface HasPermission {
	user: UserProps
	permission: PermissionLevel
}

const hasPermission = ({ user, permission }: HasPermission) => {
	const permissions = RolePermissions[user.user_type]
	return permissions.includes(permission)
}

export { PermissionLevel, RolePermissions, hasPermission }
