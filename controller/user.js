const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const user = model.user;

// function createUser(req, res){
//     // console.log(typeof role);
//     try{
//         const firstName = req.body.firstName;
//         const lastName = req.body.lastName;
//         const email = req.body.email;
//         const password = req.body.password;
//         const salt = req.body.salt;
//         const roleId = req.body.roleId;
//         const orgId = req.body.orgId; 
//         conn.query('insert into Users SET firstName = ?, lastName = ?, email = ?, password = ?, salt = ?, RoleId = ?, OrganizationId = ?',
//             [firstName,lastName,email,password,salt,roleId, orgId], (err,result) => {
//                 if(err) throw err;
//             res.status(200).send({msg: 'Data Inserted'});
//         });
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

function createUser(req, res){
    try{
        user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            salt: req.body.salt,
            RoleId: req.body.roleId,
            OrganizationId: req.body.orgId
        }).then((a) => {
            return res.status(200).send({msg: 'Data Inserted Seq'});
        })
    } catch(err){
        return res.staus(500).send({Error: err});
    }
}

module.exports = {createUser}