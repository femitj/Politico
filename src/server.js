import express from 'express';
const bodyParser = require('body-parser');
import dotenv from 'dotenv';
import 'babel-polyfill';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use('/', express.static('UI'));

app.get('/api/v1', (req, res) => {
	return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

const server = app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

module.exports = server;