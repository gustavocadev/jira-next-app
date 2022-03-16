// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Entry } from "../../models"
import { seedData, dbConnect, dbDisconnect } from "../../database"

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Unauthorized" })
  }

  await dbConnect()
  await Entry.deleteMany()
  await Entry.insertMany(seedData.entries)

  await dbDisconnect()

  res.status(200).json({
    message: "proceso realizado correctamente",
  })
}
