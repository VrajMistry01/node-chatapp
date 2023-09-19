const exp = require('express');
const path = require('path');

const app = exp();
const n_server = require('http').createServer(app);
const io = require('socket.io')(n_server);
// Use express.static middleware to serve static files
app.use(exp.static(path.join(__dirname, 'public')));
io.on('connection', function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " joined the chat");
        console.log("User joined the chat:", username);
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " left the chat");
        console.log(username + " left the chat")
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);

        console.log(message.username + ":" + message.text)
    });
});
n_server.listen(3000, () => {
    console.log('Server is running on port 3000');
});