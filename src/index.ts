import express = require('express');
const app: express.Application = express();

app.use('/', (req, res) => {
  res.send('Hello world');
});

export { app };
