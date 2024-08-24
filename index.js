require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const upload = require('express-fileupload');
const connectDB = require('./db');
const allowedOrigins = [
  'https://mern-blog-ui.vercel.app/',
  'http://localhost:3000'
];
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET, POST, PUT, PATCH, DELETE",
  allowedHeaders: 'Authorization, Content-Type',
}));

app.use(upload());

app.get("/", (req, res) => {
  res.json({ message: "Server is Running" });
});

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
