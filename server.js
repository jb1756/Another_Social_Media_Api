const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.port || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ugh oh, Something is not working/broke!');
  });