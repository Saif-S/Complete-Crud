module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
        name:{
            type:Sequelize.STRING,
        }
    }, {
        timestamps: false
    });
    return Role;
}