import Image from 'next/image'
import React from 'react'
import twitterlogo from '../images/twitter-logo.png'
import SidebarRow from './SidebarRow'
import {BellIcon, BookmarkIcon, EllipsisHorizontalCircleIcon, EnvelopeIcon, HashtagIcon, HomeIcon, ListBulletIcon, UserIcon} from '../../node_modules/@heroicons/react/24/outline'

function SideBar() {
  return (
    <div className='col-span-2 flex flex-col items-center px-4 md:items-start'>
        <Image 
        className='m-3 h-10 w-10'
        src={twitterlogo}
        alt=''
        height={60}
        width={60} /> 

        <SidebarRow Icon={HomeIcon} title='Home'/>
        <SidebarRow Icon={HashtagIcon} title='Explore'/>
        <SidebarRow Icon={BellIcon} title='Notifications'/>
        <SidebarRow Icon={EnvelopeIcon} title='Messages'/>
        <SidebarRow Icon={BookmarkIcon} title='Bookmarks'/>
        <SidebarRow Icon={ListBulletIcon} title='Lists'/>
        <SidebarRow Icon={UserIcon} title='Sign In'/>
        <SidebarRow Icon={EllipsisHorizontalCircleIcon} title='More'/>
    </div>
  )
}

export default SideBar