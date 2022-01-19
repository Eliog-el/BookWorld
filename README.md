# Shopify-Backend-Internship-Challenge-2021

## Background

This is a Node application created for Shopify's 2022 backend developer intern challenge. It is meant to act as a backend server for an inventory tracking web application for a logistics company.
Before I get to the details of the application, I just want to say thanks for taking the time to consider my application :smiley:

## Project Structure

The application is initiated through the `index.js` file. This file contains the entry point for the application where the express application is created. In
addition, the routes are created, the middleware is mounted, and the connection to mongoDB is made.

The `model` folder contains the schema for the mongo database. They are used to ensure that the data being saved to the database is in a format that
conforms with the business logic of the application. There are four data objects which are `books`, `genres` and `sales`. They correspond to the
users of the application, the images made available by the users, and the transactions between users (i.e the sale of images from one user to another). The
following are the schemas for the described data objects.

```javascript
const bookSchema = Schema({
  title: { type: String, required: true, trim: true, minlength: 5, maxlength: 255 },
  author: { type: String, required: true, minlength: 5, maxlength: 115 },
  description: { type: String, required: true },
  genre: { type: genreSchema, required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true, default: 0 },
  productImage: { type: String, required: true }, // image uploads AND storing image
});
```

```javascript
const genreSchema = Schema({
  name: { type: String, required: true, minlenght: 5, maxlenght: 50 },
});
```

```javascript
const saleSchema = Schema({
  book: { type: new mongoose.Schema({ title: { type: String, required: true, trim: true,minlength: 5,maxlength: 255 },
  dailysaleRate: { type: Number,required: true,min: 0,max: 255 },
  price: { type: Number,required: true } }),
  required: true } },
  dateSold: { type: Date, default: Date.now },
  quantity: { type: Number, min: 1, validate: {   validator: Number.isInteger,   message: "quantity must be an integer", },
});
```

Next, the `routes` folder contains the endpoints that are made available by the application. There is a file for each of the models. Each of the models have their corresponding GET, POST, PUT, and DELETE endpoints in their
respective route file.

## Running The Application Locally

Now that you have a good understanding of how this project is structured, lets talk about how you can run this on your own machine. Here are the things you will
need to get this application up and running:

1. Have node installed (I'm running version 14.18.2)
2. Have mongodb installed (I'm running version 4.2.0)

Now we can proceed with the project. Follow these steps:

1. Start mongo with `mongod --dbpath <path of folder where you want the data to be stored>` by default it will be running on localhost:27017 which is what the
   application assumes
2. Install the required libraries by navigating to the root of the application directory and running `npm install`
3. In the terminal jwtPrivateKey must be defined first before running the application: `export bookworld_jwtPrivateKey=mySecureKey`
4. To start the application run `npm start` but if you want to run the tests please use `npm test`

Typically, I would put certain values into the environment variables but to keep it simple and easy for anyone to run locally, many the values such as the server
port, database name, jwtPrivateKey have been hard coded.

## API Documentation

### POST /books

Used to add books into the application database.

Requires `title` and `author`, `description`, `genreId`, `price`, `numberInStock`, `productImage` ,in the body.

### GET /books/:id

Used to fetch a specific book using their id.

Requires `id` of the user in the params.

### GET /books

Used to get all books in the database.

### PUT /books/:id

Used to fetch a specific book using their id and update.

Requires `id` of the user in the params.

Requires `title` and `author`, `description`, `genreId`, `price`, `numberInStock`, `productImage` ,in the body.

Example:

```json
{
  "title": "Tongues",
  "description": "Awesome book",
  "author": "Ladeeee",
  "price": "76",
  "genreId": "61e6b352a30b204a50c89868",
  "numberInStock": 5
}
```

### DELECT /books

Used to fetch a specific book using their id and delete it.

Requires `id` of the user in the params.

### POST /sales

Used to create a new sale

Example:

```json
{
  "bookId": "61dd5cb282231690a104dfbb"
}
```

### GET /sales/:id

Used to get a specific sale transaction from database

Requires `id` in the params

### GET /sales

Used to get multiple sales transaction from database and sort by `dateOut`

### PUT /sales/:id

Used to update an existing sale

### POST /genres

Used to create a genre

Genre is used to save the books in category

Example:
```json
{
    "name": "Horror"
}
```

### GET /genre/:id

Used to fetch a specific genre

### GET /genre

Used to fetch many tgenre

### PUT /genres/:id

Used to update an existing genre

Body accepts the same fields as POST /genres

### DELETE /genre/:id

Used to delete an existing genre
