// Dependencies
import Head from 'next/head'
import { ReactElement } from 'react'

// Layouts
import { GeneralLayout } from '@/presentation/ui/_layouts'

function Initial() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Main page</p>  
      </main>
    </>
  )
}

Initial.getLayout = function getLayout(page: ReactElement) {
  return (
    <GeneralLayout>
      {page}
    </GeneralLayout>
  )
}


export default Initial
