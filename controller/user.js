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
//         const orgId = req.body.OrganizationId; 
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
            OrganizationId: req.body.OrganizationId
        }).then((a) => {
            return res.status(200).send({msg: 'Data Inserted Seq'});
        })
    } catch(err){
        return res.staus(500).send({Error: err});
    }
}

// function showUser(req, res){
//     try{
//         id = req.params.id
//         conn.query('select * from Users where id = ?', id, (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Data: result})
//         });
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

function showUser(req, res){
    try{
       user.findOne({
           where:{
               id: req.params.id
           }
       }).then((User) => {
        if(!User){
            res.status(404).send({Msg: 'User Not Found'});
        }
            res.status(200).send({Result: User})
       });
    } catch(err){
        res.status(500).send({Error: err});
    }
}

// function showAllUser(req, res){
//     try{    conn.query('select * from Users',(err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     } catch (err){
//         res.status(500).send({Error: err});
//     }
// }

function showAllUser(req, res){
    try{
        user.findAll().then((User) => {
            if(!User){
                res.satus(404).send({msg: 'No Data'});
            } else {
                res.status(200).send({Result: User});
            } 
        })
    } catch(err) {
        res.status(500).send({Error: err});
    }
}

// function updateUser(req, res){
//    try{     user.update({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.password,
//             salt: req.body.salt,
//             RoleId: req.body.roleId,
//             OrganizationId: req.body.OrganizationId
//         },{
//             where: {
//                 id: req.params.id 
//             }
//         }).then((users) => {
//             if(!users[0]){
//                 res.status(404).send({msg: 'Data not found'});
//             } else {
//                 res.status(200).send({msg: 'Data updated'});
//             }
//         });
//     } catch(error){
//         res.status(500).send({Error: error});
//     }
// }

function updateUser(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const salt = req.body.salt;
    const roleId = req.body.roleId;
    const OrganizationId = req.body.OrganizationId;
    const id = req.params.id;
    conn.query('update Users SET firstName = ?, lastName = ?, email = ?, password = ?, salt = ?, RoleId = ?, OrganizationId = ? where id = ?',
    [firstName, lastName, email, password, salt, roleId, OrganizationId, id], (err, result) => {
        if(err) throw err
        res.status(200).send({msg: 'Data updated'});
    }); 
}

module.exports = {createUser, showUser, showAllUser, updateUser}