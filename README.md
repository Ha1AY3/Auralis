<div align="center">

# 🎵 Auralis

## AI-Powered Mood-Based Music Recommendation System

</div>

## 📖 About The Project

**Auralis** is an intelligent web application that uses your facial expressions to detect your current mood in real-time and recommend personalized music accordingly. Instead of asking "How are you feeling?", Auralis **knows** – automatically.

---
## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎥 **Real-time Mood Detection** | Uses MediaPipe to analyze facial expressions and detect emotions |
| 🎧 **Smart Music Recommendations** | Automatically suggests 5 songs based on your detected mood |
| ❤️ **Favorites System** | Save songs you love for quick access |
| 📊 **Mood History** | Auto-tracked timeline of your emotional journey |
| 📓 **Emotion Timeline** | View mood stats and history with beautiful visualizations |
| 🎵 **Full Song Playback** | Stream full songs from Jamendo's library of 500,000+ tracks |
| 🎨 **Dynamic UI** | Glass-morphism design that adapts to your mood |

---
## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool |
| **SCSS** | Styling |
| **MediaPipe** | Face Detection & Emotion Recognition |
| **Axios** | API Calls |
| **React Router** | Navigation |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication |
| **Bcrypt** | Password Hashing |

### APIs
| Service | Purpose |
|---------|---------|
| **Jamendo API** | Music Streaming |
| **MediaPipe** | Face Detection |

---
## 📁 Project Structure

```text
auralis/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   └── services/        # External API services
│   ├── .env                 # Environment variables
│   ├── server.js            # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/          # Images & assets
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context providers
│   │   ├── features/        # Feature-based modules
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── styles/          # Global styles
│   ├── .env
│   ├── index.html
│   └── package.json
│
└── README.md
```
---

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or later)
- npm
- MongoDB Atlas account
- Jamendo API Client ID
- Redis Database

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Ha1AY3/Auralis.git
cd Auralis
```

---

# ⚙️ Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

JAMENDO_CLIENT_ID=your_jamendo_client_id
```

Start the backend server.

```bash
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

---

# 💻 Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend.

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🗄️ MongoDB Setup

1. Create a MongoDB Atlas account.
2. Create a free cluster.
3. Create a database user.
4. Allow IP Address:

```
0.0.0.0/0
```

5. Copy the connection string.

Example:

```text
mongodb+srv://username:password@cluster.mongodb.net/
```

Paste it into:

```env
MONGO_URI=
```

---

# 🎵 Jamendo API Setup

1. Visit the Jamendo Developer Portal.
2. Create an application.
3. Copy your Client ID.

Add it to `.env`

```env
JAMENDO_CLIENT_ID=your_client_id
```

---

# 🔐 Redis Setup

Create a Redis Cloud database and copy:

```env
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

Paste them into your backend `.env`.

---

# 📦 Seed the Database

Once the backend is running, populate songs from Jamendo.

Using Postman:

```
POST
http://localhost:3000/api/seed
```

Or using curl:

```bash
curl -X POST http://localhost:3000/api/seed
```

---

# 🧪 Running the Application

Start Backend

```bash
cd backend
npm run dev
```

Start Frontend

```bash
cd frontend
npm run dev
```

Open

```
http://localhost:5173
```

---

# 🎯 How It Works

```text
User opens camera
        │
        ▼
MediaPipe detects face
        │
        ▼
Emotion is analyzed
(Happy, Sad, Angry, Neutral, Surprised)
        │
        ▼
Backend fetches songs matching emotion
        │
        ▼
User receives recommendations
        │
        ▼
User can:
• Play songs
• Like songs
• View favorites
• Track mood history
```

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/get-me | Get Current User |
| POST | /api/auth/logout | Logout User |

---

## Songs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/songs?mood=happy | Get Songs |

---

## Likes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/likes/:songId | Like Song |
| GET | /api/likes | Get Liked Songs |
| DELETE | /api/likes/:songId | Unlike Song |

---

## Mood

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/mood | Save Mood |
| GET | /api/mood | Get Mood History |
| GET | /api/mood/stats | Get Mood Statistics |

---

# 🚀 Deployment

## Backend (Render)

- Push project to GitHub
- Create a Render Web Service
- Root Directory:

```
backend
```

Build Command

```bash
npm install
```

Start Command

```bash
npm start
```

Add all environment variables.

Deploy.

---

## Frontend (Vercel)

Import the GitHub repository.

Root Directory

```
frontend
```

Environment Variable

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

Deploy.

---

# ⚠️ Common Issues

### MongoDB Connection Error

Check:

- MONGO_URI
- Network Access
- Database User

---

### CORS Error

Update backend CORS origin.

Example:

```javascript
origin: "https://your-vercel-app.vercel.app"
```

---

### Songs Not Playing

Verify:

- Jamendo API Client ID
- Internet Connection

---

### Emotion Detection Not Working

Allow camera permissions in your browser.

---

# 🤝 Contributing

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

- MediaPipe
- Jamendo API
- MongoDB Atlas
- Redis Cloud
- React
- Express.js
- Vercel
- Render

---

# 👨‍💻 Author

**Hajar**

GitHub:
https://github.com/Ha1AY3

Project Repository:
https://github.com/Ha1AY3/Auralis

---

⭐ If you found this project useful, consider giving it a **star** on GitHub!
