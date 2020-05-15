
[![Build Status](https://travis-ci.org/LABS-EU3/shopping_cart_backend.svg?branch=develop)](https://travis-ci.org/LABS-EU3/shopping_cart_backend) [![Maintainability](https://api.codeclimate.com/v1/badges/d4c6d2ecd17cf874bcec/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/shopping-cart-be/progress/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d4c6d2ecd17cf874bcec/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/shopping-cart-be/progress/coverage)

# Pure Retail: A platform for market traders, craftspeople, and hobbyists.

## Project Overview

[Trello Board](https://trello.com/b/Fd4uaBH3/shopping-cart-eu3)

[Product Canvas](https://www.notion.so/EU3-Shopping-Cart-2c1a52d3eabe429b95f3c6e56beaf174)


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

|                                    [Benjamin Ajewole](https://benjaminajewole.com/)                                     |                                 [Alexander Oguejiofor.](https://github.com/kip-guile)                                  |                                      [Apetsi Ampiah](https://github.com/aapetsi)                                      |                                    [Dimeji Lawal-Are](https://github.com/DimejiAre)                                     |                                     [Justin Irabor](https://github.com/vunderkind)                                      |
| :---------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars0.githubusercontent.com/u/30627428?s=400&v=4" width = "200" />](https://github.com/Rexben001) | [<img src="https://avatars1.githubusercontent.com/u/38817414?s=400&v=4" width = "200" />](https://github.com/kip-guile) | [<img src="https://avatars3.githubusercontent.com/u/35830971?s=400&v=4" width = "200" />](https://github.com/aapetsi) | [<img src="https://avatars1.githubusercontent.com/u/26689297?s=400&v=4" width = "200" />](https://github.com/DimejiAre) | [<img src="https://avatars1.githubusercontent.com/u/13500685?s=400&v=4" width = "200" />](https://github.com/vunderkind) |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Rexben001)                  |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/kip-guile)                 |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/aapetsi)                  |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/DimejiAre)                  |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/vunderkind)                 |

<br>

|                                                                                                            [Shaun Orpen](https://github.com/shaunorpen)                                                                                                            |                                                           [Tolu Atolagbe](https://github.com/tolls-3)                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars1.githubusercontent.com/u/2945878?s=400&v=4" width = "200" />](https://github.com/shaunorpen) | [<img src="https://avatars1.githubusercontent.com/u/53542238?s=400&v=4" width = "200" />](https://github.com/tolls-3) |
|                                                                                      [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/shaunorpen)                                                                                       |                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/tolls-3)                                       |

## License

The MIT License (MIT)

Copyright (c) 2020 Pure Retail

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



