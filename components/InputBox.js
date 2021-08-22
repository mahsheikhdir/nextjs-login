
import { getSession } from '../lib/hateshieldauth';
import { getFullName, getPhotoUrl } from '../lib/hateshielduser';
import Image from "next/image";

function InputBox() {

    const session = getSession();
    const photo = getPhotoUrl(session);
    const name = getFullName(session);

    const sendPost = (e) =>{
        e.preventDefault();
    };
    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            <div className='flex space-x-4 p-4 items-center'>
                <Image className='rounded-full' src={photo} width={40} height={40} />
                <form className='flex flex-1'>
                  <input className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none ' type='text' placeholder={`What's on your mind ${name}?`} />  
                  <button hidden type='submit' onClick={sendPost}/>
                </form>
            </div>            
        </div>
    )
}

export default InputBox
