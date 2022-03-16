import { createContext } from "react"

export type UIContextType = {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
  setIsAddingEntry: (isAddingEntry: boolean) => void
  startDragging: () => void
  endDragging: () => void
}

const UIContext = createContext({} as UIContextType)

export { UIContext }
