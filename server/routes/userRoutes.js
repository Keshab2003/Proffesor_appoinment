const express = require('express');
const { loginController , registerController , getUserDataController} = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');


//router object

const router = express.Router();

//routes




//login routes(post method)
router.post('/login' , loginController)

//register routes(post method)
router.post('/register' , registerController)


//get userdata(post method)
router.post("/getUserData" , authMiddleware , getUserDataController)


module.exports = router;

