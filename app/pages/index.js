import Head from 'next/head'
import Header from '../components/componentLibrary/header/header'
import Footer from '../components/componentLibrary/footer/footer'

export default function Home() {

  return (
      <>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col h-screen justify-between text-center">
            <Header/>
            <p>Home sweet home</p>
            <Footer/>
        </div>
      </>
  )
}

