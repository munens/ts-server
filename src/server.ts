import dotenv from 'dotenv';

// modules:
// e.g. import Games from './games';

dotenv.config();

import Application from './app';

const app = new Application({
  PORT: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbUri: process.env.DB_URI,
  modules: []
});

app.init();
