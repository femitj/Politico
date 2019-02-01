import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import routes from './routes/Routes';
import 'babel-polyfill';
import doc from '../swagger.json';

const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// render swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));

app.use(express.json());
app.use('/', express.static('UI'));

app.get('/api/v1', (req, res) => {
  return res.status(200).send({message: 'YAY! Congratulations! Your first endpoint is working'});
});

app.use(routes);

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = server;
