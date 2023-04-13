import { createContext } from 'react'

export const UrlConext = createContext<[string, (a: string) => void]>([
  '',
  () => {},
])
