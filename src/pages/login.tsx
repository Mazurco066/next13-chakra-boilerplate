// Dependencies
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Components
import { LogInView } from '@/presentation/ui/views'

// Types
import type { GetStaticProps } from 'next'

export default function Login() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LogInView />
      </main>
    </>
  )
}

// Load translation files
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale ?? 'pt', ['common', 'login']),
  },
})