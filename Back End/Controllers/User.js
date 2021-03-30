const User = require('../Models/User');


exports.signUp = (req,res,next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const SignInUser = new User ({ email: email, firstName:firstName, lastName:lastName, password:password });
    SignInUser.save().then(result => {
        res.status(200).json({message : "user signed Up Successfully", User : result})
    }).catch(err =>{
        res.status(500).json({message : err})
    })
}

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.find({ email:email , password:password })
    .then(result => {
        if(result.length >=1){
            res.status(200).json({message : "user Logged in Successfully", isAuthenticated:true, User : result })
        }
        else{
            res.status(200).json({message : "user not LoggedIn Successfully",isAuthenticated:false, User : result})
        }
        
    })
    .catch(err =>{
        res.status(500).json({message : err})
    })
}