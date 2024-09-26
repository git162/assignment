const { User } = require("../db");

function validateUserMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;
    User.findOne({
        username:username,
        password:password
    })
    .then(value=>{
        if(value) res.status(403).json({
            msg:"User already Exists"
        });
        else next();
    })
}

function userMiddleware(req,res,next){
    const { username, password } = req.headers;
    User.findOne({
        username:username,
        password:password
    })
    .then(value=>{
        if(value) next();
        else {
            res.status(403).json({
                msg:"User does not exist"
            })
        }
    })
}

module.exports = {userMiddleware, validateUserMiddleware};