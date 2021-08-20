import Cookies from 'js-cookie'
import { parseCookies } from '../lib/parseCookies'
import jwt from 'jsonwebtoken';
import { HeartIcon , ShareIcon, ThumbUpIcon, ChatIcon} from "@heroicons/react/outline";

function Post() {

    return (
        <div className="mx-auto w-[600px] border rounded-lg shadow-lg my-4">
            <div className="grid grid-cols-2 p-4">
                <div className="md:flex">
                    <img src="https://picsum.photos/seed/picsum/300/300" className="rounded-full h-12 w-12"/>
                    <div className="px-4">
                        <div className="font-semibold">Justin Trudeau</div>
                        <div className="text-gray-400 text-xs">Yesterday at 4:00 PM</div>
                    </div>
                </div>
                <div className="justify-self-end text-lg font-semibold pr-4">...</div>
            </div>
            <div className="text-sm px-4 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <img src="https://picsum.photos/seed/picsum/600/300" className="md:w-auto"/>

            <div className="grid grid-cols-2 text-gray-400 text-md mx-4 py-3">
                <div className="flex gap-1"><HeartIcon className="w-5"/> 300</div>
                <div className="justify-self-end">2 Comments 1 Shares</div>
            </div>
            
            <hr></hr>

            <div className="grid grid-cols-3 p-3 text-gray-500">
                <div className="flex justify-self-center gap-2"><ThumbUpIcon className="w-8"/> <div className="self-center font-bold">Like</div></div>
                <div className="flex justify-self-center gap-2"><ChatIcon className="w-8"/> <div className="self-center font-bold">Comment</div></div>
                <div className="flex justify-self-center gap-2"><ShareIcon className="w-8"/> <div className="self-center font-bold">Share</div></div>

            </div>
        </div>
    )
}

export default function Profile({userInfo}) {

    return (
        <div className="mx-auto w-1/2">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}

Profile.getInitialProps = ({req}) => {
    let cookies = parseCookies(req);

    let data = jwt.decode(cookies.token);

    if (data) {
        return {
            userInfo: data
        }
    }
}