const express = require('express');
const app = express();
const path = require('path')
const PORT = 3000;
const cors = require('cors')
const itineraryRouter = require('./database/itineraryRouter')


app.use(cors())
app.use(express.json());

// app.use('/assets', express.static(path.resolve(__dirname, '../server/static')));

// app.get('/', (req, res) => {
//     return res.status(200).json({"title":"GeeksforGeeks"})
// })

app.use('/plans', itineraryRouter)

app.use('/', itineraryRouter)

app.use((req, res) => res.status(404).json('No route'));

// first thing in crud usually read all data that exists in db
// if doesn't exist then create
// other options update/delete

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });



app.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}`);
});

module.exports = app;

//nodemon server.js runs server