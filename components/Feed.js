import InputBox from "./InputBox"
import Login from '../components/Login'
import { getSession } from '../lib/hateshieldauth';

function Feed() {

    const session = getSession();
    console.log('Header-Session', session);
    
    if(session==null) return <Login />;

    return (
        <div className="mx-auto w-[600px] border rounded-lg shadow-lg my-4">
            <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>                              
                {/* Input box */}
               <InputBox />
                {/* Posts */}
            </div>
        </div>
    )
}
export default Feed
