import express from 'express';

const app = express();

//run the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});