import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/User.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || 'Internal server error'
    });
});
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
