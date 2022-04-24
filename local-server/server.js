let express = require("express");
let app = express();
const path = require('path');

// app.use(function(req, res, next) {
//     console.log(`${new Date()} - ${req.method} request for ${req.url}`);
//     next();
// });

app.use(express.static("../static"));

let reqPath = path.join(__dirname, '../');

app.get('/', function(req, res) {
    res.sendFile(reqPath + '/static/home.html');
});

app.get('/digit', function(req, res) {
    res.sendFile(reqPath + '/static/predict.html');
});

app.listen(3232, function() {
    console.log("Server static on 3232");
});
