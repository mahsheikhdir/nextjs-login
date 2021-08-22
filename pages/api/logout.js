import jwt from 'jsonwebtoken';
import axios from 'axios';
import { parseCookies } from '../../lib/parseCookies';

export default async function (req, res) {

    console.log('logout');
    console.log(parseCookies(req))

    res.status(200).json({success: true});
}