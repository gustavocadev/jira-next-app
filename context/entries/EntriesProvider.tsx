import { FC, useEffect, useReducer } from "react"
import { Entry } from "../../interfaces"
import { EntriesContext, entriesReducer } from "./"
import { v4 as uuidv4 } from "uuid"
import { useSnackbar } from "notistack"

export type EntriesState = {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar()

  // actions
  const addNewEntry = async (description: string) => {
    const resp = await fetch(`${location.origin}/api/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    })

    const newEntry: Entry = await resp.json()

    dispatch({
      type: "ADD_ENTRY",
      payload: newEntry,
    })
  }

  const updateEntry = async (entry: Entry, showSnackbar = false) => {
    const resp = await fetch(`${location.origin}/api/entries/${entry._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: entry.description,
        status: entry.status,
      }),
    })

    const updatedEntry: Entry = await resp.json()

    dispatch({
      type: "ENTRY_UPDATED",
      payload: updatedEntry,
    })

    if (showSnackbar) {
      enqueueSnackbar(`Entry ${entry.description} updated`, {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    }
  }

  useEffect(() => {
    const refreshEntries = async () => {
      const resp = await fetch(`${location.origin}/api/entries`)
      const entries: Entry[] = await resp.json()

      dispatch({
        type: "REFRESH_DATA",
        payload: entries,
      })
      console.log(entries)
    }

    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
