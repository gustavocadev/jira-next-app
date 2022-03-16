import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import React, { DragEvent } from "react"
import { Entry } from "../../interfaces/entry"
import { useContext } from "react"
import { UIContext } from "../../context/ui"
import { useRouter } from "next/router"
import { getFormatDistanceToNow } from "../../utils/dateFunctions"

type Props = {
  entry: Entry
}

const EntryCard = ({ entry }: Props) => {
  const { startDragging, endDragging } = useContext(UIContext)

  const router = useRouter()

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", entry._id)
    startDragging()
  }

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    // todo: cancelar on drag
    endDragging()
  }

  const handleClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      onClick={handleClick}
      sx={{
        marginBottom: 1,
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            paddingRight: 2,
          }}
        >
          <Typography variant="body2">
            {getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default EntryCard
