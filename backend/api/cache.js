import NodeCache from "node-cache";

const serverCache = new NodeCache();

export const cache = (duration) => (req, res, next) => {
  //Check if key exists in cache
  const key = req.originalUrl;
  const cachedResponse = serverCache.get(key);
  //If it exists, send cache result
  if (cachedResponse) {
    res.send(cachedResponse);
  }
  //If not replace .send with method to set response to cache
  else {
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      serverCache.set(key, body, duration);
    };
    next();
  }
};
