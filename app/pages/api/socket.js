import { Server } from 'socket.io'


const SocketHandler = (req, res) => {


  if (res.socket.server.io) {
    //console.log('Socket is already running')
  } else {
    
    //console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
        
        socket.user = 'test_user';

        socket.on('join_room', function(data){
          
          let room = data.room;
          let user = data.user;
          socket.user = user;

          console.log('');
          console.log('');
          console.log('');
          console.log('joining room: ' + room);
          console.log('user: ' + socket.user);
          console.log('');
          console.log('');
          console.log('');

          socket.join('#' + room);

          // get list of users in room
          let users = [];
          let clients = io.sockets.adapter.rooms;
          let clientsId = clients.get('#' + room);
          for (let clientId of clientsId) {
            let clientSocket = io.sockets.sockets.get(clientId);
            users.push(clientSocket.user);
          }

          console.log(clients);
          console.log(clients.get('#' + room));
          console.log('');
          console.log('');
          console.log('users: ');
          console.log(users);
          console.log('');
          console.log('');
          // io.in('#main').emit('refresh_rooms');
          
        });

        socket.on('sendMessage', function(data){
          let room = data.room;
          let message = data.message;
          console.log(data);
          console.log('sending message: ' + message);
          console.log('to: ' + room);

          io.in(room).emit('getMessage', {message: message, user: socket.user, room: room});
        });

        socket.on('joinRoom', function(roomName){

          socket.join('#' + roomName);
          let rooms = socket.rooms;
          let roomList = [];
          for (let room of rooms) {
            if (room.startsWith('#')) {
              roomList.push(room);
            }
          }
          

          io.in('#' + roomName).emit('refreshRooms', roomList);

        });

        socket.on('leaving_room', function(data){
          // socket.leave(data);
          // io.in('#main').emit('refresh_rooms');
          // io.in(data).emit('user_left');
        });

        socket.on('room_created', function(data){
            // socket.to('#main').emit('refresh_rooms');
            // io.to(data.id).emit('start_game', data.name);
            // socket.join('$' + data.name);
        })

        socket.on('disconnecting', function(){

          // for (let room of socket.rooms) {

          // }

        });


    })

  }
  res.end()
  
}

export default SocketHandler