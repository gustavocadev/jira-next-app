import { UIState } from "./UIProvider"

type UIActionType =
  | { type: "OPEN_SIDEBAR" }
  | { type: "CLOSE_SIDEBAR" }
  | {
      type: "IS_ADDING_ENTRY"
      payload: boolean
    }
  | { type: "DRAG_START" }
  | { type: "DRAG_END" }

const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return {
        ...state,
        sideMenuOpen: true,
      }
    case "CLOSE_SIDEBAR":
      return {
        ...state,
        sideMenuOpen: false,
      }
    case "IS_ADDING_ENTRY":
      return {
        ...state,
        isAddingEntry: action.payload,
      }
    case "DRAG_START":
      return {
        ...state,
        isDragging: true,
      }
    case "DRAG_END":
      return {
        ...state,
        isDragging: false,
      }
    default:
      return state
  }
}

export { UIReducer }
