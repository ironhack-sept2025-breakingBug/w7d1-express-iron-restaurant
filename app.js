const express = require('express')
const logger = require('morgan');

const pizzasArr = require('./data/pizzas')

const app = express()

const PORT = 3000

// Setup the request logger to run on each request
app.use(logger('dev'));

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());



//
// Example of middleware functions
//
function customMiddleware1(req, res, next) {
    console.log('middleware 1...');
    next()
}

function customMiddleware2(req, res, next) {
    console.log('middleware 2...');
    next()
}


app.use(customMiddleware1)
app.use(customMiddleware2)


//
// Creating routes in Express:
//
// app.get(path, code)
// app.post(path, code)
// app.put(path, code)
// app.delete(path, code)
//
//
// Example:
//
// app.get(path, (req, res, next) => {})
// 


//
// Some methods to send a response in Express:
//
// - res.send()
// - res.sendFile()
// - res.json()


// GET /
app.get('/', (req, res, next) => {
    console.log("we received a GET request for the HOME page...");
    
    // res.send('<h1>hello world</h1>')
    res.sendFile(__dirname + "/views/home.html")
})


// GET /contact
app.get('/contact', (req, res, next) => {
    console.log("we received a GET request for the CONTACT page...");
    res.sendFile(__dirname + "/views/contact.html")
})


// GET /pizzas
app.get('/pizzas', (req, res, next) => {
    res.json(pizzasArr)
})


// GET /pizzas/:pizzaId
app.get('/pizzas/:pizzaId', (req, res, next) => {
    let { pizzaId } = req.params // note: we get pizzaId as a string

    pizzaId = parseInt(pizzaId) // convert to an integer

    const result = pizzasArr.find((pizzaObj, i, arr) => {
        return pizzaObj.id === pizzaId
    });

    res.json(result)
})




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})
