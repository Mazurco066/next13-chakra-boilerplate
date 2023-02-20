// Dependencies
import type { AppPropsWithLayout } from '@/domain/types'

// React query service
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// I18n wrappers
import { appWithTranslation } from 'next-i18next'

// Component packages
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '@/presentation/theme'

// Create a client for tanstack client
const queryClient: QueryClient = new QueryClient()

// App wrapper
function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        { getLayout(<Component {...pageProps} />) }
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

// Exporting app
export default appWithTranslation(App)
