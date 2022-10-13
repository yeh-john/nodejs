const express = require("express");
const app = express();
const http =  require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// on => 受け取る
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chat-message", (msg) => {
        // console.log("Message: "+ msg);

        //サーバーがクライアントから受け取ったメッセージをもう一度クライアントに返す
        io.emit("chat-message", msg); 
    });
})

server.listen(PORT, () => {
    console.log("listening on 3000");
});