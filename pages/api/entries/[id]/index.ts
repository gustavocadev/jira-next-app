import type { NextApiRequest, NextApiResponse } from "next"
import { dbConnect, dbDisconnect } from "../../../../database/db"
import { Entry } from "../../../../models"
import { EntryType } from "../../../../models/Entry"

type Data =
  | {
      message: string
    }
  | EntryType

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { id } = req.query

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({
  //     message: "id no valido",
  //   })
  // }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res)

    case "GET":
      return getEntry(req, res)

    default:
      return res.status(200).json({ message: "Método no existe" })
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    await dbConnect()
    const entries = await Entry.findById(id)
    await dbDisconnect()
    res.status(200).json(entries)
  } catch (error) {
    await dbDisconnect()
    console.log(error)
    res.status(500).json({
      message: "error al obtener entrada",
    })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  await dbConnect()

  const entryToUpdate = await Entry.findById(id)

  if (!entryToUpdate) {
    await dbDisconnect()
    return res.status(404).json({
      message: "entrada no encontrada, no existe",
    })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { new: true, nunValidators: true }
    )
    await dbDisconnect()
    res.status(200).json(updatedEntry!)
  } catch (error) {
    await dbDisconnect()
    console.log(error)
    res.status(500).json({
      message: "error al actualizar entrada",
    })
  }

  await dbDisconnect()
}
