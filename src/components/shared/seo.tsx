import { useRouter } from "next/router"
import Head from "next/head"

const APP_URL = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL
const DEFAULT_OG_IMAGE = ""

interface SeoProps {
	readonly title?: string
	readonly description?: string
	readonly siteName?: string
	readonly canonical?: string
	readonly ogImage?: string
	readonly ogType?: string
	readonly twitterHandle?: string
	readonly noIndex?: boolean
}

export function Seo({
	title = "",
	description = "",
	siteName = "Spaceet Apartments",
	canonical = APP_URL,
	ogImage = DEFAULT_OG_IMAGE,
	ogType = "website",
	twitterHandle = "SpaceetHq",
	noIndex = false,
}: SeoProps) {
	const router = useRouter()
	const isHome = router.pathname === "/"

	return (
		<Head>
			<>
				<title>{`${title ? `${title} |` : ""} ${siteName}`}</title>
				<meta name="description" content={description} />
				<meta
					name="keywords"
					content="data data science ai machine learning neural networks learn ai learn machine learning fun learning gamified learning"
				/>
				<meta name="author" content="Spaceet" />
				<link rel="canonical" href="https://spaceet.com" />

				<meta key="og_type" property="og:type" content={ogType} />
				<meta key="og_title" property="og:title" content={title} />
				<meta key="og_description" property="og:description" content={description} />
				<meta key="og_locale" property="og:locale" content="en_IE" />
				<meta key="og_site_name" property="og:site_name" content={siteName} />
				<meta key="og_url" property="og:url" content={canonical ?? APP_URL} />
				<meta key="og_site_name" property="og:site_name" content={siteName} />
				<meta key="og_image" property="og:image" content={ogImage ?? DEFAULT_OG_IMAGE} />
				<meta key="og_image:alt" property="og:image:alt" content={`${title} | ${siteName}`} />
				<meta key="og_image:width" property="og:image:width" content="1200" />
				<meta key="og_image:height" property="og:image:height" content="630" />

				<meta name="robots" content="index,follow" />
				<meta name="apple-mobile-web-app-title" content="Spaceet" />
				<meta name="keywords" content="Spaceet" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta content="IE=edge" httpEquiv="X-UA-Compatible" />
				<meta content="" name="theme-color" />
				<meta content="" name="msapplication-TileColor" />

				<meta key="twitter:card" name="twitter:card" content="summary_large_image" />
				<meta key="twitter:site" name="twitter:site" content={twitterHandle} />
				<meta key="twitter:creator" name="twitter:creator" content={twitterHandle} />
				<meta key="twitter:title" property="twitter:title" content={title} />
				<meta key="twitter:description" property="twitter:description" content={description} />

				<meta key="twitter:domain" name="twitter:domain" content={APP_URL} />

				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />

				{noIndex && <meta name="robots" content="noindex,follow" />}
				{isHome && (
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: `
                ${JSON.stringify({
																	"@context": "http://schema.org",
																	"@type": "WebApplication",
																	name: "Spaceet",
																	url: "https://spaceet.com",
																	applicationCategory: "BusinessApplication",
																	operatingSystem: "Any",
																	description: "",
																	features: "",
																	screenshot: "https://www.spaceet.com/meta/screenshot.jpg",
																	creator: {
																		"@type": "Organization",
																		name: "Spaceet",
																		url: "https://spaceet.com",
																	},
																})}
                `,
						}}
					/>
				)}
			</>

			<link rel="canonical" href={canonical ?? APP_URL} />
		</Head>
	)
}
