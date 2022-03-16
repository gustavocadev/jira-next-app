import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import { useState, useContext } from "react"
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"
type Props = {}

const NewEntry = (props: Props) => {
  // const [isAdding, setIsAdding] = useState(false)
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext)
  const [inputValue, setInputValue] = useState("")
  const [touched, setTouched] = useState(false)
  const { addNewEntry } = useContext(EntriesContext)

  const onSave = () => {
    if (inputValue.length <= 0) {
      return
    }
    addNewEntry(inputValue)
    setInputValue("")
    setIsAddingEntry(false)
    setTouched(false)
  }
  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 1,
      }}
    >
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={
              inputValue.length <= 0 &&
              touched &&
              "Escribe aquí tu nueva entrada"
            }
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  )
}

export default NewEntry
