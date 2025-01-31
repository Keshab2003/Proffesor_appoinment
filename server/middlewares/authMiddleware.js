const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header('authorization').split(" ")[1];
        jwt.verify(token , process.env.JWT_SECRET, (error, decode) => {
            if(error){
                return res.status(200).send({ message: "Unauthorised Access , error in token middleware!" , success: false});
            }else{
                req.body.userId = decode.id;
                next() ;           
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(401).send({success: false, message: "Authorization failed , Internal Server Error!"});
        
    }

};


module.exports = {authMiddleware};





// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     try {
//         const authHeader = req.header('Authorization');
//         if (!authHeader) {
//             return res.status(401).send({ success: false, message: "No token provided, authorization denied" });
//         }

//         const token = authHeader.split(' ')[1]; // Correctly extract the token
//         if (!token) {
//             return res.status(401).send({ success: false, message: "Token is missing, authorization denied" });
//         }

//         jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
//             if (error) {
//                 return res.status(401).send({ success: false, message: "Unauthorized Access, error in token middleware!" });
//             } else {
//                 req.body.userId = decoded.id;
//                 next();
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ success: false, message: "Authorization failed, Internal Server Error!" });
//     }
// };

// module.exports = authMiddleware;