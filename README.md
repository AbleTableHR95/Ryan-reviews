# AbleTable

> Inherited legacy code for restaurant reservations web application. Built upon this by dramatically improving load times and throughput through improving database schema/queries, implementing redis cache, and horizontally scaling microservice. 

## Related Projects

  - https://github.com/cava-devs/chrystal-reviews
  - https://github.com/cava-devs/anoop-overview
  - https://github.com/cava-devs/anoop-menus
  - https://github.com/cava-devs/vincent-photos
  - https://github.com/cava-devs/andrew-reservation

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> 1. Run `npm install` to install dependencies.
> 2. Run `mysql -u root < schema.sql` to start the database and create the schema.
> 3. Run `npm start` to start the server, which will also insert 100 reviews into the database.
> 4. There is a small bug in the server when it writes reviews to the database. The server will stop and throw an error saying it does not reconized the generated date. It is safe to restart the server in this instance.
> 5. If you run into issues rendering the component, make sure to check that you have both the MySQL database connected, and that the server is listening on port 3002.


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```
npm install
```

