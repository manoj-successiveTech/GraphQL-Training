import jwt from 'jsonwebtoken'
import { secretKey } from '../mutation.js'

function auth({req}){

    const header = req.headers.authorization
    if(!header) return null

    const token = header.split(" ")[1]
    if(!token) return null

    const decoded = jwt.verify(token,secretKey);
    return decoded

}

export default auth;