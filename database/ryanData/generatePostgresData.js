const faker = require('faker');
const fs = require('fs');

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
const numberOfEntriesPerFile = 100000;
const numberOfRestaurants = 10000000;
const numberOfCategories = categoriesList.length;
const numberOfUsers = 40000000;
const numberOfReviews = 50000000;
const maxRating = 5;
const minNoiseLevel = 1;
const maxNoiseLevel = 4;

const getRandomInteger = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

const generateUsernames = (numberOfOutputEntries) => {
  let usernames = '';
  for (var i = 0; i < numberOfOutputEntries; i += 1) {
    usernames += (`${faker.internet.userName()}\n`);
  }
  return usernames;
};

const generateRestaurantNames = (numberOfOutputEntries) => {
  let restaurantNames = '';
  for (let i = 0; i < numberOfOutputEntries; i += 1) {
    const numberOfWords = getRandomInteger(1, 4);
    restaurantNames += (`${faker.lorem.words(numberOfWords)}\n`);
  }
  return restaurantNames;
};

const generateReviewBody = () => {
  return faker.lorem.sentences();
};

const generateReviewDates = (yearsOld) => {
  return faker.date.past(yearsOld);
};

const generateReviews = (numberOfOutputEntries) => {
  let reviewData = '';
  for (let i = 0; i < numberOfOutputEntries; i += 1) {
    reviewData += (`${getRandomInteger(1, numberOfRestaurants)}|${getRandomInteger(1, numberOfUsers)}|${getRandomInteger(0, maxRating)}|${getRandomInteger(0, maxRating)}|${getRandomInteger(0, maxRating)}|${getRandomInteger(0, maxRating)}|${getRandomInteger(minNoiseLevel, maxNoiseLevel)}|${generateReviewBody()}|${getRandomInteger(0, 1)}|${generateReviewDates(5)}\n`);
  }
  return reviewData;
};

const generateRestaurantsAndCategories = (numOfRestaurantsPerRound, startingId) => {
  let restaurantsAndCategories = '';
  let id = startingId;
  for (let i = 0; i <= numOfRestaurantsPerRound; i += 1) {
    const numberOfCategoriesPerRestaurant = getRandomInteger(3, 8);
    const categoriesUsed = {};

    const generateCategoryId = () => {
      let categoryId = null;
      while (!categoriesUsed[categoryId]) {
        categoryId = getRandomInteger(1, numberOfCategories);
        categoriesUsed[categoryId] = true;
      }
      return categoryId;
    };
    for (let j = 0; j < numberOfCategoriesPerRestaurant; j += 1) {
      restaurantsAndCategories += `${id}|${generateCategoryId()}\n`;
    }
    id += 1;
  }
  return restaurantsAndCategories;
};

const generateReviewsAndCategories = (numOfReviewsPerRound, startingId) => {
  let reviewsAndCategories = '';
  let id = startingId;
  for (let i = 0; i <= numOfReviewsPerRound; i += 1) {
    const numberOfCategoriesPerReview = getRandomInteger(3, 8);
    const categoriesUsed = {};

    const generateCategoryId = () => {
      let categoryId = null;
      while (!categoriesUsed[categoryId]) {
        categoryId = getRandomInteger(1, numberOfCategories);
        categoriesUsed[categoryId] = true;
      }
      return categoryId;
    };
    for (let j = 0; j < numberOfCategoriesPerReview; j += 1) {
      reviewsAndCategories += `${id}|${generateCategoryId()}\n`;
    }
    id += 1;
  }
  return reviewsAndCategories;
};

// const generateNumberForAllEntries = (min, max, numberOfOutputEntries) => {
//   const allValues = [];
//   for (let i = 0; i < numberOfOutputEntries; i++) {
//     allValues.push(getRandomInteger(min, max));
//   }
//   return allValues;
// };

const generateCategoryNames = (numberOfOutputEntries) => {
  let categoryNames = '';
  for (let i = 0; i < numberOfOutputEntries; i += 1) {
    categoryNames += (`${categoriesList[i]}\n`);
  }
  return categoryNames;
};

// const saveDataToFile = (filename, generateDataFunc, totalNumberOfEntries, entriesPerFile) => {
//   for (var i = 0; i < (totalNumberOfEntries / entriesPerFile); i += 1) {
//     const data = generateDataFunc(entriesPerFile);
//     fs.appendFileSync(`./${filename}.csv`, data, (err) => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//     });
//   }
//   console.log(i)
// };

const saveDataToFile = (filename, generateDataFunc, totalNumberOfEntries, entriesPerRound) => {
  const writeStream = fs.createWriteStream(`./${filename}.csv`);
  const numberOfRounds = totalNumberOfEntries / entriesPerRound;
  for (let i = 0; i < (numberOfRounds); i += 1) {
    const data = generateDataFunc(entriesPerRound);
    writeStream.write(data);
  }
  writeStream.on('finish', () => {
    console.log('wrote all data to file');
  });
  writeStream.end();
};

const saveJoinDataToFile = (filename, generateDataFunc, totalNumberOfEntries, entriesPerRound) => {
  const writeStream = fs.createWriteStream(`./${filename}.csv`);
  const numberOfRounds = totalNumberOfEntries / entriesPerRound;
  for (let i = 0; i < (numberOfRounds); i += 1) {
    if (i === 0) {
      console.log('loop1');
      const data = generateDataFunc(entriesPerRound, 1);
      writeStream.write(data);
    } else {
      console.log(i * entriesPerRound + 1);
      const data = generateDataFunc(entriesPerRound, (i * entriesPerRound) + 1);
      writeStream.write(data);
    }
  }
  writeStream.on('finish', () => {
    console.log('wrote all data to file');
  });
  writeStream.end();
};

const saveCategoriesToFile = (filename) => {
  const writeStream = fs.createWriteStream(`./${filename}.csv`);
  const data = generateCategoryNames(numberOfCategories);
  writeStream.write(data);
  writeStream.on('finish', () => {
    console.log('wrote all data to file');
  });
  writeStream.end();
};
// DATA FOR REVIEWS
console.time('10M-reviewEntries split into 10 files');
saveDataToFile('./dataFiles/reviewsEntries_0', generateReviews, numberOfReviews, 100000);
console.timeEnd('10M-reviewEntries split into 10 files');

// DATA FOR USERS
// console.time('10M-usernames split into 10 files');
// saveDataToFile('./dataFiles/usernameEntries', generateUsernames, numberOfUsers, 100000);
// console.timeEnd('10M-usernames split into 10 files');

// DATA FOR RESTAURANTS
// console.time('10M-restaurantNames split into 10 files');
// saveDataToFile('./dataFiles/restaurantNameEntries', generateRestaurantNames, numberOfRestaurants, 100000);
// console.timeEnd('10M-restaurantNames split into 10 files');

// DATA FOR CATEGORIES
// console.time('10M-categoryNames split into 10 files');
// saveCategoriesToFile('./dataFiles/categoryNameEntries');
// console.timeEnd('10M-categoryNames split into 10 files');

// DATA FOR RESTAURANTS AND CATEGORIES JOIN TABLE
// console.time('10M-restCat');
// saveJoinDataToFile('./dataFiles/restaurantsAndCategories', generateRestaurantsAndCategories, numberOfRestaurants, 100000);
// console.timeEnd('10M-restCat');

// DATA FOR REVIEWS AND CATEGORIES JOIN TABLE
// console.time('10M-reviewsCat');
// saveJoinDataToFile('./dataFiles/reviewsAndCategories', generateReviewsAndCategories, numberOfReviews, 100000);
// console.timeEnd('10M-reviewsCat');
