module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define('State', {
        name:{
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });
    return State;
}