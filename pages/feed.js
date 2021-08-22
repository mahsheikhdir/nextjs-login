import { useRouter } from 'next/router';
import { parseCookies } from '../lib/parseCookies'
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import photo from '../public/hs40.png';

export default function Feed({userInfo}) {

    console.log(jwt.decode(userInfo))

    const router = useRouter();

    useEffect(() => {
        if (userInfo == null) {
            router.push('/');
        }
    });

    if (userInfo == null) {
        return <div></div>;
    }

    return (
        <div>
            <title>{userInfo.first_name}'s Feed</title>

            <Header photo={photo} name={userInfo.first_name}/>

            <Sidebar photo={photo} name={userInfo.first_name}/>
            <Post/>
            <Post/>
        </div>
    )
}

Feed.getInitialProps = ({req}) => {
    let cookies = parseCookies(req);

    // console.log("COOKIES", cookies);

    let data = jwt.decode(cookies.token);

    // console.log("DATA", data);

    if (data) {
        return {
            userInfo: data
        }
    } else {
        return {
            userInfo: null
        }
    }
}