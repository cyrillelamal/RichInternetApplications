const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

// ================================== MONGOOSE =========================================
// =====================================================================================
const MONGO_PASS = process.env.MONGO_PASSWORD;
const DB_NAME = 'mongoose_test';

const urlmongo = "mongodb+srv://horoshijavtobus:"
    + MONGO_PASS
    + "@horoshijavtobus-gaihs.mongodb.net/"
    + DB_NAME
    + "?retryWrites=true&w=majority"
;

const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(urlmongo, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connection'));
db.once('open', function () {
    console.log("Connected");
});

const piscinaSchema = mongoose.Schema({
    name: String,
    address: String,
    tel: String,
    description: String
});
const Piscina = mongoose.model('Piscina', piscinaSchema);
// =====================================================================================
// ================================ END MONGOOSE =======================================

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const router = express.Router();

router.route('/')
    .all(function (req, res) {
        res.json({message: "API with city's piscinae", method: req.method});
    });

router.route('/piscinae')
    .get(function (req, res) {
        Piscina.find(function (err, piscinae) {
            if (err) {
                res.send(err);
            }
            res.json(piscinae);
        });
    })
    .post(function (req, res) {
        const piscina = new Piscina();
        piscina.name = req.body.name;
        piscina.address = req.body.address;
        piscina.tel = req.body.tel;
        piscina.description = req.body.description;
        piscina.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Success'});
        });
    });

router.route('/piscinae/:piscina_id')
    .get(function (req, res) {
        Piscina.findById(req.params.piscina_id, function (err, piscina) {
            if (err)
                res.send(err);
            res.json(piscina);
        });
    })
    .put(function (req, res) {
        Piscina.findById(req.params.piscina_id, function (err, piscina) {
            if (err) {
                res.send(err);
            }
            piscina.name = req.body.name;
            piscina.address = req.body.address;
            piscina.tel = req.body.tel;
            piscina.description = req.body.description;
            piscina.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Success'});
            });
        });
    })
    .delete(function (req, res) {

        Piscina.remove({_id: req.params.piscina_id}, function (err, piscina) {
            if (err) {
                res.send(err);
            }
            res.json({message: "Success"});
        });

    });

app.use(router);
app.listen(port, hostname, function () {
    console.log("http://" + hostname + ":" + port);
});
