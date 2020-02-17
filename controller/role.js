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

// function showRole(req, res){
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

function showRole(req, res){
    try{
        Role.findAll().then(result => {
            res.status(200).send({Result: result});
        })
    } catch(err){
        res.status(500).send(err);
    }
}


module.exports = { createRole, showRole};