const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const Message = require("./models/Message");
const uploadRoute = require("./routes/upload");
const path = require("path");

//dotenv.config(); // Load environment variables from .env file
//mongoose.connect(process.env.MONGO_URI);

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // Serve static files from the uploads directory
app.use("/upload", uploadRoute); // Route for handling file uploads

io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => { //listen for joinRoom event
        socket.join(room); //join the specified room
    });

    socket.on("chatMessage", async (data) => { 
        const { room, username, message, fileUrl, fileType } = data;  //create a new message
        const msg = new Message({ room, username, message, fileUrl, fileType }); 
        //await msg.save(); //save the message to the database
        io.to(room).emit("message", msg); //broadcast the message to the room
    });
});

http.listen(3000, () => console.log("Server running on http://localhost:3000"));
