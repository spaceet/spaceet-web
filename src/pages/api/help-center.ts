import type { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import fs from "fs"

import { HttpResponse } from "@/types"

type Data = {
	slug: string
	markdownWithMeta: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<HttpResponse<Data | null>>
) {
	try {
		const { slug } = req.query

		const files = fs.readdirSync(path.join(process.cwd(), "src/md"))
		const markdowns: Data[] = files.map((file) => {
			const slug = file.replace(".md", "")
			const markdownWithMeta = fs.readFileSync(path.join(process.cwd(), "src/md", file), "utf-8")
			const markdown: Data = { slug, markdownWithMeta }
			return markdown
		})

		const data = markdowns.find((markdown) => markdown.slug === slug)

		if (!data) {
			return res.status(400).json({
				data: null,
				message: "Success",
				status: 400,
				success: false,
			})
		}

		res.status(200).json({
			data,
			message: "Success",
			status: 200,
			success: true,
		})
	} catch (error) {
		res.status(500).json({
			data: null,
			message: "Internal Server Error",
			status: 500,
			success: false,
		})
	}
}
