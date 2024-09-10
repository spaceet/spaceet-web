import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-900 group-[.toaster]:border-gray-300 group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-neutral-400",
					actionButton: "group-[.toast]:bg-primary-100 group-[.toast]:text-white",
					cancelButton: "group-[.toast]:bg-neutral-40 group-[.toast]:text-neutral-900",
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
