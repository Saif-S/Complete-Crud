const secretKey = 'secret123456';
const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    var tokenExpired = "Please login again";
    var bearer = req.headers['authorization'];
    if(typeof bearer !== 'undefined'){
        const bearertoken = bearer.split(' ');
        const bToken = bearertoken[1];
        // token = bToken;
        jwt.verify(bToken, secretKey, (err, data) => {
            if(err){
                res.status(500).send({Error: err, msg: tokenExpired});
            } else{
                // return data; 
                req.userId = data.id;
                req.userEmail = data.email;
                req.orgId =  data.orgId; 
                // req.stateId = data.stateId  
                next();
            }
        });
    // } else{
    //     res.status(403).send({msg: 'forbidden'});
    }
}

module.exports = verify;