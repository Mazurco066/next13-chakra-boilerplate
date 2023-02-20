// Dependencies
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

// Layout wrapper
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// App props includind layout
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
