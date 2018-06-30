DROP KEYSPACE IF EXISTS able_table;

CREATE KEYSPACE able_table WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE able_table;

CREATE TYPE reviewtype (
  review_id int,
  username text,
  username_id int,
  overall_rating int,
  food_rating int,
  service_rating int,
  value_rating int,
  noise_level int,
  body text,
  recommended int,
  date text,
  review_categories list <text>
);

CREATE TABLE IF NOT EXISTS restaurants(
  restaurant_id int PRIMARY KEY,
  restaurant_name text,
  restaurant_categories list <text>,
  reviews list <frozen<reviewtype>>
);