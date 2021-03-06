module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        firstName:{
            type:Sequelize.STRING
        },
        lastName:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        salt:{
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });
    return User;
}