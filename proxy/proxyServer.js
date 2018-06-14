const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('express-http-proxy');

app.use('/overviews', proxy(`http://localhost:3003`));

app.use('/menus', proxy(`http://localhost:3005`));

app.use('/reviews', proxy(`http://localhost:3002`));

app.use('/reservations', proxy(`http://localhost:3001`));

app.use('/photos', proxy(`http://localhost:3004`));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});