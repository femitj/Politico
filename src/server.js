import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import fileupload from 'express-fileupload';
import fs from 'fs';
import routes from './routes/Routes';
import 'babel-polyfill';
import doc from '../swagger.json';

const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

// render swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));

app.use(cors({
  credentials: true,
  method: ['GET', 'PATCH', 'POST', 'DELETE'],
}));

app.use(express.json());
app.use('/', express.static('UI'));

app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the Politico API' }));

app.use('/api/v1', routes);

// image route
app.get('/api/v1/images/:name', (req, res) => {
  fs.readFile(`./src/uploads/${req.params.name}`, (err, data) => {
    res.status(200).send(data);
  });
});

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = server;
