import express from "express";
import cors from "cors";
import { cache } from "./cache.js";
const app = express();

import { getAddresses } from "./getAddresses.js";
import { getItems } from "./getItems.js";
import { getNames } from "./getNames.js";
import { getMoves } from "./getMoves.js";
import { getVersion } from "./getVersion.js";

//Middleware
//CORS
app.use(cors());

// Home Route
app.get("/", (req, res) => {
  res.send(getVersion());
});

//Addresses Route
app.get("/api/addresses", cache(900), (req, res) => {
  res.json(getAddresses());
});

//Items Route
app.get("/api/items", (req, res) => {
  res.send(getItems());
});

//Names Route
app.get("/api/names", (req, res) => {
  res.send(getNames());
});

//Moves Route
app.get("/api/moves", (req, res) => {
  res.send(getMoves());
});

// Start the Server
app.listen(3000, () => {
  console.log(`Server is running on https://polishedcheats-backend.vercel.app`);
});

export default app;
