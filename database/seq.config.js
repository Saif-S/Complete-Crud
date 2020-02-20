const Sequelize = require('sequelize');
const db = require('./db.config');

const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    pool: {
        max: db.pool.max,
        min: db.pool.min,
        aquire: db.pool.acquire,
        idle: db.pool.idle
    }
});

const models = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    role: require('../models/Role')(sequelize, Sequelize),
    organization: require('../models/Organization')(sequelize, Sequelize),
    state: require('../models/State')(sequelize,Sequelize),
    user: require('../models/User')(sequelize, Sequelize),
    bill: require('../models/bill')(sequelize, Sequelize),
    bill_Payments: require('../models/bill_Payments')(sequelize, Sequelize),
    card: require('../models/card')(sequelize, Sequelize),
    register: require('../models/registration')(sequelize, Sequelize)
};

models.user.belongsTo(models.role,{foreignKey: models.role.id});
models.role.hasMany(models.user);
models.user.belongsTo(models.organization,{foreignKey: models.organization.id});
models.organization.hasMany(models.user);
models.bill.belongsTo(models.organization,{foreignKey: models.organization.id});
models.organization.hasMany(models.bill);
models.bill.belongsTo(models.state,{foreignKey: models.state.id});
models.state.hasMany(models.bill);
models.bill_Payments.belongsTo(models.bill,{foreignKey: models.bill.id});
models.bill.hasMany(models.bill_Payments);
models.card.belongsTo(models.organization,{foreignKey: models.organization.id});
models.organization.hasMany(models.card);

module.exports = models;