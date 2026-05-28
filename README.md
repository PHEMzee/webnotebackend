# WebNote Backend

Express.js API server for the WebNote application. Manages note CRUD operations and MongoDB database interactions.

## 🎯 Purpose

RESTful API backend that:
- Handles note creation, retrieval, updates, and deletion
- Manages MongoDB database connections
- Provides CORS-enabled endpoints for the React frontend
- Handles business logic and data validation
- Supports environment-based configuration

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for building REST APIs
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling and validation
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload (dev dependency)

## 📂 Project Structure

```
webnotebackend/
├── models/
│   └── Note.js              # Mongoose schema for notes
├── routes/
│   └── noteRoutes.js        # API route handlers
├── utils/
│   └── noteUtils.js         # Utility functions
├── server.js                # Express app setup & server start
├── .env                     # Environment variables (not in repo)
├── package.json             # Dependencies & scripts
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
├── Procfile                 # Deployment manifest for Render/Heroku
├── render.yaml              # Render deployment config
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud)

### Installation

1. **Navigate to backend directory**
   ```bash
   cd webnotebackend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   touch .env
   ```

4. **Configure environment variables** (`.env`)
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/webnote
   NODE_ENV=development
   ```

   For MongoDB Atlas cloud:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/webnote?retryWrites=true&w=majority
   ```

### Development Server

```bash
npm run dev
```

Uses Nodemon for automatic reload on file changes. Server runs at `http://localhost:5000`

### Production Server

```bash
npm start
```

Starts the server without watch mode. Suitable for production deployments.

## 📜 Available Scripts

### `npm start`
Runs `node server.js` - starts the Express server

### `npm run dev`
Runs `nodemon server.js` - starts with auto-reload on file changes

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000
```

### Routes

#### Get all notes
```http
GET /notes
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My Note",
    "content": "Note content here",
    "createdAt": "2024-05-28T10:30:00.000Z",
    "updatedAt": "2024-05-28T10:30:00.000Z"
  }
]
```

#### Get a specific note
```http
GET /notes/:id
```
**Parameters:**
- `id` (string, required) - MongoDB note ID

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Note",
  "content": "Note content here",
  "createdAt": "2024-05-28T10:30:00.000Z",
  "updatedAt": "2024-05-28T10:30:00.000Z"
}
```

#### Create a new note
```http
POST /notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here"
}
```
**Response:** (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Note",
  "content": "Note content here",
  "createdAt": "2024-05-28T10:30:00.000Z",
  "updatedAt": "2024-05-28T10:30:00.000Z"
}
```

#### Update a note
```http
PUT /notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```
**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Title",
  "content": "Updated content",
  "createdAt": "2024-05-28T10:30:00.000Z",
  "updatedAt": "2024-05-28T10:30:00.000Z"
}
```

#### Delete a note
```http
DELETE /notes/:id
```
**Response:** (204 No Content or success message)

### Health Check
```http
GET /
```
**Response:**
```
Server is up and running!
```

## 📊 Database Schema

### Note Model

```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Validation:**
- `title` - Required, string
- `content` - Required, string

See [models/Note.js](./models/Note.js) for complete schema definition.

## 🔐 Environment Variables

Create a `.env` file in the `webnotebackend` directory:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/webnote` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🐳 Docker Support

### Build Image
```bash
docker build -t webnote-backend .
```

### Run Container
```bash
docker run -p 5000:5000 --env-file .env webnote-backend
```

### Docker Compose
```bash
docker-compose up --build
```

Starts MongoDB and the backend server together.

## 📦 Production Deployment

### Render.com (Recommended)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in dashboard
4. Deploy using `render.yaml` or manual setup

See [render.yaml](./render.yaml) for configuration.

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create webnote-backend

# Set environment variables
heroku config:set MONGO_URI=mongodb+srv://...
heroku config:set PORT=5000

# Deploy
git push heroku main
```

### Other Platforms
Ensure:
- `PORT` environment variable is configurable
- `MONGO_URI` is set to cloud MongoDB connection
- Node.js buildpack is available

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Get all notes
curl http://localhost:5000/notes

# Create a note
curl -X POST http://localhost:5000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Test note"}'

# Get a note
curl http://localhost:5000/notes/{note_id}

# Update a note
curl -X PUT http://localhost:5000/notes/{note_id} \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"Updated content"}'

# Delete a note
curl -X DELETE http://localhost:5000/notes/{note_id}
```

### Using Postman

1. Import endpoints from this documentation
2. Set base URL to `http://localhost:5000`
3. Create requests for each endpoint
4. Test with sample data

## 🔍 Middleware

### CORS
Enables cross-origin requests from the frontend

### Express JSON Parser
Parses incoming JSON request bodies

### MongoDB Connection
Establishes connection on server startup

## 📝 File Descriptions

### server.js
Main server file that:
- Loads environment variables
- Initializes Express app
- Configures middleware
- Connects to MongoDB
- Sets up routes
- Starts the server

### models/Note.js
Mongoose schema defining the Note data structure with validation rules.

### routes/noteRoutes.js
Route handlers for all CRUD operations on notes.

### utils/noteUtils.js
Utility functions for note operations and helpers.

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Check MongoDB is running locally, or
- Verify cloud MongoDB URI in `.env`
- Check network connectivity for Atlas

### Port Already in Use
```bash
# Use different port
PORT=3001 npm run dev

# Or find and kill process
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
- Check CORS is enabled in server.js
- Verify frontend URL is correct
- Check backend is running

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Dependencies Explained

| Package | Purpose |
|---------|---------|
| express | Web framework for REST API |
| mongoose | MongoDB ORM and validation |
| cors | Enable cross-origin requests |
| dotenv | Environment variable loading |
| nodemon | Auto-reload during development |

## 🔗 Related

- [Main README](../README.md) - Full project documentation
- [Frontend README](../mywebnote/README.md) - React frontend
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 📋 Development Workflow

1. Create a feature branch
2. Make changes to routes/models/utils
3. Test using cURL or Postman
4. Ensure MongoDB connection works
5. Check CORS is working with frontend
6. Commit and push changes
7. Create pull request

## ✨ Best Practices

- Use environment variables for sensitive data
- Validate input data in routes
- Use meaningful error messages
- Keep business logic in utils
- Use Mongoose schemas for data validation
- Implement proper error handling
- Log important operations

---

**Built with Express.js & MongoDB**
