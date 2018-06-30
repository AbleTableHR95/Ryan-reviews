const cassandra = require('cassandra-driver');
const faker = require('faker');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

const numberOfRestaurants = 10000000;
const numberOfQueriesPerBatch = 2;
const numberOfBatchesPerRound = 10;
const maxReviewsPerRestaurant = 40;
const numberOfUsers = 10000000;
const numberOfReviews = 200000000;

const maxRating = 5;
const minNoiseLevel = 1;
const maxNoiseLevel = 4;

const getRandomInteger = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

const categoriesList = [
  'Special Occasion',
  'Business Meals',
  'Live Music',
  'Good for Groups',
  'Waterfront',
  'Scenic View',
  'Kid-friendly',
  'Afternoon Coffee',
  'Romantic',
  'Good for Anniversaries',
  'Casual',
  'Seasonal',
  'Great for Outdoor Dining',
  'Neighborhood Gem',
  'Late-night Find',
  'Handcrafted Cocktails',
  'Vegan',
  'Healthy',
  'Comfort Food',
  'Disabled Access',
  'Fun',
  'Happy Hour',
  'Bar Seating',
  'Tasting Menu',
  'Quiet Conversation',
  'Authentic',
  'Vibrant Bar Scene',
  'Fit for Foodies',
  'Worth the Drive',
  'Notable Wine List',
  'Quick Bite',
  'Organic',
  'Great for Lunch',
  'Afternoon Tea',
  'Good for Birthdays',
  'Hot Spot',
  'Great for Brunch',
  'Pre/post Theatre',
  'Cozy',
  'Gluten Free Options',
  'Live Sports',
  'People Watching',
  'Creative Cuisine',
  'Spicy',
  'Paleo Friendly',
  'Good for a Date',
  'Local Ingredients',
  'Good Vegetarian Options',
  'Tapas',
  'Sunday Lunch',
  'Great Beer',
];

const generateCategoryNames = (listOfCategories, numberOfTotalCategories) => {
  const categoryNames = [];
  for (let i = 0; i < numberOfTotalCategories; i += 1) {
    const randomIndex = getRandomInteger(0, listOfCategories.length - 1);
    categoryNames.push(listOfCategories[randomIndex]);
  }
  return categoryNames;
};

// saveDataToFile('./dataFiles/cassandraData', generateCassandraData, 100000, 1000);
const batchRoundStart = 0;
let id = 4352553;
const insertIntoCassandra = () => {
  // const query = 'INSERT INTO able_table.restaurants (restaurant_id,restaurant_name, review) VALUES (?,?,?)';
  const batches = [];
  for (let i = 0; i < numberOfBatchesPerRound; i += 1) {
    const queries = [];
    for (let j = 0; j < numberOfQueriesPerBatch; j += 1) {
      const restaurant_id = id;
      id += 1;
      const numberOfWords = getRandomInteger(1, 4);
      const restaurant_name = faker.lorem.words(numberOfWords);
      const numberOfCategories = getRandomInteger(3, 8);
      const restaurant_categories = generateCategoryNames(categoriesList, numberOfCategories);

      const reviews = [];
      const numberOfReviewsForRestaurant = getRandomInteger(0, maxReviewsPerRestaurant);
      for (let k = 0; k < numberOfReviewsForRestaurant; k += 1) {
        const review_id = getRandomInteger(1, numberOfReviews);
        const username = faker.internet.userName();
        const username_id = getRandomInteger(1, numberOfUsers);
        const overall_rating = getRandomInteger(0, maxRating);
        const food_rating = getRandomInteger(0, maxRating);
        const service_rating = getRandomInteger(0, maxRating);
        const value_rating = getRandomInteger(0, maxRating);
        const noise_level = getRandomInteger(minNoiseLevel, maxNoiseLevel);
        const body = faker.lorem.sentences();
        const recommended = getRandomInteger(0, 1);
        const date = `${faker.date.past(5)}`;
        const numberOfReviewCategories = getRandomInteger(0, 3);
        const review_categories = generateCategoryNames(restaurant_categories, numberOfReviewCategories);
        reviews.push({
          review_id, username, username_id, overall_rating, food_rating, service_rating, value_rating, noise_level, body, recommended, date, review_categories,
        });
      }
      const params = [restaurant_id, restaurant_name, restaurant_categories, reviews];
      queries.push({ query: 'INSERT INTO able_table.restaurants (restaurant_id, restaurant_name, restaurant_categories, reviews) VALUES (?,?,?,?)', params });
    }
    batches.push(client.batch(queries, { prepare: true }));
    // console.log(id);
  }
  return batches;
  // console.log(batches);
};

const insertData = (batchRound) => {
  Promise.all(insertIntoCassandra())
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      batchRound += 1;
      if (batchRound < numberOfRestaurants / (numberOfQueriesPerBatch * numberOfBatchesPerRound)) {
        insertData(batchRound);
      } else {
        client.shutdown();
        return 'completed';
      }
    });
};

insertData(batchRoundStart);

// const insertIntoCassandra = () => {
//   for (let i = 1; i < 1000000; i++) {
//     const restaurant_id = i;
//     const numberOfWords = getRandomInteger(1, 4);
//     const restaurant_name = faker.lorem.words(numberOfWords);
//     const review_id = getRandomInteger(1, numberOfReviews);
//     const username = faker.internet.userName();
//     const overall_rating = getRandomInteger(0, maxRating);
//     const food_rating = getRandomInteger(0, maxRating);
//     const service_rating = getRandomInteger(0, maxRating);
//     const value_rating = getRandomInteger(0, maxRating);
//     const noise_level = getRandomInteger(minNoiseLevel, maxNoiseLevel);
//     const body = faker.lorem.sentences();
//     const recommended = getRandomInteger(0, 1);
//     const date = JSON.stringify(faker.date.past(5));

    // const query = 'INSERT INTO able_table.restaurants (restaurant_id,restaurant_name, review) VALUES (?,?,?)';
    // const params = [restaurant_id, restaurant_name, [{
    //   review_id: review_id, restaurant_name: restaurant_name, username: username, overall_rating: overall_rating, food_rating: food_rating, service_rating: service_rating, value_rating: value_rating, noise_level:noise_level, body: body, recommended: recommended, date: date
    // }]];
    // client.execute(query, params, { prepare: true }, (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('inserted');
//     });
//   }
// };
