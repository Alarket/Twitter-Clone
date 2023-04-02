import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Tweet } from '../../typings'
import { fetchTweets } from '../../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

export default function Home({tweets}: Props) {
  //console.log(tweets)
  return (
    <div className='mx-auto lg:max-w-6xl max-h-screen overflow-hidden'>
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png"></link>
      </Head>

      <main className='grid grid-cols-9'>
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()

  return {
    props:{
      tweets
    }
  }
}