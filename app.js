// We're declaring/importing the packaged that we want to use which we've previously
// Installed using `npm install ...`
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Tell the app to use bodyParser to take data from our form
app.use(bodyParser.urlencoded({ extended: true }))

// Tell the app to use EJS as the view engine
app.set('view engine', 'ejs')

// Just checkin' we got some cows in the world
console.log("HELLO COW WORLD")

// Some cows stored in an array for starters because we aren't storing info in a database just yet
var cows = {
    "40d": "Missy",
    "39a": "Simon",
}

// See all the cows listed out using ejs
app.get('/cows', (req, res) => {
    let templateVars = { cows: cows }
    res.render('index', templateVars)
})

// Renders create cow on /cows/new
app.get('/cows/new', (req, res) => {
    res.render('create-cow')
})

// Get just one cow using their id
app.get('/cows/:id', (req, res) => {
    let templateVars = { id: req.params.id, name: cows[req.params.id] }
    res.render('cow', templateVars)
})

// When the form is submitted a post request happens and adds the cow to the cows array
app.post('/cows', (req, res) => {
    cows[req.body.id] = req.body.name
    res.redirect('/cows')
})

// When the form is submitted the name of the cow gets updated
app.post('/cows/:id', (req, res) => {
    // Check that we aren't just deleting the name by overriding it with an empty string
    if (req.body.name != '') {
        cows[req.params.id] = req.body.name
    }

    let templateVars = { id: req.params.id, name: cows[req.params.id] }

    res.render('cow', templateVars)
})

app.post('/cows/:id/delete', (req, res) => {
    delete cows[req.params.id]
    res.redirect('/cows')
})




// Runs the server on port 3000 so we can see it's interface at locahost:3000
app.listen(3000, function () {
    console.log('Listening on port 3000')
})