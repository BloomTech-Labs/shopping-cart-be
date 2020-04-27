const server = require('./server');
const port = process.env.PORT;

//Test Branch

server.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});
