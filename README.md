# Booking Website

A full-stack booking application built with React (Vite) frontend and Express.js backend.

## Features

- Resource selection (Table AB, Table C, Room BB)
- Date and time slot selection
- Real-time availability checking
- Booking management (create, view, cancel)
- Responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router

### Backend
- Express.js
- Node.js
- CORS enabled

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on http://localhost:3000

### Frontend Setup
```bash
cd frontend/frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## Deployment

See [DEPLOY.md](./DEPLOY.md) for Render deployment instructions.

## Project Structure

```
Booking-website/
├── backend/          # Express.js API server
│   ├── server.js     # Main server file
│   └── package.json
├── frontend/
│   └── frontend/     # React frontend
│       ├── src/      # Source files
│       └── package.json
├── render.yaml       # Render deployment config
└── README.md
```

## API Endpoints

- `GET /api/slots?date=YYYY-MM-DD&resource=Resource+Name` - Get available slots
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/:date/:resource` - Get bookings for a date/resource
- `DELETE /api/bookings/:id` - Cancel a booking

## License

ISC

