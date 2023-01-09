require("dotenv").config();
const redis = require("redis");

const getClient =  () => {
  return redis.createClient({
    url: 'redis://redis:6379'
  });
};

let client =  getClient();
const connect = async() => {
  await client.connect();
};

const get = async (key) => {
  const data = await client.get(key);
  return data;
};

const set = async (key, value, time) => {
  return await client.set(key, value, { EX: process.env.REDIS_EXT * time });
};

const reset = async () => {
  return await client.reset();
};

const del = async (key) => {
  return await client.del(key);
};

module.exports = {
  connect,
  get,
  set,
  reset,
  del,
};
