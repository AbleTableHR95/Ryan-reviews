DROP DATABASE IF EXISTS reviewsdatabase;

CREATE DATABASE reviewsdatabase;

\c reviewsdatabase;

DROP TABLE IF EXISTS restaurants CASCADE;
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    restaurant_name character varying(55) NOT NULL
);
CREATE INDEX restaurant_name_index ON restaurants (restaurant_name);

DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    restaurant_id integer NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE,
    username_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    overall_rating integer NOT NULL,
    food_rating integer NOT NULL,
    service_rating integer NOT NULL,
    value_rating integer NOT NULL,
    noise_level integer NOT NULL,
    body character varying(500) NOT NULL,
    recommended integer NOT NULL,
    date character(40) NOT NULL
);
CREATE INDEX reviews_restaurant_id_index ON reviews (restaurant_id);
CREATE INDEX username_id_index ON reviews (username_id);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username character varying(55) NOT NULL
);
CREATE INDEX username_index ON users (username);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name character varying(25) NOT NULL
);
CREATE INDEX category_name_index ON categories (category_name);

-- DROP TABLE IF EXISTS restaurants_and_categories CASCADE;
-- CREATE TABLE restaurants_and_categories (
--     id SERIAL PRIMARY KEY,
--     restaurant_id integer NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE,
--     category_id integer NOT NULL REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
-- );
-- CREATE INDEX restaurant_id_index ON restaurants_and_categories (restaurant_id);
-- CREATE INDEX category_id_index ON restaurants_and_categories (category_id);

DROP TABLE IF EXISTS reviews_and_categories CASCADE;
CREATE TABLE reviews_and_categories (
    id SERIAL PRIMARY KEY,
    review_id integer NOT NULL,
    category_id integer NOT NULL
);
CREATE INDEX review_id_index ON reviews_and_categories (review_id);
CREATE INDEX category_id_index ON reviews_and_categories (category_id);
