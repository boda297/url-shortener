# URL Shortener

A simple URL shortener built with Node.js, Express, MongoDB (Mongoose), and `nanoid`. This project allows you to convert long URLs into short, manageable links.

## Features

- Generate short URLs from long ones.
- Redirect short URLs to their original destinations.
- Stores URLs in a MongoDB database.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **ID Generation:** `nanoid`
- **Environment Management:** `dotenv`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A MongoDB database (either local or MongoDB Atlas).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/boda297/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

### Running the Application

To start the server in development mode (using `nodemon`):
```bash
npm run dev
```

To start the server normally:
```bash
node server.js
```

The application will be running at `http://localhost:3000` (or the port specified in your `.env`).

## License

This project is licensed under the ISC License.
