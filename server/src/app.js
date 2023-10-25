import express from 'express';
const port = process.env.PORT || 3001;
import cors from "cors"
import searchRoute from './routes/searchRoutes.js';

const app = express(); // use express middleware to connect the application.

app.use(cors());
app.use('/api/search', searchRoute);

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
