const { response } = require('express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000
const app = express();

app.use(bodyParser.json());


// app.get('/', function (req, res) {
//     res.send("Naboon Srisawasdi");
//     console.log(res.body);
// });

app.post('/', (request, response) => {
    response.json(request.body);
    console.log(request.body);
  });

app.use(cors());
app.listen(PORT, function () {
    console.log('Example app listening on port 4000!');
  });