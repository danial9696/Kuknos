"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Props } from "./types"

const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
