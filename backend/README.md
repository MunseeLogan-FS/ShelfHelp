# ShelfHelp Backend

Express.js backend API for ShelfHelp book management application.

## Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run development server
npm run dev

# Run production server
npm start
```

## API Endpoints

- `GET /` - API status
- `GET /api/health` - Health check

## Structure

```
backend/
├── src/
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── config/         # Configuration files
│   └── server.js       # Main server file
├── .env.example
├── .gitignore
└── package.json
```
