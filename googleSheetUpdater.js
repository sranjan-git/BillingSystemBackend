// const { google } = require('googleapis');
import {google} from 'googleapis';
const sheets = google.sheets('v4');
// const mongoose = require('mongoose');
import {mongoose} from 'mongoose';
// const User = require('./models/User'); // Your user model
import User from './models/users.model.js';

// console.log("MongoDB ID: "+process.env.MongoDBURI) hello ;
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateGoogleSheet = async() => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './google.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();

  const spreadsheetId = '1UyC7-9NsF3lUayAaX5XGA0dsdTlH-mV5Pg1LGlmtSE4';
  const range = 'Sheet1!A2:E2'; // Adjust the range as needed

  const users = await User.find({});
  const values = users.map(user => {
    const usedStorage = user.usedAssets;
    const totalStorage = user.totalAssets;
    const storagePercentage = (usedStorage / totalStorage) * 100;

    return [user.firebaseId, user.email, totalStorage, usedStorage, storagePercentage];
  });

  const resource = {
    values,
  };

  sheets.spreadsheets.values.update(
    {
      auth: client,
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource,
    },
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${result.updatedCells} cells updated.`);
      }
    }
  );
}

export default updateGoogleSheet;
