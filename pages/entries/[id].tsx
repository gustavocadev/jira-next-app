import Layout from "../../components/layouts/Layout"
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { Button, IconButton } from "@mui/material"
import { EntryStatus, Entry } from "../../interfaces/entry"
import { ChangeEvent, useState, useMemo, useContext } from "react"
import { dbEntries } from "../../database"
import {
  Grid,
  CardHeader,
  Card,
  CardContent,
  TextField,
  CardActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
} from "@mui/material"
import { GetServerSideProps } from "next"
import { EntriesContext } from "../../context/entries"
import { getFormatDistanceToNow } from "../../utils/dateFunctions"

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]

type Props = {
  entry: Entry
}

export default function EntryPage({ entry }: Props) {
  // console.log(entry)
  const { updateEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => {
    return inputValue.length <= 0 && touched
  }, [inputValue, touched])

  const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const handleSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,

      description: inputValue,
    }

    updateEntry(updatedEntry, true)
  }

  return (
    <Layout title={`${inputValue.substring(0, 20)}...`}>
      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              // title={`Entrada: ${inputValue}`}
              subheader={`Creada ${getFormatDistanceToNow(entry.createdAt)}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextFieldChanged}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && `Ingrese un valor`}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => {
                    return (
                      <FormControlLabel
                        key={option}
                        value={option}
                        label={capitalize(option)}
                        control={<Radio />}
                      />
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={handleSave}
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as {
    id: string
  }
  const entry = await dbEntries.getEntryById(id)
  // Entry

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  return {
    props: {
      entry,
    },
  }
}
