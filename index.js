// index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import updateGoogleSheet from './googleSheetUpdater.js'

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;
const mongoDBURI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((e) => {
    console.log('Error connecting to MongoDB:', e);
});

app.post('/updateGoogleSheet', async (req, res) => {
    try {
      await updateGoogleSheet();
      res.status(200).json({ message: 'Google Sheet updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update Google Sheet', error });
    }
  });

// Define routes
app.use('/user', userRoute);
  

app.get('/', (req, res) => {
    res.send('Hello! I am Sudhanshu Ranjan.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
