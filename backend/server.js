import express from 'express';
import dotenv from 'dotenv';

//get config from .env file
dotenv.config();


const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

console.log(process.env.MONGO_URI);
//run the server
app.listen(5000, () => {
  console.log('Server is running on port 5000 -> http://localhost:5000');
});
