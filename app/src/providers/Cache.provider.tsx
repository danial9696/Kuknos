"use client"
import createCache from "@emotion/cache"
import { CacheProvider as MuiCacheProvider } from "@emotion/react"

import { Props } from "./types"

function CacheProvider({ children }: Readonly<Props>) {
  const cacheRtl = createCache({
    key: "muirtl",
    prepend: false,
  })

  return <MuiCacheProvider value={cacheRtl}>{children}</MuiCacheProvider>
}

export default CacheProvider
