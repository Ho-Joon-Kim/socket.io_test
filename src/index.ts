import * as WebSocket from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const wss = new WebSocket.Server({ port: 3001 });
  
/*
wss.on('connection', function connection(ws, req) {

  const ip = req.socket.remoteAddress;
  console.log(ip);

  ws.on('message', incoming(data) => {
    wss.clients.forEach(each(client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});*/

wss.on('connection', (ws: WebSocket, req : any) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        //ws.send(`Hello, you sent -> ${message}`);

        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
        client.send("brodcast: "+message);
      }
        });
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});