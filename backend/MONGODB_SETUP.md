# MongoDB Atlas Configuration ✅

## Connection Status
✅ **Connected to MongoDB Atlas**

---

## Configuration Details

### 1. Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://shivengohil210204_db_user:f4bT2o9TQGwE5k6L@cluster0.mongodb.net/feedback_system?retryWrites=true&w=majority
```

**Credentials:**
- Username: `shivengohil210204_db_user`
- Password: `f4bT2o9TQGwE5k6L`
- Cluster: `cluster0.mongodb.net`
- Database: `feedback_system`

---

### 2. Database Connection (config/db.js)
```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Atlas connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
```

---

### 3. Dependencies
✅ **Installed:**
- mongoose (MongoDB ODM)
- express
- cors
- dotenv
- body-parser
- nodemon

❌ **Removed:**
- mysql2 (no longer needed)

---

## Data Model

### Feedback Schema
```javascript
{
  name: String (required),
  email: String (required),
  rating: Number (1-5, required),
  message: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## How to Start Backend

### Development Mode
```bash
cd backend
npm run dev
```

### Production Mode
```bash
cd backend
npm start
```

The server will automatically connect to your MongoDB Atlas cluster on startup.

---

## Verify Connection

Once the server starts, you should see:
```
Server running on http://localhost:5000
MongoDB Atlas connected successfully
```

---

## Collection Name
MongoDB will automatically create a collection named: **`feedbacks`**

---

## Notes
- No local MongoDB installation required
- No SQL files needed
- All data stored in MongoDB Atlas cloud
- Automatic timestamps with Mongoose
- Connection string includes authentication and SSL by default
