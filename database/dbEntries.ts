import mongoose from "mongoose"
import { Entry, EntryType } from "../models"
import { dbConnect, dbDisconnect } from "./db"
export const getEntryById = async (id: string): Promise<EntryType | null> => {
  if (!mongoose.isValidObjectId(id)) return null

  await dbConnect()

  const entry = await Entry.findById(id).lean()

  await dbDisconnect()

  return JSON.parse(JSON.stringify(entry))
}
