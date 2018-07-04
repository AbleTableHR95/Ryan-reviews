var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server/src/index.js');
var should = chai.should();
const db = require('../database/ryanData/postgres.js');

chai.use(chaiHttp);

describe('Test for GET request', () => {
  it('should list all reviews for restaurant for GET requests to /restaurant/:restaurantId/reviews', (done) => {
    chai.request(app)
      .get('/restaurant/1/reviews')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        done();
      });
  });
});

describe('Test for POST request', () => {
  it('should add a SINGLE review on /restaurant/:restaurantId/reviews POST', (done) => {
    chai.request(app)
      .post('/restaurant/1/reviews')
      .send({
        "restaurant_id": 1,
        "username_id": 20,
        "overall_rating": 2,
        "food_rating": 4,
        "service_rating": 2,
        "value_rating": 2,
        "noise_level": 1,
        "body": 'this is a test post request',
        "recommended": 1,
        "date": "Tues Aug 12 2013 03:52:29 GMT-0700 (PDT)",
        "categories": ['test category11', 'test category4']
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe('Test for PUT request', () => {
  it('should update a SINGLE review on /restaurant/:restaurantId/reviews PUT', (done) => {
    chai.request(app)
      .get('/restaurant/2/reviews')
      .end((err, res) => {
        chai.request(app)
          .put(`/restaurant/${res.body.rows[0].restaurant_id}/reviews`)
          .send({"body":'this is a new updated body from PUT request'})
          .end((error, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
});

describe('Test for DELETE request', () => {
  it('should delete a SINGLE review on /restaurant/:restaurantId/reviews DELETE', (done) => { 
    chai.request(app)
      .get('/restaurant/1/reviews')
      .end((err, res) => {
        const lastReviewForRestaurant = (res.body.rows[res.body.rows.length - 1]).review_id;
        chai.request(app)
          .delete('/restaurant/1/reviews')
          .send({ "review_id": lastReviewForRestaurant })
          .end((err, res) => {
            res.should.have.status(204);
          });
        done();
      });
  });
});
