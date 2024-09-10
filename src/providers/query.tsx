import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

const cacheTime = 1000 * 60 // 1 minute

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: cacheTime,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
})

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
