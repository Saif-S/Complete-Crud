const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const card = model.card;

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
        card.create({
            card_no: req.body.card_no,
            OrganizationId: req.body.OrganizationId
        }).then((a) => {
            res.status(200).send({msg: 'Data Inserted'});
        });
    } catch(err){
        res.status(500).send({Error: err});
    }
}

module.exports = {addCard}