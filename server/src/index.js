require('newrelic');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const db = require('../../database/ryanData/postgres.js');

const redis = require('redis');

const { REDIS_PORT } = process.env;
const client = redis.createClient(REDIS_PORT);

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log(`Error ${err}`);
});
// const db = require('../../database/index.js');


const app = express();
const port = 8081;
app.use(bodyParser.json());


app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '/../../client/dist/')));

const cache = (req, res, next) => {
  client.get(req.params.restaurantId, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

app.get('/restaurant/:restaurantId/reviews', cache, (req, res) => {
  db.getAllReviews(req.params.restaurantId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      client.set(req.params.restaurantId, JSON.stringify(result), 'EX', 3600);
      res.status(200).send(result);
    }
  });
});

app.post('/restaurant/:restaurantId/reviews', (req, res) => {
  db.insertReview(req.body)
    .then((result) => {
      db.insertCategories(result.rows[0].id, req.body.categories, res);
    });
});

app.delete('/restaurant/:restaurantId/reviews', (req, res) => {
  db.deleteReview(req.params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`successful deleted ${req.params}`);
      res.status(204).send();
    }
  });
});

app.put('/restaurant/:restaurantId/reviews', (req, res) => {
  db.updateReview(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('successful get');
      res.status(200).send(result);
    }
  });
});

// CHRYSTAL'S ORIGINAL SERVER
// app.get('/restaurant/:restaurantId/reviews', (req, res) => {
//   db.getAllReviews(req.params.restaurantId, (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     } else {
//       console.log('success');
//       res.status(200).send(results);
//     }
//   });
// });

// app.post('/restaurant/:restaurantId/reviews'), (req, res) => {
//   if (!req.body.name) {
//     res.status(400).send('Error, a name is required')
//   }
//   //insert into database
// }

app.listen(port, () => console.log(`CavaTable is listening on port ${port}`));
