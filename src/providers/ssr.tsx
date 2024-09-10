import React, { PropsWithChildren } from "react"

const canUseDOM = Boolean(
	typeof window !== "undefined" && window?.document && window?.document?.createElement
)

interface SSRContextProps {
	isServer: boolean
	isClient: boolean
}

const defaultSSRContext: SSRContextProps = {
	isServer: !canUseDOM,
	isClient: canUseDOM,
}

const SSRContext = React.createContext<SSRContextProps>(defaultSSRContext)

export const SSRProvider: React.FC<PropsWithChildren & {}> = (props) => {
	const { children } = props

	/* Copy the default context so that strict equality checks against the context value are false. */
	const ctx = { ...defaultSSRContext }

	return <SSRContext.Provider value={ctx}>{children}</SSRContext.Provider>
}

export function useSSR() {
	const ctx = React.useContext(SSRContext)
	const isInSSRContext = ctx !== defaultSSRContext
	const [isHydrating, setIsHydrating] = React.useState(canUseDOM && isInSSRContext)

	if (canUseDOM) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useLayoutEffect(() => setIsHydrating(false), [])
	}

	return { ...ctx, isHydrating }
}
