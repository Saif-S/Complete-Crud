const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const Role = model.role;


// function createRole(req, res) {
//     try{
//         const name = req.body.name;
//         conn.query('insert into Roles SET name = ?', name, (err, result) => {
//         if(err) throw err;
//         res.status(200).send({msg: 'Data Inserted'});
//         });
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

// function showAllRole(req, res){
    // try{
    //     conn.query('select * from Roles', (err, result) => {
    //         if(err) throw err;
    //         res.status(200).send({msg: 'All Roles',List: result});
    //     });
    // } catch(err){
    //     res.status(500).send({Error: err});   
    // }
//}

function createRole(req, res){
    try{
        Role.create({
            name: req.body.name
        }).then((c) => {
            return res.status(200).send({msg: 'Data Inserted'});
        });
    } catch (error){
        return res.status(500).send({Error: error});
    }
}

function showAllRole(req, res){
    try{
        Role.findAll().then(result => {
            res.status(200).send({Result: result});
        })
    } catch(err){
        res.status(500).send(err);
    }
}

function showRole(req, res){
    try {
        Role.findOne({
            where: {
                id: req.params.id
            }
        }).then((r) => {
            if(!r){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({Result: r});
            }
        })
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function showRole(req, res){
//     try{    id = req.params.id;
//         conn.query('select * from Roles where id = ?', id, (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     } catch(error){
//         res.status(500).send({Error: error});
//     }
// }

// function updateRole(req, res){
//     try{    Role.update({
//             name: req.body.name
//         },{
//             where:{
//                 id: req.params.id
//             }
//         }).then((role) => {
//             if(!role[0]){
//                 res.status(404).send({msg: 'No data found'});
//             } else {
//                 res.status(200).send({msg: 'Data updated'});
//             }
//         });
//     } catch(error) {
//         res.status(500).send({Error:error});
//     }
// }

function updateRole(req, res){
    const id = req.params.id
    const name = req.body.name 
    conn.query('update Roles set name = ? where id = ?',[name, id], (err, result) => {
        if(err) throw err
        res.status(200).send({msg: 'Data updated'});
    });
}

// function deleteRole(req, res){
//     id = req.params.id
//     conn.query('delete from Roles where id = ?', id, (err, result) => {
//         if(err) throw err
//         res.status(200).send({msg: 'Data deleted'});
//     })
// }

function deleteRole(req, res){
    Role.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) =>{
        if(!result){
            res.status(404).send({msg: 'Data not found'});
        } else {
            res.status(200).send({msg: 'Data deleted'});
        }
    })
}

module.exports = {createRole, showRole, showAllRole, updateRole, deleteRole};