const { Client } = require('pg');

const client = new Client({
  user: process.env.USER,
  host: 'localhost',
  database: 'reviewsdatabase',
  password: 'null',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to postgres database');
  }
});

const getAllReviews = (restaurantId, callback) => {
  client.query(`SELECT 
    restaurants.id restaurant_id,
    restaurant_name,
    reviews.id review_id,
    reviews.username_id,
    reviews.overall_rating,
    reviews.food_rating,
    reviews.service_rating,
    reviews.noise_level,
    reviews.body,
    reviews.recommended,
    reviews.date,
    users.username,
    reviews_and_categories.category_id,
    categories.category_name
    FROM 
      restaurants
    LEFT JOIN reviews ON reviews.restaurant_id = restaurants.id
    LEFT JOIN reviews_and_categories ON reviews_and_categories.review_id = reviews.id
    LEFT JOIN categories ON categories.id = reviews_and_categories.category_id
    LEFT JOIN users ON users.id = reviews.username_id
    WHERE restaurants.id = ${restaurantId};
  `, (err, result) => {
    if (err) throw err;
    callback(null, result);
    // console.log(res);
    // client.end();
  });
};

const insertReview = (review) => {
  return client.query(`INSERT INTO reviews (
    restaurant_id,
    username_id,
    overall_rating,
    food_rating,
    service_rating,
    value_rating,
    noise_level,
    body,
    recommended,
    date) 
    VALUES (
      ${review.restaurant_id},
      ${review.username_id},
      ${review.overall_rating},
      ${review.food_rating},
      ${review.service_rating},
      ${review.value_rating},
      ${review.noise_level},
      '${review.body}',
      ${review.recommended},
      '${review.date}'
    ) RETURNING
    id`);
// callback(null, result);
};

const insertReviewCategory = (reviewId, categoryId) => {
  return client.query(`INSERT INTO reviews_and_categories (
    review_id,
    category_id
  ) VALUES (
    ${reviewId},
    ${categoryId})`);
};

const insertCategories = (reviewId, categories, response) => {
  categories.forEach((category) => {
    client.query(`INSERT INTO categories (
      category_name
    ) select '${category}' where not exists (
      select category_name from categories where category_name = '${category}'
    ) RETURNING id`)
      .then((result) => {
        if (result.rows.length) {
          insertReviewCategory(reviewId, result.rows[0].id)
            .then(() => response.status(201).send());
        } else {
          response.status(201).send();
        }
      });
  });
};

const deleteReview = (restaurantId, callback) => {
  client.query(`delete from reviews where id = ${restaurantId}`, (err, results) => {
    if (err) throw err;
    callback(null, results);
  });
};

const updateReview = (newInfo, callback) => {
  const keys = [];
  const vals = [];
  Object.keys(newInfo).forEach((key) => {
    if (key !== 'review_id') {
      keys.push(key);
      vals.push(newInfo[key]);
    }
  });
  let query = 'UPDATE reviews SET ';
  for (let i = 0; i < keys.length; i += 1) {
    if (i === 0) {
      if (typeof vals[i] === 'string') {
        query += `${keys[i]} = '${vals[i]}'`;
      } else {
        query += `${keys[i]} = ${vals[i]}`;
      }
    } else {
      if (typeof vals[i] === 'string') {
        query += `, ${keys[i]} = '${vals[i]}'`;
      }
      query += `, ${keys[i]} = ${vals[i]}`;
    }
  }
  query += ` WHERE id = ${newInfo.review_id}`;
  client.query(query, (err, result) => {
    if (err) throw err;
    callback(null, result);
  });
};

module.exports = {
  getAllReviews,
  insertReview,
  insertCategories,
  deleteReview,
  updateReview,
};
