import { createContext } from 'react'

export const UrlConext = createContext<[string, (a: string) => void]>([
  '',
  () => {},
])

export const LangConext = createContext<[string, (a: string) => void]>([
  '',
  () => {},
])
