const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fetch = require('node-fetch')

const PORT = 3000
const HOST = 'localhost'

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET

const PATH = path.dirname(__filename)

const app = express()
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// CAPTCHA client
app.get('/', (req, res) => {
    const file = path.join(PATH, 'index.html')
    res.sendFile(file)
})
// CAPTCHA server
app.post('/recaptcha', async (req, res) => {
    const greq = "https://www.google.com/recaptcha/api/siteverify?secret=" + CAPTCHA_SECRET
                + "&response=" + req.body['g-recaptcha-response']
                + "&remoteip=" + '127.0.0.1'

    const gres = await fetch(greq).then(r => r.json())

    const {success, score} = gres

    let msg = 'Even Google doen\'t work'

    if (success) {
        if (score > 0.7) msg = 'Wow!'
        else if (score > 0.4 && score <= 0.7) msg = 'OK'
        else msg = 'You are looking like a robot!'
    }

    res.json({
        msg: msg,
        score: score
    })
})

app.listen(PORT, HOST, () => console.log("http://" + HOST + ":" + PORT))
