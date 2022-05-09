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
    1: 'Bā',
    2: 'Tā',
    3: 'Thā',
    4: 'Jīm',
    5: 'Ḥā',
    6: 'Khā',
    7: 'Dāl',
    8: 'Dhāl',
    9: 'Rā',
    10: 'Zāy',
    11: 'Sīn',
    12: 'Shīn',
    13: 'Ṣād',
    14: 'Ḍād',
    15: 'Ṭā',
    16: 'Ẓā',
    17: 'Ayn',
    18: 'Ghayn',
    19: 'Fā',
    20: 'Qāf',
    21: 'Kāf',
    22: 'Lām',
    23: 'Mīm',
    24: 'Nūn',
    25: 'Hā',
    26: 'Wāw',
    27: 'Yā'
}

const ARB_CHAR_CLASS = {
    0: 'ا',
    1: 'ب',
    2: 'ت',
    3: 'ث',
    4: 'ج',
    5: 'ح',
    6: 'خ',
    7: 'د',
    8: 'ذ',
    9: 'ر',
    10: 'ز',
    11: 'س',
    12: 'ش',
    13: 'ص',
    14: 'ض',
    15: 'ط',
    16: 'ظ',
    17: 'ع',
    18: 'غ',
    19: 'ف',
    20: 'ق',
    21: 'ك',
    22: 'ل',
    23: 'م',
    24: 'ن',
    25: 'ه',
    26: 'و',
    27: 'ي'
}