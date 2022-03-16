import { Entry } from "../../interfaces"
import { EntriesState } from "./"

type EntriesActionType =
  | {
      type: "ADD_ENTRY"
      payload: Entry
    }
  | {
      type: "ENTRY_UPDATED"
      payload: Entry
    }
  | {
      type: "REFRESH_DATA"
      payload: Entry[]
    }

const entriesReducer = (state: EntriesState, action: EntriesActionType) => {
  switch (action.type) {
    case "ADD_ENTRY":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      }

    case "ENTRY_UPDATED":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status
            entry.description = action.payload.description
          }
          return entry
        }),
      }

    case "REFRESH_DATA":
      return {
        ...state,
        entries: [...action.payload],
      }

    default:
      return state
  }
}

export { entriesReducer }
