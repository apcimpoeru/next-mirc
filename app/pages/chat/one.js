import Header from "../../components/componentLibrary/header/header"
import Head from "next/head"
import Footer from "../../components/componentLibrary/footer/footer"
import ChatRoom from "../../components/componentLibrary/chat/chatRoom/chatRoom"

export default function Home() {
  return <div>

    <Head>
      <title>Log in / Sign up</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="flex flex-col h-screen justify-between text-center">
        <Header/>
        <ChatRoom name="one"/>
        <Footer/>
    </div>
    
  </div>
}


