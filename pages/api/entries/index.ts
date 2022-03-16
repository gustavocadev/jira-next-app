import type { NextApiRequest, NextApiResponse } from "next"
import { dbConnect, dbDisconnect } from "../../../database/db"
import { Entry, EntryType } from "../../../models"

type Data = { message: string } | EntryType[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res)

    case "POST":
      return postEntry(req, res)

    default:
      return res.status(400).json({
        message: "entrada no encontrada",
      })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await dbConnect()
  const entries = await Entry.find().sort({ createdAt: "ascending" })
  await dbDisconnect()

  res.status(200).json(entries)
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  })

  try {
    await dbConnect()
    await newEntry.save()
    await dbDisconnect()

    return res.status(200).json(newEntry)
  } catch (error) {
    await dbDisconnect()
    console.log(error)
    return res.status(500).json({
      message: "error al crear entrada",
    })
  }
}
