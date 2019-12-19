# shopping_cart_backend

[![Build Status](https://travis-ci.org/LABS-EU3/shopping_cart_backend.svg?branch=develop)](https://travis-ci.org/LABS-EU3/shopping_cart_backend) [![Maintainability](https://api.codeclimate.com/v1/badges/01b004009c792e4588f6/maintainability)](https://codeclimate.com/github/LABS-EU3/shopping_cart_backend/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/01b004009c792e4588f6/test_coverage)](https://codeclimate.com/github/LABS-EU3/shopping_cart_backend/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/LABS-EU3/shopping_cart_backend/badge.svg?branch=develop)](https://coveralls.io/github/LABS-EU3/shopping_cart_backend?branch=develop)



## API doucmentation

**Link to API deployed to Heroku**

**[Production Deployment](https://shopping-cart-eu3.herokuapp.com/)** <br/>
**[Staging Deployment](https://shopping-cart-eu3-staging.herokuapp.com/)**


**[View API Reference Here](https://documenter.getpostman.com/view/5770396/SWEDyEJf?version=latest)** <br />

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2451f94fbc7a20072bc4)


## Getting started

To get this project up and running locally:

1. Clone this repo
1. Run `npm install` to install all of the required dependencies.
1. Install **MongoDB Community Edition** on you local machine. Instructions can be found [here](https://docs.mongodb.com/manual/installation/).
1. Create a db called `shopping_cart` & `shopping_cart_test`

```bash
> use shopping_cart
```

```bash
> use shopping_cart_test
```

5. Create a `.env` file in the root of the project with the following environment variables:

```
DB_CONNECTION=mongodb://localhost:27017/shopping_cart
DB_CONNECTION_TEST=mongodb://localhost:27017/shopping_cart_test
JWT_SECRET=Any long text
```


