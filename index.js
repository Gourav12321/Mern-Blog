const express = require('express');
const cors = require('cors');
// const { connect } = require('mongoose');
const upload = require('express-fileupload')
require('dotenv').config();
const db = require("./db")


const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));

app.use(cors({
  credentials: true, 
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, PATCH, DELETE",
  allowedHeaders: 'Authorization, Content-Type',

}));

app.use(upload());


app.get("/", (req, res) => {
  res.json({message:"Server in Running"});
  console.log("Fasdfa")
});

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001; // Use process.env.PORT or default to 5000



// connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(error => {
//     console.error('Failed to connect to MongoDB:', error);
//   });
app.listen(PORT,()=>{
  console.log(`server running port no : ${PORT}`)
})