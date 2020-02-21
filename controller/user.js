const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const user = model.user;
const org = model.organization;
const role = model.role;
const jwt  =  require('jsonwebtoken');
const bcrypt  =  require('bcrypt');
const secretKey = 'secret123456';

// function createUser(req, res){
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
    saltRounds = 10;
    try{
        user.findOne({
            where: {
                email: req.body.email
            }
        }).then((isUser) => {
            if(isUser){
                res.status(409).send({msg: 'User already exists,go to login'});
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(req.body.password, salt, (err, pass) => {
                        if(err) throw err
                        user.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: pass,
                            salt: salt,
                            RoleId: req.body.roleId,
                            OrganizationId: req.body.OrganizationId
                        }).then((a) => {
                            return res.status(200).send({msg: 'Registration Successfull'});
                        });
                    });
                });
            }
        });
    } catch(err){
        return res.staus(500).send({Error: err});
    }
}

function login(req, res){
    try {
        user.findOne({
            where: {
                email: req.body.email
            }
        }).then(User => {
            if(User){
                const password = User.password
                bcrypt.compare(req.body.password, password, (err, result) => {
                    if(result){
                        const data = {
                            id: User.id, 
                            email:User.email, 
                            orgId: User.OrganizationId,
                            roleId: User.RoleId
                        }
                        var token = jwt.sign(data, secretKey, {expiresIn: '1h'});
                        user.update({
                            token: token,
                        }, {
                            where: {
                                email: req.body.email
                            }
                        }).then(a => {
                            res.status(200).send({msg: 'Login Successfull', Token: token});
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).send({Error: error});
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
            res.status(404).send({msg: 'User Not Found'});
        }
            res.status(200).send({Result: User})
       });
    } catch(err){
        res.status(500).send({Error: err});
    }
}

// function showAllUser(req, res){
//     try{    
 //       conn.query('select * from Users',(err, result) => {
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
//    try{     
//        user.update({
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
    try{
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
    } catch(error){
        res.status(500).send({Error: error});
    }
}

// function deleteUser(req, res){
//     try{
//         id = req.params.id
//         conn.query('delete from Users where id = ?', id, (err, result) => {
//             if(err) throw err
//             res.status(200).send({msg: 'Data deleted'});
//         });
//     } catch(error){
//         res.status(500).send({Error: error});
//     }
// }

function deleteUser(req, res){
    try{
        user.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if(!result){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({msg: 'Data deleted'});
            }
        });
    } catch(error){
        res.status(500).send({Error: error});
    }
}

// function userJoin(req, res) {
//     try {
//         id = req.userId
//         conn.query('select Users.firstName, Users.lastName, Roles.name as rolename, Organizations.name as orgid from Users join Roles on Users.RoleId = Roles.id join Organizations on Users.OrganizationId = Organizations.id where Users.id = ?', id,
//         (err, result) => {
//             if(err) throw err
//             res.status(200).send({Result: result});
//         });        
//     } catch (error) {
//         res.status(500).send({Error: error});
//     }
// }

function userJoin(req, res){
    try {
        user.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            where: {
                // OrganizationId: req.orgId, 
                id: req.userId
            }, include: [{ model:org, attributes: ['name']},
            { model:role, attributes: ['name'] }]
        }).then(result => {
            res.status(200).send({Result: result});
        });
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

module.exports = {createUser, showUser, showAllUser, updateUser, deleteUser, login, userJoin}