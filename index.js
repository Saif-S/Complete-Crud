const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./router/route');


var seqConfig = require('./database/seq.config');

seqConfig.sequelize.sync(
    // {force:true}
);

seqConfig.sequelize.authenticate().then(function() {
    console.log('Connection Establised');
}).catch(function(err) {
    console.log('Error', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.use(route);