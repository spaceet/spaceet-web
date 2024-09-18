import "@/styles/globals.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { GoogleOAuthProvider } from "@react-oauth/google"
import type { AppProps } from "next/app"
import React from "react"

import { QueryProvider, SSRProvider } from "@/providers"
import { Toaster } from "@/components/ui/sonner"
import { Loader } from "@/components/shared"

const clientId = process.env.GOOGLE_CLIENT_ID ?? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<QueryProvider>
				<SSRProvider>
					<Loader />
					<Component {...pageProps} />
					<Toaster position="top-right" />
				</SSRProvider>
				<ReactQueryDevtools />
			</QueryProvider>
		</GoogleOAuthProvider>
	)
}
