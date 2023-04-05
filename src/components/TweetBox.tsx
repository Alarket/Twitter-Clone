import { CalendarIcon, FaceSmileIcon, MagnifyingGlassCircleIcon, MapPinIcon, PhotoIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { MouseEvent } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../../typings'
import { fetchTweets } from '../../utils/fetchTweets'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {
    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const imageInputRef = useRef<HTMLInputElement>(null)
    const {data: session}= useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    
    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        if(!imageInputRef.current?.value) return

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageUrlBoxIsOpen(false)
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImage: session?.user?.image || 'https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png',
            image: image
        }
        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        })
        const json = await result.json()

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Tweet Posted!', {
            icon: '🚀'
        })
        return json
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        postTweet()

        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }

  return (
    <div className='flex space-x-2 p-5'>
        <Image
        className='mt-4 h-14 w-14 rounded-full object-cover'
        src={session?.user?.image || 'https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png'}
        alt=''
        height={100}
        width={100}
        />

        <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder="What's Happening?"
                className='h-24 w-full text-xl outline-none placeholder:text-xl'/>
                <div className='flex items-center'>
                    <div className='flex flex-1 space-x-2 text-twitter'>
                        <PhotoIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} 
                        className='h-5 w-5 cursor-pointer transition-transform
                        duration-150 ease-out hover:scale-150'/>
                        <MagnifyingGlassCircleIcon className='h-5 w-5 cursor-pointer transition-transform
                        duration-150 ease-out hover:scale-150'/>
                        <FaceSmileIcon className='h-5 w-5 cursor-pointer transition-transform
                        duration-150 ease-out hover:scale-150'/>
                        <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform
                        duration-150 ease-out hover:scale-150'/>
                        <MapPinIcon className='h-5 w-5 cursor-pointer transition-transform
                        duration-150 ease-out hover:scale-150'/>
                    </div>

                    <button 
                    onClick={handleSubmit}
                    disabled={!input || !session} className='rounded-full bg-twitter px-5 py-2 
                    font-bold text-white disabled:opacity-40'>Tweet</button>
                </div>
                {imageUrlBoxIsOpen && (
                    <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                        <input 
                        ref={imageInputRef}
                        className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white' 
                        type='text' 
                        placeholder='Enter Image URL...'/>

                        <button
                        type='submit' 
                        onClick={addImageToTweet} 
                        className='font-bold text-white'>Add Image
                        </button>
                    </form>
                )}

                {image && (<img className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' 
                src={image} 
                alt=''
                />
                )}
            </form>
        </div>
    </div>
  )
}

export default TweetBox