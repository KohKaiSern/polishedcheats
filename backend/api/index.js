import express from 'express';
import cors from 'cors';
const app = express();

import { getAddresses } from './getAddresses.js';
import { getItems } from './getItems.js';
import { getNames } from './getNames.js';
import { getMoves } from './getMoves.js';

//Middleware
app.use(cors());

// const allowedOrigins = [
//   'https://polishedcheats.vercel.app'
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.includes(origin)) {
//       callback(null, true);
//     }else {
//       callback(new Error('Not Allowd by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET','POST','PUT','DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));

// Home Route
app.get('/', (req, res) => {
  res.send('Server is functioning!')
})

//Addresses Route
app.get('/api/addresses', (req, res) => {
  res.json(getAddresses());
})

//Items Route
app.get('/api/items', (req, res) => {
  res.json(getItems());
})

//Names Route
app.get('/api/names', (req, res) => {
  res.send(getNames());
});

//Moves Route
app.get('/api/moves', (req, res) => {
  res.send(getMoves());
})

// Start the Server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

export default app;