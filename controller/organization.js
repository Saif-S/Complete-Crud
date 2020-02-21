const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const org = model.organization;

// function createOrganization(req, res){
//     try{
//         const name = req.body.name;
//         conn.query('insert into Organizations SET name = ?', name, (err, result) => {
//             if(err) throw err;
//             res.status(200).send({msg: 'Data Inserted'});
//         });
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

// function showAllOrganization(req, res){
//     try{
//         conn.query('select * from Organizations', (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     }catch(err){
//         res.status(500).send({Error: err});
//     }
// }

function createOrganization(req, res){
    try{
        org.create({
            name: req.body.name
        }).then((c) => {
            return res.status(200).send({msg: 'Data inserted'});
        })
    }  catch(err) {
        res.status(500).send({Error: err});
    }
}

function showAllOrganization(req, res){
    try{
        org.findAll().then((result) => {
            res.status(200).send({Result: result});
        });
    } catch(err) {
        res.status(500).send({Error: err});
    }
}

// function showOrganization(req, res){
//     try {
//         org.findOne({
//             where: {
//                 id: req.params.id
//             }
//         }).then((Org) => {
//             if(!Org){
//                 res.status(404).send({msg: 'No data found'});
//             } else {
//                 res.status(200).send({Result: Org});
//             }
//         });
//     } catch (error) {
//         res.status(500).send({Error: error});       
//     }
// }

function showOrganization(req, res){
    try {
        id = req.params.id;
        conn.query('select * from Organizations where id = ?', id, (err, result) => {
            if(err) throw err;
            res.status(200).send({Result: result});
        })
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function updateOrganization(req, res){
//     try {
//         org.update({
//             name: req.body.name
//         },{
//             where:{
//                 id: req.params.id
//             }
//         }).then((Org) =>{
//             if(!Org[0]){
//                 res.status(404).send({msg: 'No data found'});
//             } else {
//                 res.status(200).send({msg: 'Data updated'});
//             }
//         });
//     } catch (error) {
//         res.status(500).send({Error: error});
//     }
// }

function updateOrganization(req, res){
    try{    
        const name = req.body.name;
        const id = req.params.id;
        conn.query('update Organizations SET name = ? where id = ?', [name,id], (err, result) => {
            if(err) throw err;
            res.status(200).send({msg: 'Data Inserted'});
        });
    } catch (error){
        res.status(500).send({Error: error});
    }
}

// function deleteOrganization(req, res){
//     id = req.params.id
//     conn.query('delete from Organizations where id = ?', id, (err, result) => {
//         if(err) throw err
//         res.status(200).send({msg: 'Data deleted'});
//     });
// }

function deleteOrganization(req, res){
    org.destroy({
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
}

module.exports = {createOrganization, showOrganization, showAllOrganization, updateOrganization, deleteOrganization};