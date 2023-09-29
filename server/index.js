const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();
const users = [{}];

app.use(cors());
app.get('/', (req, res) => {
  res.send('Up and running');
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New Connection');

  socket.on('joined', ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit('userJoined', { user: 'Admin', message: `${users[socket.id]} has joined` });
    socket.emit('welcome', { user: 'Admin', message: `Welcome to the chat, ${users[socket.id]}` });
  });

  socket.on('message',({message, id})=>{
    io.emit('sendMessage',{user:users[id],message,id});
  })

  socket.on('close',()=>{
    socket.broadcast.emit('leave',{user: 'Admin', message:`${users[socket.id]} has left the chat`}) ;
    console.log(`${users[socket.id]} Left`); 
  })
});

server.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
