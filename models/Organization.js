module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define('Organization', {
        name:{
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    }); 
    return Organization;
}