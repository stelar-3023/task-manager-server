/* eslint-disable @typescript-eslint/no-namespace */
import express, { Express } from 'express';

import { DataSource } from 'typeorm';
import { Task } from './src/tasks/tasks.entity';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { tasksRouter } from './src/tasks/tasks.router';
import { MYSQL_DB, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } from './db.config';


// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse request Body
app.use(bodyParser.json());

// Use CORS install types as well
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: MYSQL_HOST,
  port: 3306,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

// Define sever port
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    // Start listening to the requests on the defined port
    app.listen(port);
    console.log(`Data Source has been initialized on ${port}!`);
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization',
      err,
    );
  });

app.use('/', tasksRouter);
