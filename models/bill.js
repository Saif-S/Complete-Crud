module.exports = (sequelize, Sequelize) => {
    const Bills = sequelize.define('bill', {
        amount:{
            type: Sequelize.INTEGER
        },
        initiated_by:{
            type: Sequelize.INTEGER
        },
        approved_by:{
            type: Sequelize.INTEGER
        },
        initiated_at:{
            type: Sequelize.DATE
        },
        approved_at:{
            type: Sequelize.DATE
        },
        status:{
            type: Sequelize.STRING
        },
    },{
        timestamps: false
    });
    return Bills;
}