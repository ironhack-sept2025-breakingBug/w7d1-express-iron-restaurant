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
// GET /pizzas?maxPrice=16
app.get('/pizzas', (req, res, next) => {

    const { maxPrice } = req.query

    // if maxPrice is undefined, return an array with all the pizzas
    if (maxPrice === undefined) {
        res.json(pizzasArr)
        return
    }

    // if we have maxPrice, then we return only the pizzas with that maxPrice
    const filteredPizzas = pizzasArr.filter((pizzaObj, i, arr) => {
        return pizzaObj.price <= parseFloat(maxPrice);
    })

    res.json(filteredPizzas)
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
