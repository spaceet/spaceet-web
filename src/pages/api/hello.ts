// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	name: string
	description: string
	url: string
	version: string
}

export default function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json({
		name: "Spaceet",
		description: "Spaceet API",
		url: "https://spaceet.com",
		version: "1.0.0",
	})
}
