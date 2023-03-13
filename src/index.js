const express = require('express');
const cors=require('cors')
const route = require('./routes/route.js');
require('./dB/confic')
const app = express();
app.use(cors())
app.use(express.json());

app.use('/', route);


app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});