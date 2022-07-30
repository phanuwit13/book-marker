import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import Layouts from 'layouts/layout'

//redux
import configStore from 'redux/Store'

const store = configStore()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Layouts>
          <Component {...pageProps} />
        </Layouts>
      </Provider>
    </NextUIProvider>
  )
}

export default MyApp
