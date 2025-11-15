# Feedback Management System - Backend API

## MVC Architecture

```
backend/
├── config/
│   └── db.js              # MongoDB Atlas connection
├── models/
│   └── Feedback.js        # Feedback schema/model
├── controllers/
│   └── feedbackController.js  # Business logic
├── routes/
│   └── feedback.js        # API routes
├── validators/
│   └── feedbackValidator.js  # Input validation middleware
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── server.js             # Entry point
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

### 1. Add Feedback
**POST** `/feedback`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "message": "Excellent service!"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Excellent service!",
    "createdAt": "2025-11-15T10:30:00.000Z",
    "updatedAt": "2025-11-15T10:30:00.000Z"
  }
}
```

---

### 2. Get All Feedbacks
**GET** `/feedback`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "rating": 5,
      "message": "Excellent service!",
      "createdAt": "2025-11-15T10:30:00.000Z",
      "updatedAt": "2025-11-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Feedback by ID
**GET** `/feedback/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Excellent service!",
    "createdAt": "2025-11-15T10:30:00.000Z",
    "updatedAt": "2025-11-15T10:30:00.000Z"
  }
}
```

---

### 4. Get Feedback Statistics
**GET** `/feedback/stats`

**Response:** `200 OK`
```json
{
  "success": true,
  "stats": {
    "totalFeedbacks": 150,
    "averageRating": "4.35",
    "positiveFeedbacks": 120,
    "negativeFeedbacks": 15,
    "neutralFeedbacks": 15,
    "ratingDistribution": [
      { "_id": 5, "count": 80 },
      { "_id": 4, "count": 40 },
      { "_id": 3, "count": 15 },
      { "_id": 2, "count": 10 },
      { "_id": 1, "count": 5 }
    ]
  }
}
```

---

### 5. Update Feedback
**PUT** `/feedback/:id`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "rating": 4,
  "message": "Good service!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Feedback updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "rating": 4,
    "message": "Good service!",
    "createdAt": "2025-11-15T10:30:00.000Z",
    "updatedAt": "2025-11-15T11:00:00.000Z"
  }
}
```

---

### 6. Delete Feedback
**DELETE** `/feedback/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Feedback deleted successfully"
}
```

---

## Error Responses

### Validation Error
**Status:** `400 Bad Request`
```json
{
  "error": "Name is required"
}
```

### Not Found
**Status:** `404 Not Found`
```json
{
  "success": false,
  "error": "Feedback not found"
}
```

### Server Error
**Status:** `500 Internal Server Error`
```json
{
  "success": false,
  "error": "Failed to submit feedback"
}
```

---

## Validation Rules

- **name**: Required, non-empty string
- **email**: Required, valid email format
- **rating**: Required, integer between 1-5
- **message**: Required, non-empty string

---

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 3. Start Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

---

## Test API with cURL

### Add Feedback
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Great service!"
  }'
```

### Get All Feedbacks
```bash
curl http://localhost:5000/api/feedback
```

### Get Stats
```bash
curl http://localhost:5000/api/feedback/stats
```

### Get Feedback by ID
```bash
curl http://localhost:5000/api/feedback/507f1f77bcf86cd799439011
```

### Update Feedback
```bash
curl -X PUT http://localhost:5000/api/feedback/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "rating": 4
  }'
```

### Delete Feedback
```bash
curl -X DELETE http://localhost:5000/api/feedback/507f1f77bcf86cd799439011
```

---

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Enable CORS
- **dotenv**: Environment variables
- **body-parser**: Parse request bodies
- **nodemon**: Auto-restart server (dev)

---

## Health Check

**GET** `/health`

**Response:** `200 OK`
```json
{
  "status": "Server is running"
}
```
