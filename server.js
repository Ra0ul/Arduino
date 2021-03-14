const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const serialPort = require('serialport');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

const serialport = new serialPort('/dev/cu.usbmodem144201', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControls: false
});

let RedCount = 0;
let GreenCount = 0;
let buttonUpdate = "";

io.on('connection', (client) => {
  console.log('Client connected...');
  io.emit("back", buttonUpdate);


  client.on('RedClicked', () => {
    RedCount++;
    let RedOnOff = RedCount % 2;
    console.log(`Red LED: ${RedOnOff} / RedCount: ${RedCount}`);
    if (RedOnOff == '1') {
      serialport.write('1');
      console.log(`Red ON`);
      io.emit("RedUpdate", RedOnOff);
      buttonUpdate = "red"


    } else if (RedOnOff == '0') {
      serialport.write('0');
      console.log(`Red OFF`);
      io.emit("RedUpdate", RedOnOff);
      buttonUpdate = "white"
    }
  });

  client.on('GreenClicked', () => {
    GreenCount++;
    let GreenOnOff = GreenCount % 2;
    console.log(`Green LED: ${GreenOnOff} / GreenCount: ${GreenCount}`);
    if (GreenOnOff == '1') {
      serialport.write('2');
      console.log('Green ON');
      io.emit("GreenUpdate", GreenOnOff);
      buttonUpdate = "green"

    } else if (GreenOnOff == '0') {
      serialport.write('3');
      console.log('Green OFF');
      io.emit("GreenUpdate", GreenOnOff);
      buttonUpdate = "white"
    }
  });

});

serialport.on('open', () => {
  console.log('open serial communication');
})

server.listen(3000, () => {
  console.log('listening on: 3000');
});
