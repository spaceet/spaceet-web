import { Html, Head, Main, NextScript } from "next/document"

const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<GoogleAnalytics />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

const GoogleAnalytics = () => {
	if (process.env.NODE_ENV !== "production") return null

	return (
		<>
			<script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${trackingId}');
          `,
				}}></script>
		</>
	)
}
