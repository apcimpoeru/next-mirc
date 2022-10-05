import Head from 'next/head'
import Header from '../components/componentLibrary/header/header'
import Footer from '../components/componentLibrary/footer/footer'

import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../lib/socketContext'

export default function Test() {

  useEffect(async () => {

      let rooms = await getRoomsFromDB();

  }, [])

    return (
        <>
        <Head>
            <title>Play</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <div className='h-[92vh] flex justify-center items-center'>

            <div className='content_wrapper p-12 min-h-full flex flex-col justify-center items-center h-full'>

                {content}

            </div>

        </div>
        
        <Footer/>

        </>
    )
}

