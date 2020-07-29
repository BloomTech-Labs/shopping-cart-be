
[![Build Status](https://travis-ci.org/LABS-EU3/shopping_cart_backend.svg?branch=develop)](https://travis-ci.org/LABS-EU3/shopping_cart_backend) [![Maintainability](https://api.codeclimate.com/v1/badges/d4c6d2ecd17cf874bcec/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/shopping-cart-be/progress/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d4c6d2ecd17cf874bcec/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/shopping-cart-be/progress/coverage)

# Pure Retail: A platform for market traders, craftspeople, and hobbyists.

## Project Overview

[Trello Board](https://trello.com/b/Fd4uaBH3/shopping-cart-eu3)

[Product Canvas](https://www.notion.so/EU3-Shopping-Cart-2c1a52d3eabe429b95f3c6e56beaf174)


## API doucmentation

**Link to API deployed to Heroku**

**[Production Deployment](https://shopping-cart-pro.herokuapp.com/)** <br/>
**[Staging Deployment](https://shopping-cart-be.herokuapp.com/)**

**[View API Reference Here](https://documenter.getpostman.com/view/10342728/SzmY8MAK?version=latest)** <br />

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
DB_CONNECTION_TEST="mongodb://localhost/shopping-cart-test"
DB_CONNECTION="mongodb://localhost/shopping-cart"
PORT=4000
JWT_SECRET="<put in your jwt_secret here>"
TWILIO_ACCOUNT_SID=<put in your account_sid here>
TWILIO_AUTH_TOKEN=<put in your auth_token here>
TWILIO_NUMBER="<put in your twilio number here>"
STRIPE_SECRET=<put your stripe secret key here>
SENDGRID_API_KEY=<put api key here>
FROM_EMAIL= testemail@gmail.com
STRIPE_CLIENT_ID=<put your stripe secret client here>
STRIPE_HOLDER=123456789000
```

**To start server locally** 
```bash
npm run server
```

**To run test locally**
```bash
npm run test-dev
```

**To apply linting**
```bash
npm run lint
```

## Contributors

|                                                           [Eric Ferguson](https://github.com/erferguson)                                                           |                                                           [Ariunbold Oyungerel](https://github.com/Ariuka11)                                                            |                                      [Ben Kandaris](https://github.com/bkandaris)                                       |                                    [Matthew Vaccaro](https://github.com/MatthewVaccaro)                                     |                                      [Chirag Thesia](https://github.com/ChiragThesia)                                      |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars1.githubusercontent.com/u/52584049?s=460&u=32034f6181618a895af834529028e235058fba45&v=4" width = "200" />](https://github.com/erferguson) | [<img src="https://avatars3.githubusercontent.com/u/48699964?s=460&u=514d79ea927c8f5d7ff4dff0ff95d62da910e97c&v=4     " width = "200" />](https://github.com/Ariuka11) | [<img src="https://avatars0.githubusercontent.com/u/52390565?s=400&u=8e24fb73b6948f658614ce0243f069f8ff2ba757&v=4" width = "200" />](https://github.com/bkandaris) | [<img src="https://avatars2.githubusercontent.com/u/53841280?s=400&u=d6c06a39733194c56c54be7d9cebd4fbf275719c&v=4" width = "200" />](https://github.com/MatthewVaccaro) | [<img src="https://avatars3.githubusercontent.com/u/42698636?s=400&u=d6ea89080dc6454904090a415afe743031909c84&v=4" width = "200" />](https://github.com/ChiragThesia) |
|                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/erferguson)                                       |                                         [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Ariuka11)                                          |                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/bkandaris)                   |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MatthewVaccaro)                  |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ChiragThesia)                  |

<br>

|                                      [Ethan Hoover](https://github.com/Cireimu)                                       |                                      [Mike Edwards](https://github.com/mjedwards)                                      |
| :---------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars0.githubusercontent.com/u/51389138?s=400&u=18a69e46af81bf4cf769af2762631a42ac896852&v=4" width = "200" />](https://github.com/Cireimu) | [<img src="https://avatars1.githubusercontent.com/u/25542428?s=400&u=74aa7f18e07d0773bff95f064e4c88867cd6b4f6&v=4" width = "200" />](https://github.com/mjedwards) |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Cireimu)                 |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mjedwards)                  |

## License

The MIT License (MIT)

Copyright (c) 2020 Pure Retail

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



