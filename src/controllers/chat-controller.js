const io = require('socket.io');
const userSocketMap = new Map();
const Message = require('../models/message-model');
const moment = require('moment');
exports.onConnect = (socket) =>{

    socket.on('receiverId',(data) =>{
        console.log(socket.id);

    userSocketMap.set(data,socket.id);
      
});

    socket.on('msg',async (data) =>{
        var receiverId = userSocketMap.get(data.receiver);
        var senderId = socket.id;
        var time = data.time;
        console.log("data received");
         socket.join(socket.id);
        socket.join(receiverId);
            
        // Emit the message to both sender and receiver
        socket.emit('sentData', { senderId:senderId, receiverId:receiverId, message: data.message,date:time,connected:receiverId ==null });
        socket.to(receiverId).emit('receiveData', { senderId: senderId,receiverId: receiverId, message: data.message,date:time,connected:receiverId ==null });
        

        const message =new  Message({
            senderId:data.senderId,
            receiverId:data.receiver,
            message:data.message,
            date:data.time
        });
        try {
            await message.save();  // Asynchronous method
        
            console.log('Message saved successfully!');
        
            // Emit messages to sender and receiver (optional)
            // ... (your logic for sending messages)
          } catch (error) {
            console.error('Error saving message:', error);
            // Handle potential errors (e.g., logging, retries, notifications)
          }





        // socket.emit('sendMessage', { senderId, receiverId, message: data.message });

    });



};



exports.sendOldMessage = async (req, res) => {
    var sendiD = req.body.sendid;
    var recid = req.body.receveid;


    try {
        const oldMessages = await Message.find({
            $or: [
                { $and: [{ senderId: sendiD }, { receiverId: recid }] },
                { $and: [{ senderId: recid }, { receiverId: sendiD }] }
            ]
        }).sort({ date: 1 }); // Sorting messages by date in ascending order (optional)


        if (oldMessages.length > 0) {
            res.status(200).json({ oldMessages });
        } else {
            res.status(404).json({ message: "No Messages" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
