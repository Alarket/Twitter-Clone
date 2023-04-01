import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import Head from 'next/head'

export default function Home() {
  return (
    <div className='mx-auto lg:max-w-6xl max-h-screen overflow-hidden'>
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png"></link>
      </Head>

      <main className='grid grid-cols-9'>
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  )
}
