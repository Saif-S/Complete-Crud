module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define('card', {
        card_no:{
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return Card;
}