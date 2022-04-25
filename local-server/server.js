let express = require("express");
let app = express();
const path = require('path');
let ejs = require('ejs');
var image = require('../static/image_class')

// app.use(function(req, res, next) {
//     console.log(`${new Date()} - ${req.method} request for ${req.url}`);
//     next();
// });
app.set('view engine', 'ejs');

app.use(express.static("../static"));

let reqPath = path.join(__dirname, '../');

app.get('/', function(req, res) {
    res.render('home.ejs');
});

app.get('/digit', function(req, res) {
    res.render('digit_option.ejs');
});

app.get('/digit/learn', function(req, res) {
    var digit = req.query.choice;
    // console.log(digit);
    if(digit === undefined) res.render('digit_choice.ejs');
    else {
        res.render('digit_learn.ejs', {digit, english: ENG_NUMBER_CLASSES[digit], arabic: ARB_NUMBER_CLASSES[digit]});
    }
});

app.get('/digit/learn_choice', function(req, res) {
    res.render('digit_learn.ejs');
});

app.get('/digit/test', function(req, res) {
    res.render('predict.ejs');
});

app.listen(3232, function() {
    console.log("Server static on 3232");
});

const ARB_NUMBER_CLASSES = {
    0: 'Sifr',
    1: 'WaaHid',
    2: 'Ithnaan',
    3: 'Thalaatha',
    4: 'Arbiya',
    5: 'Khamsa',
    6: 'Sitta',
    7: 'Sabya',
    8: 'Thamaaniya',
    9: 'Tisya'
}

const ENG_NUMBER_CLASSES = {
    0: 'Zero',
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine'
}