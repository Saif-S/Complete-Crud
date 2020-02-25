module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define('Organization', {
        name:{
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: false
    }); 
    return Organization;
}