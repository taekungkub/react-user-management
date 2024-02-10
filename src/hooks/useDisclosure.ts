import React, { useCallback, useState } from "react";

export default function useDisclosure(isOpenDefault = false) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback((toSet: unknown) => {
    if (typeof toSet === "undefined") {
      setIsOpen((state) => !state);
    } else {
      setIsOpen(Boolean(toSet));
    }
  }, []);

  return { isOpen, open, close, toggle };
}
