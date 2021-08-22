import Image from 'next/image'
import HeaderIcon from './HeaderIcon';
import {useRouter} from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import{
BellIcon,
ChatIcon,
ChevronDownIcon,
HomeIcon,
ShoppingBagIcon,
UserGroupIcon,
ViewGridIcon
} from "@heroicons/react/solid";

import{
    FlagIcon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline";


function Header(props){
        
    // const session = getSession();   
    // console.log('Header-Session', session);
    // if(session==null) return <Login />;

    // const photo = getPhotoUrl(session);
    // const name = getFullName(session);
    // const router = useRouter()

    // console.log(photo);

    // async function logOut(event) {    
    //     voidSession(session);    
    //     router.push("/");
    //   }

    const router = useRouter();

    async function logOut(event) {
        event.preventDefault();

        console.log("LOOGING OUT");

        try {
            const response = await axios({
                method: 'POST',
                url: '/api/logout'
            });

            console.log("RESPONSE", response);
            console.log("client logout");

            router.push('/');

            Cookies.remove('token');
        } catch {
            console.log('failed to logout');
        }
    }

    return (
        <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-2 shadow-md'>            
            
            {/* Left */}
            <div className='flex items-center '>
                <Image src="/hs40.png" width ={40}  height={40} layout ='fixed' />
                <div className='flex ml-2 item-center rounded-full bg-gray-100 p-2 pl-8'>
                    <SearchIcon className='h-6 text-gray-400'/>
                    <input className='hidden md:inline-flex ml-2 items-center bg-transparent 
                    outline-none placeholder-gray-500 flex-shrink' type='text' 
                    placeholder='Search'></input>
                </div>
            </div>
                        
            {/* Center */}
            <div className='flex justify-center flex-grow '>
                <div className='flex space-x-6 md:space-x-2'>
                    <HeaderIcon active Icon={HomeIcon} />                   
                    <HeaderIcon Icon={FlagIcon} />    
                    <HeaderIcon Icon={PlayIcon} />    
                    <HeaderIcon Icon={ShoppingBagIcon} />    
                    <HeaderIcon Icon={UserGroupIcon} />    
                </div>
            </div>

            {/* Right */}

            <div className='flex items-center sm:space-x-2 justify-end' >  
                {/* profile pic  */}
                
                    <div className='flex items-center space-x-6' onClick={logOut}>
                        <Image
                            className="rounded-full cursor-pointer"
                            src= {props.photo} 
                            width="30"
                            height="30"
                            layout="fixed"
                        />     
                        <p className=' whitespace-nowrap font-semibold pr-3'>{props.name}</p>
                    </div>                                                       
                                             
            </div>

        </div>
    )
}

export default Header
