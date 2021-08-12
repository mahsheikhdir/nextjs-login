import Cookies from 'js-cookie'
import { parseCookies } from '../lib/parseCookies'
import jwt from 'jsonwebtoken';

export default function Profile({userInfo}) {

    return (
        
        <div>
            Profile
            <div>
                {JSON.stringify(userInfo)}
            </div>
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