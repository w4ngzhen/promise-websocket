const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 9090});

wss.on('connection', function connection(ws) {

  ws.on('open', _ => {
    console.log('A user join');
  });

  ws.on('message', message => {
    let req = JSON.parse(message);
    console.log('received: %s', req);

    let response = {
      uid: req.uid,
      success: true,
      data: {
        username: req.username,
        dateTime: Date.now(),
        message: `${req.data}`,
      }
    };

    ws.send(JSON.stringify(response));
  });

});
