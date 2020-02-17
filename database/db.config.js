const dbConfig = {
    database : 'company',
    username : 'saif',
    password : 'Skills@123',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        timetamps: false
    }
};

module.exports = dbConfig;