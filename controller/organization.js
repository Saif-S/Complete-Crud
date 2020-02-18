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

module.exports = {createOrganization, showOrganization, showAllOrganization};