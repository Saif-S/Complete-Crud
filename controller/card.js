const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const Card = model.card;

// function addCard(req, res){
//     try{
//         card_no = req.body.card_no;
//         OrganizationId = req.body.OrganizationId;
//         conn.query('insert into cards set card_no = ?, OrganizationId = ?', [card_no, OrganizationId], (err, result) => {
//             if(err) throw err;
//             res.status(200).send({msg:'Data inserted'})
//         });
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

function addCard(req, res){
    try{
        Card.create({
            card_no: req.body.card_no,
            OrganizationId: req.orgId
        }).then((a) => {
            res.status(200).send({msg: 'Data Inserted'});
        });
    } catch(err){
        res.status(500).send({Error: err});
    }
}

function showAllCard(req, res){
    try {
        Card.findAll().then((card) => {
            if(!card){
                res.status(404).send({msg:'No data found'});
            } else {
                res.status(200).send({Result: card});
            }
        });
    } catch (error) {
        res.status(500).send({Error:error});
    }
}

// function showAllCard(req, res){
//     try {
//         conn.query('select * from cards', (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     } catch (error) {
//         res.status(500).send({Errorr: error});
//     }
// }

function showCard(req, res){
    try {
        Card.findOne({
            where: {
                id: req.params.id
            }
        }).then((card) => {
            if(!card){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({Result: card});
            }
        })
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function showCard(req, res){
//     try{    
//         id = req.params.id;
//         conn.query('select * from cards where id = ?', id, (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     } catch(error){
//         res.status(500).send({Error: error});
//     }
// }

// function updateCard(req, res){
//     try{
//         Card.update({
//             card_no: req.body.card_no,
//             OrganizationId: req.body.OrganizationId
//         },{
//             where:{
//                 id: req.params.id
//             }   
//         }).then((card) => {
//             console.log(card);
//             if(!card[0]){
//                 res.status(500).send({msg: 'Data not found'});
//             } else {
//                 res.status(200).send({msg: 'Card updated'});
                
//             }
//         });
//     }catch(error){
//         res.status(500).send({Error: error});
//     }
// }

function updateCard(req, res){
    try {
        card_no = req.body.card_no;
        OrganizationId = req.body.OrganizationId;
        id = req.params.id;
        conn.query('update cards set card_no = ?, OrganizationId = ? where id = ?', [card_no, OrganizationId,id], (err, result) => {
            if(err) throw err;
            res.status(200).send({msg:'Data Updates'})
        });
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function deleteCard(req, res){
//     id = req.params.id
//     conn.query('delete from cards where id = ?', id, (err, result) => {
//         if(err) throw err
//         res.status(200).send({msg: 'Data deleted'});
//     });
// }

function deleteCard(req, res){
    Card.destroy({
        where:{
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

module.exports = {addCard, showAllCard, showCard, updateCard, deleteCard}