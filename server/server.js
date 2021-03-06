var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

mongoose.connect('mongodb://localhost/INSEE');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Item details add and retrieve apis start
var User = mongoose.model('User', {
    email: String,
    password: String,
});

var Hardware = mongoose.model('Hardware' , {
    email : String,
    hardware : [String],
})

app.post('/api/user', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }).exec(function (err, items) {
        if (err)
            res.send(err)

        res.json(items);
    });
});

app.get('/api/hardwares/:email', function (req, res) {
    Hardware.find({ email: req.params.email}).exec(function (err, items) {
        if (err)
            res.send(err)

        res.json(items);
    });
});
//Item details add and retrieve apis end


app.listen(8080);
console.log("App listening on port 8080");