import jwt from 'jsonwebtoken';
import axios from 'axios';

export default async function (req, res) {

    console.log(req.body);
    const {username, password} = req.body

    console.log(username, password, req.body, "from server");

    console.log(process.env.LOGIN_END_POINT + '?' + 'email=' + username);
    let userResponse = await axios({
        method: 'GET',
        url: process.env.LOGIN_END_POINT + '?' + 'email=' + username, 
    })

    let user = userResponse.data.Response.data.user;

    if (user == null) {
        return
    }

    res.json({
        token: jwt.sign(user,
        process.env.SECRET_JWT_PASSWORD
        )
    })
}