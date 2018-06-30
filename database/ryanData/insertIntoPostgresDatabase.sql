\connect reviewsdatabase;

-- \copy restaurants(restaurant_name) FROM './dataFiles/restaurantNameEntries.csv' CSV;

-- \copy users(username) FROM './dataFiles/usernameEntries.csv' CSV;

-- \copy categories(category_name) FROM './dataFiles/categoryNameEntries.csv' CSV;


-- \copy reviews(restaurant_id,username_id,overall_rating,food_rating,service_rating,value_rating,noise_level,body,recommended,date) FROM './dataFiles/reviewsEntries_0.csv' DELIMITER '|' CSV;
-- \copy reviews(restaurant_id,username_id,overall_rating,food_rating,service_rating,value_rating,noise_level,body,recommended,date) FROM './dataFiles/reviewsEntries_1.csv' DELIMITER '|' CSV;
-- \copy reviews(restaurant_id,username_id,overall_rating,food_rating,service_rating,value_rating,noise_level,body,recommended,date) FROM './dataFiles/reviewsEntries_2.csv' DELIMITER '|' CSV;
-- \copy reviews(restaurant_id,username_id,overall_rating,food_rating,service_rating,value_rating,noise_level,body,recommended,date) FROM './dataFiles/reviewsEntries_3.csv' DELIMITER '|' CSV;
-- \copy reviews(restaurant_id,username_id,overall_rating,food_rating,service_rating,value_rating,noise_level,body,recommended,date) FROM './dataFiles/reviewsEntries_4.csv' DELIMITER '|' CSV;

-- \copy restaurants_and_categories(restaurant_id, category_id) FROM './dataFiles/restaurantsAndCategories.csv' DELIMITER '|' CSV;
\copy reviews_and_categories(review_id, category_id) FROM './dataFiles/reviewsAndCategories.csv' DELIMITER '|' CSV;