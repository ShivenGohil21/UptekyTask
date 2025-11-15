# Postman API Testing Guide

## Setup

**Base URL:** `http://localhost:5000/api`

Make sure your backend server is running:
```bash
cd backend
npm run dev
```

---

## API Endpoints for Postman Testing

### 1. Health Check
**Method:** `GET`  
**URL:** `http://localhost:5000/health`

**Expected Response:**
```json
{
  "status": "Server is running"
}
```

---

### 2. Add New Feedback ✨
**Method:** `POST`  
**URL:** `http://localhost:5000/api/feedback`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "message": "Excellent service! Very satisfied with the experience."
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "_id": "673726f8e4b5a1234567890a",
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Excellent service! Very satisfied with the experience.",
    "createdAt": "2025-11-15T10:30:25.123Z",
    "updatedAt": "2025-11-15T10:30:25.123Z",
    "__v": 0
  }
}
```

---

### 3. Get All Feedbacks 📋
**Method:** `GET`  
**URL:** `http://localhost:5000/api/feedback`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "673726f8e4b5a1234567890a",
      "name": "John Doe",
      "email": "john@example.com",
      "rating": 5,
      "message": "Excellent service! Very satisfied with the experience.",
      "createdAt": "2025-11-15T10:30:25.123Z",
      "updatedAt": "2025-11-15T10:30:25.123Z",
      "__v": 0
    },
    {
      "_id": "673726f8e4b5a1234567890b",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "rating": 4,
      "message": "Good overall, minor improvements needed.",
      "createdAt": "2025-11-15T09:15:10.456Z",
      "updatedAt": "2025-11-15T09:15:10.456Z",
      "__v": 0
    }
  ]
}
```

---

### 4. Get Feedback by ID 🔍
**Method:** `GET`  
**URL:** `http://localhost:5000/api/feedback/673726f8e4b5a1234567890a`

*Replace `673726f8e4b5a1234567890a` with actual feedback ID from step 2 or 3*

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "673726f8e4b5a1234567890a",
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Excellent service! Very satisfied with the experience.",
    "createdAt": "2025-11-15T10:30:25.123Z",
    "updatedAt": "2025-11-15T10:30:25.123Z",
    "__v": 0
  }
}
```

---

### 5. Get Statistics 📊
**Method:** `GET`  
**URL:** `http://localhost:5000/api/feedback/stats`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "totalFeedbacks": 10,
    "averageRating": "4.30",
    "positiveFeedbacks": 8,
    "negativeFeedbacks": 1,
    "neutralFeedbacks": 1,
    "ratingDistribution": [
      { "_id": 5, "count": 5 },
      { "_id": 4, "count": 3 },
      { "_id": 3, "count": 1 },
      { "_id": 2, "count": 1 },
      { "_id": 1, "count": 0 }
    ]
  }
}
```

---

### 6. Update Feedback ✏️
**Method:** `PUT`  
**URL:** `http://localhost:5000/api/feedback/673726f8e4b5a1234567890a`

*Replace `673726f8e4b5a1234567890a` with actual feedback ID*

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "rating": 4,
  "message": "Good service, updated my review."
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Feedback updated successfully",
  "data": {
    "_id": "673726f8e4b5a1234567890a",
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "rating": 4,
    "message": "Good service, updated my review.",
    "createdAt": "2025-11-15T10:30:25.123Z",
    "updatedAt": "2025-11-15T11:45:30.789Z",
    "__v": 0
  }
}
```

---

### 7. Delete Feedback 🗑️
**Method:** `DELETE`  
**URL:** `http://localhost:5000/api/feedback/673726f8e4b5a1234567890a`

*Replace `673726f8e4b5a1234567890a` with actual feedback ID*

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Feedback deleted successfully"
}
```

---

## Testing Validation Errors

### Test 1: Missing Name
**Method:** `POST`  
**URL:** `http://localhost:5000/api/feedback`

**Body:**
```json
{
  "email": "test@example.com",
  "rating": 5,
  "message": "Great!"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "error": "Name is required"
}
```

---

### Test 2: Invalid Email
**Method:** `POST`  
**URL:** `http://localhost:5000/api/feedback`

**Body:**
```json
{
  "name": "John Doe",
  "email": "invalid-email",
  "rating": 5,
  "message": "Great!"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "error": "Invalid email format"
}
```

---

### Test 3: Invalid Rating
**Method:** `POST`  
**URL:** `http://localhost:5000/api/feedback`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 10,
  "message": "Great!"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "error": "Rating must be between 1 and 5"
}
```

---

### Test 4: Missing Message
**Method:** `POST`  
**URL:** `http://localhost:5000/api/feedback`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5
}
```

**Expected Response (400 Bad Request):**
```json
{
  "error": "Message is required"
}
```

---

## Sample Test Data

Add multiple feedbacks to test the statistics endpoint:

```json
// Feedback 1 - Excellent (5 stars)
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "rating": 5,
  "message": "Outstanding service! Highly recommended."
}

// Feedback 2 - Good (4 stars)
{
  "name": "Bob Williams",
  "email": "bob@example.com",
  "rating": 4,
  "message": "Very good experience, minor room for improvement."
}

// Feedback 3 - Average (3 stars)
{
  "name": "Carol Davis",
  "email": "carol@example.com",
  "rating": 3,
  "message": "Average service, met expectations."
}

// Feedback 4 - Poor (2 stars)
{
  "name": "David Brown",
  "email": "david@example.com",
  "rating": 2,
  "message": "Not satisfied with the quality."
}

// Feedback 5 - Very Poor (1 star)
{
  "name": "Eve Martinez",
  "email": "eve@example.com",
  "rating": 1,
  "message": "Very disappointed with the service."
}
```

---

## Quick Start Testing Order

1. **Start Server**: `npm run dev` in backend folder
2. **Health Check**: GET `/health`
3. **Add Feedback**: POST 5 different feedbacks (use sample data above)
4. **Get All**: GET `/api/feedback`
5. **Get Stats**: GET `/api/feedback/stats`
6. **Get by ID**: GET `/api/feedback/:id` (use an ID from step 4)
7. **Update**: PUT `/api/feedback/:id`
8. **Delete**: DELETE `/api/feedback/:id`
9. **Test Validations**: Try the validation error tests

---

## Postman Collection Import (JSON)

Save this as `Feedback_API.postman_collection.json` and import into Postman:

```json
{
  "info": {
    "name": "Feedback Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["health"]
        }
      }
    },
    {
      "name": "Add Feedback",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"rating\": 5,\n  \"message\": \"Excellent service!\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/feedback",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "feedback"]
        }
      }
    },
    {
      "name": "Get All Feedbacks",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/feedback",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "feedback"]
        }
      }
    },
    {
      "name": "Get Feedback Stats",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/feedback/stats",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "feedback", "stats"]
        }
      }
    },
    {
      "name": "Get Feedback by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/feedback/:id",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "feedback", ":id"],
          "variable": [
            {
              "key": "id",
              "value": ""
            }
          ]
        }
      }
    },
    {
      "name": "Update Feedback",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"rating\": 4,\n  \"message\": \"Updated message\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/feedback/:id",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "feedback", ":id"],
          "variable": [
            {
              "key": "id",
              "value": ""
            }
          ]
        }
      }
    },
    {
      "name": "Delete Feedback",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/feedback/:id",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "feedback", ":id"],
          "variable": [
            {
              "key": "id",
              "value": ""
            }
          ]
        }
      }
    }
  ]
}
```

---

## Notes

- Make sure MongoDB Atlas connection is working
- Server must be running on port 5000
- All POST/PUT requests need `Content-Type: application/json` header
- Save the `_id` from responses to use in GET/PUT/DELETE requests
- Rating must be between 1-5
- All fields are required except for updates (you can update partial data)
