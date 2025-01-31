const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header('authorization').split("")[1]
        jwt.verify(token , process.env.JWT_SECRET, (error, decode) => {
            if(error){
                return res.status(401).seccnd({success: false, message: "Unauthorised Access , error in token middleware!"});
            }else{
                req.body.userId = decode.id;
                next()            
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({success: false, message: "Authorization failed , Internal Server Error!"});
        
    }

};


module.exports = {authMiddleware};