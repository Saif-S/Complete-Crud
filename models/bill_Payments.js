module.exports = (sequelize, Sequelize) => {
    const bill_Payments  = sequelize.define('bill_Payments', {
      status: {
        type: Sequelize.STRING
      } 
    },{
        timestamps: false
    });
    return bill_Payments;
}