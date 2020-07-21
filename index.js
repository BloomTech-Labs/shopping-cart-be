const server = require('./server');
const port = process.env.PORT;

//bug fix branch

server.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});
