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

app.get('/character', function(req, res) {
    res.render('character_option.ejs');
});

app.get('/digit/learn', function(req, res) {
    var digit = req.query.choice;
    // console.log(digit);
    if(digit === undefined) res.render('digit_choice.ejs');
    else {
        res.render('digit_learn.ejs', {digit, english: ENG_NUMBER_CLASSES[digit], arabic: ARB_NUMBER_CLASSES[digit]});
    }
});

app.get('/character/learn', function(req, res) {
    var digit = req.query.choice;
    // console.log(digit);
    if(digit === undefined) res.render('character_choice.ejs');
    else {
        res.render('character_learn.ejs', {digit, arb_char: ARB_CHAR_CLASS[digit], arb_prnc: ARB_CHAR_PRONOUNCE_CLASS[digit]});
    }
});

// app.get('/digit/learn_choice', function(req, res) {
//     res.render('digit_learn.ejs');
// });

app.get('/digit/test', function(req, res) {
    res.render('digit_test.ejs');
});

app.get('/character/test', function(req, res) {
    res.render('character_test.ejs');
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

const ARB_CHAR_PRONOUNCE_CLASS = {
    0: 'Alif',
    1: 'B??',
    2: 'T??',
    3: 'Th??',
    4: 'J??m',
    5: 'H????',
    6: 'Kh??',
    7: 'D??l',
    8: 'Dh??l',
    9: 'R??',
    10: 'Z??y',
    11: 'S??n',
    12: 'Sh??n',
    13: 'S????d',
    14: 'D????d',
    15: 'T????',
    16: 'Z????',
    17: 'Ayn',
    18: 'Ghayn',
    19: 'F??',
    20: 'Q??f',
    21: 'K??f',
    22: 'L??m',
    23: 'M??m',
    24: 'N??n',
    25: 'H??',
    26: 'W??w',
    27: 'Y??'
}

const ARB_CHAR_CLASS = {
    0: '??',
    1: '??',
    2: '??',
    3: '??',
    4: '??',
    5: '??',
    6: '??',
    7: '??',
    8: '??',
    9: '??',
    10: '??',
    11: '??',
    12: '??',
    13: '??',
    14: '??',
    15: '??',
    16: '??',
    17: '??',
    18: '??',
    19: '??',
    20: '??',
    21: '??',
    22: '??',
    23: '??',
    24: '??',
    25: '??',
    26: '??',
    27: '??'
}