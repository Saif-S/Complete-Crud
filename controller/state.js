const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const state = model.state;

// function createState(req, res){
//     try{
//         const name = req.body.name;
//         conn.query('insert into States Set name = ?',name, (err, result) => {
//             res.status(200).send({msg: 'Data Inserted'});
//         });
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

// function showState(req, res){
//     conn.query('select * from States', (err, result) => {
//         res.status(200).send({msg: 'All States', Result: result});
//     });
// }

function createState(req, res){
    try{
        state.create({
            name: req.body.name
        }).then((a) => {
            res.status(200).send({msg: 'Data inserted'});
        })
    } catch(err){
        res.status(500).send({Error: err})
    }
}

function showAllState(req, res){
    try{
        state.findAll().then((result) => {
            res.status(200).send({Result: result});
        });
    } catch(err){
        res.status(500).send({Error: err});
    }
}

// function showAllState(req, res){
//     try{
//         conn.query('select * from States', (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         })
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

function showState(req, res){
    try {
        state.findOne({
            where: {
                id: req.params.id
            }
        }).then((State) => {
            if(!State){
                res.status(404).send({Error: 'No data found'});
            } else {
                res.status(200).send({Result: State});
            }
        })
    } catch (error) {
         res.status(500).send({Error: error});
    }
}

// function showState(req, res){
//     try {
//         id = req.params.id;
//         conn.query('select * from States where id = ?', id, (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     } catch (error) {
//         res.status(500).send({Error: error});
//     }
// }

module.exports = {createState, showState, showAllState};