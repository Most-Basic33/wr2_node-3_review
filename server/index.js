require('dotenv').config();
const express = require('express');
const massive = require('massive');
const app = express();
const backpackCTRL = require('./controllers/backpackCtrl');

const { SERVER_PORT, DB_URI } = process.env;

app.use(express.json());

massive({
    connectionString: DB_URI,
    ssl: { 
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log('DB is connected');
}).catch(err => console.log(err));


app.get('/api/backpackitems', backpackCTRL.getItems);
app.post('/api/backpackitems', backpackCTRL.addItem); // use a body


app.listen(SERVER_PORT, () => console.log(`Listening to sweet sounds on ${SERVER_PORT}FM`));