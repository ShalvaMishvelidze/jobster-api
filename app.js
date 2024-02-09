require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.send('jobs api');
});

const port = process.env.PORT || 3535;

const start = async () => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
