# Mon Vieux Grimoir - Backend

This is the backend for "Mon Vieux Grimoir" website, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js
- pnpm
- MongoDB

## Installation

1. Go to your project directory and clone the repository: 

```bash
git clone https://github.com/sibeni-li/projet_6 backend
cd backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```bash
BDDLOGIN= "Your MongoDB atlas identifiant"
BDDPASSWORD= "Your MongoDB atlas password"
CLUSTER="Your MongoDB atlas cluster"
DATABASE="Your MongoDB atlas DB"
JWT_SECRET_KEY= "Your random token secret"
PORT= "Your PORT number"
```

## Usage

- To start the server in development mode:

```bash
pnpm run dev
```

- To start the server in production mode:

```bash
pnpm start
```

The server will be running at `http://localhost:4000`.

## API Endpoints

- `POST /api/auth/signup`: Create a new user
- `POST /api/auth/login`:  User login
- `POST /api/books/:id/rating`: Create a rating for a book
- `DELETE /api/books/:id`: Delete a book
- `PUT /api/books/:id`: Modify a book
- `POST /api/books/`: Create a new book
- `GET /api/books/bestrating`: Get top 3 rated books
- `GET /api/books/:id`: Get a single book
- `GET /api/books/`: Get all books

## Project Structure

backend/  
├── controllers/  
├── images/  
├── middlewares/  
├── models/  
├── node_modules  
├── routes/  
├── .env  
├── .gitignore  
├── app.js  
├── package.json  
├── pnpm-lock.yaml  
├── README.md  
└── server.js  

## Scripts

- `pnpm start`: Start the server in production mode
- `pnpm run dev`: Start the server in development mode with nodemon
- `pnpm test`: Run tests

## License

Distributed under the OpenClassrooms License.

## Developper

Lisa Sibeni - [log@sibeni.li](mailto:log@sibeni.li)

Project Link: [https://github.com/sibeni-li/projet_6](https://github.com/sibeni-li/projet_6)

Front-end Link : [https://github.com/sibeni-li/P6-Dev-Web-Front-End](https://github.com/sibeni-li/P6-Dev-Web-Front-End)