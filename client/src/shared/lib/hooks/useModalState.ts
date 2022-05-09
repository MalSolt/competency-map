import { useState } from "react"

export const useModalState = <T>(defaultValue = false) => {
  const [open, setOpen] = useState(defaultValue);
  const [data, setData] = useState<T | null>(null);
  
  const handleOpen = (payload: T) => {
    setOpen(true);

    if (payload) {
      setData(payload);
    }
  }

  const handleClose = () => {
    setOpen(false);

    if (data !== null) {
      setData(null);
    }
  }

  return {
    open,
    data,
    setOpen: handleOpen,
    setClose: handleClose,
  }
}