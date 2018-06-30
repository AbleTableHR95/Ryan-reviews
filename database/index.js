const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const generateData = require('./generateData.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cava',
});

// const connection = mysql.createConnection(mysqlConfig);

for (let i = 1; i < 5; i += 1) {
  const insertNewReview = `INSERT INTO reviews (restaurant_id, username, date, overall_rating, food_rating, service_rating, ambiance_rating, value_rating, noise_level, recommended, body) VALUES (${generateData.restaurantId(1001, 1004)}, '${generateData.username()}', '${generateData.date()}', ${generateData.overallRating(1, 6)}, ${generateData.foodRating(1, 6)}, ${generateData.serviceRating(1, 6)}, ${generateData.ambianceRating(1, 6)}, ${generateData.valueRating(1, 6)}, ${generateData.noiseLevel(1, 5)}, ${generateData.recommended(0, 2)}, '${generateData.body}');`

  connection.query(insertNewReview, (err, results, fields) => {
    if (err) { throw err; }
  });
  const numberOfCategoriesSelected = generateData.generateRandomInt(1, 51);
  for (let k = 0; k < numberOfCategoriesSelected; k += 1) {
    const categoryCopy = generateData.categories.slice(0);
    const rowCategory = categoryCopy.splice(generateData.generateRandomInt(0, categoryCopy.length), 1);
    connection.query(`INSERT INTO review_categories (reviews_id, category, selected) VALUES (${i}, '${rowCategory}', true)`);
  }
}

const getAllReviews = (restaurantId, callback) => {
  console.log('response being sent from reviews endpoint');
  connection.query(`SELECT * FROM reviews WHERE restaurant_id=${restaurantId} LIMIT 1500`, (error, results) => {
    if (error) {callback(error, null)}
    else { callback(null, results); }
  });
};

module.exports = {
  getAllReviews,
};
