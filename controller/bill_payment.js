const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const bill_pay = model.bill_Payments;

// function createBillPayment(req, res){
//     try{
//         bill_id = req.body.bill_Id;
//         conn.query('insert into bill_Payments SET billId = ?', bill_id, (err, result) => {
//             if(err) throw err;
//             res.status(200).send({msg: "Data Inserted"});
//         });  
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

function createBillPayment(req, res){
    try{
        bill_pay.create({
            billId: req.body.billId
        }).then((a) => {
            return res.status(200).send({msg: 'Data Inserted'});
        })
    } catch(err) {
        res.status(500).send({Error: err});
    }
}

module.exports = {createBillPayment}