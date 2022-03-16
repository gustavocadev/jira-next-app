import { List, Paper } from "@mui/material"
import EntryCard from "./EntryCard"
import { EntryStatus } from "../../interfaces/entry"
import { DragEvent, useContext, useMemo } from "react"
import { EntriesContext } from "../../context/entries/EntriesContext"
import { UIContext } from "../../context/ui"
import styles from "./EntryList.module.css"

type Props = {
  status: EntryStatus
}

const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  )

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text/plain")
    console.log(id)

    const entry = entries.find((entry) => entry._id === id)!
    updateEntry({ ...entry, status })
    endDragging()
  }

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  return (
    <section
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List
          sx={{
            transition: "opacity 0.2s ease-in-out",
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </section>
  )
}

export default EntryList
