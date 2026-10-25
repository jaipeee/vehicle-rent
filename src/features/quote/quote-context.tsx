"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { QuoteModal } from "./quote-modal";

interface QuoteContextValue {
  open: () => void;
  close: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal open={isOpen} onClose={close} />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}