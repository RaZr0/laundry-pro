// components/providers/dialog-provider.tsx
"use client"

import {
    Dialog
} from "@/components/ui/dialog"
import { createContext, ReactNode, useContext, useState } from "react"

type DialogContextType = {
  openDialog: (content: ReactNode) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) throw new Error("useDialog must be used within a DialogProvider")
  return context
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<ReactNode>(null)

  const openDialog = (content: ReactNode) => {
    setContent(content)
    setOpen(true)
  }

  const closeDialog = () => setOpen(false)

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        {content}
      </Dialog>
    </DialogContext.Provider>
  )
}
