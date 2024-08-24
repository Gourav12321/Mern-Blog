const express = require('express');
const cors = require('cors');
const upload = require('express-fileupload');
require('dotenv').config();
const connectDB = require('./db'); // Import the database connection function

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: "https://mern-blog-ui.vercel.app/",
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

// Connect to the database and then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
