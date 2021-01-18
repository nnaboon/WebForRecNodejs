const cv = require('opencv4nodejs');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const filessystem = require('fs'); 
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
// const resizeImg = require('resize-img');


// const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var url = '';
var values2 = '';

const wCap = new cv.VideoCapture(0);
const FPS = 10;
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 640);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 480);

io.on('connection', (socket) => {
    console.log('we have new connection');

    setInterval(() => {
      const frame = wCap.read();
      const image = cv.imencode('.jpg', frame).toString('base64');
      socket.emit('image', image);
    }, 30);

    app.post('/', (request, response) => {
        response.json(request.body);
        url = JSON.parse(JSON.stringify(request.body));
        var values = url.hi;
        values2 = url.hN;

        var dir = `/Users/naboon/Desktop/HN_Store/HN_${values2}`;

        if (!filessystem.existsSync(dir)){
            filessystem.mkdirSync(dir);
        }else{
            console.log("Directory already exist");
        }

        let a =  values;
        let m =  a.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  
        let b =  Buffer.from(m[2],'base64');
        filessystem.readdir(dir, function(err, files) {
          console.log('file',files.length);
          filessystem.writeFile(`/Users/naboon/Desktop/HN_Store/HN_${values2}/${values2}_${files.length+1}.jpg`,b ,function(err){
            
              if(!err){
                console.log("file is created")
              }
            });
        }); 

    });
    
    socket.on('disconnect', ()=> {
        console.log('User has left');
    })
});
app.use(bodyParser.json({limit: '50mb'}));
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));