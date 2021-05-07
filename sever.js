const Net = require('net');
// The port on which the server is listening.
const port = 1234;

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Net.Server();
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});
server.on('connection', function(socket) {
    console.log('A new connection has been established.');
    socket.write('Hello, client.');
});