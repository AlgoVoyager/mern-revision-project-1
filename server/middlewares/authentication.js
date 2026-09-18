const jwt = require('jsonwebtoken')

const authentication = (req, res, next)=>{
    try {
        const [ scheme, token ] = req.headers.authorization.split(' ')
        if( scheme!=='Bearer' || !token ) return authFail(res);       
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
       return authFail(res);       
    }
}
const authFail = (res) => res.status(401).json({message:"Authentication Failed"})
module.exports = authentication;