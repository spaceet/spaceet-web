import { cva, VariantProps } from "class-variance-authority"
import { useRouter } from "next/router"
import React from "react"

import { cn } from "@/lib/utils"

interface Props extends VariantProps<typeof loaderVariants> {
	className?: string
}

const loaderVariants = cva("animate-spin", {
	variants: {
		variant: {
			primary: "fill-primary-100",
			white: "fill-white",
		},
		size: {
			sm: "size-10",
			md: "size-20",
			lg: "size-32",
			xl: "size-40",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
})

const useRouteChangeLoader = () => {
	const [loading, setLoading] = React.useState(false)
	const router = useRouter()
	const prevPathRef = React.useRef(router.asPath)

	const shouldShowLoader = React.useCallback((url: string) => {
		const currentPath = prevPathRef.current.split("?")[0]
		const nextPath = url.split("?")[0]
		return currentPath !== nextPath
	}, [])

	const handleStart = React.useCallback(
		(url: string) => {
			if (shouldShowLoader(url)) {
				setLoading(true)
			}
		},
		[shouldShowLoader]
	)

	const handleComplete = React.useCallback(() => {
		prevPathRef.current = router.asPath
		setLoading(false)
	}, [router.asPath])

	React.useEffect(() => {
		if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
			return
		}
		router.events.on("routeChangeStart", handleStart)
		router.events.on("routeChangeComplete", handleComplete)
		router.events.on("routeChangeError", handleComplete)

		return () => {
			router.events.off("routeChangeStart", handleStart)
			router.events.off("routeChangeComplete", handleComplete)
			router.events.off("routeChangeError", handleComplete)
		}
	}, [router, handleStart, handleComplete])

	return loading
}

export const Loader = () => {
	const loading = useRouteChangeLoader()
	return loading ? <Loading /> : null
}

export const Loading = React.memo(({ className, size, variant }: Props) => {
	return (
		<div
			aria-label="loading"
			role="spinbutton"
			className="fixed left-0 top-0 !z-50 grid h-screen w-screen place-items-center bg-white">
			<svg className={cn(loaderVariants({ className, size, variant }))} viewBox="3 3 18 18">
				<path
					className="opacity-20"
					d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
				<path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
			</svg>
		</div>
	)
})

Loading.displayName = "Loading"
