import { useReducer } from "react"
import { UIContext } from "./"
import { UIReducer } from "./"

export type UIState = {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

  // actions - functions
  const openSideMenu = () => dispatch({ type: "OPEN_SIDEBAR" })

  const closeSideMenu = () => dispatch({ type: "CLOSE_SIDEBAR" })

  const setIsAddingEntry = (isAddingEntry: boolean) => {
    dispatch({
      type: "IS_ADDING_ENTRY",
      payload: isAddingEntry,
    })
  }

  const startDragging = () => dispatch({ type: "DRAG_START" })

  const endDragging = () => dispatch({ type: "DRAG_END" })

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export { UIProvider }
