const router = require("express").Router()

const Pizza = require("../models/Pizza.model")



// POST /pizzas -- Create a new pizza
router.post('/pizzas', async (req, res, next) => {

    const newPizza = req.body

    try {
        const pizzaFromDB = await Pizza.create(newPizza)
        res.status(201).json(pizzaFromDB)
    } catch (err) {
        console.log("Error creating a new pizza in the DB...")
        console.log(err)
        res.status(500).json({ error: "Error creating a new pizza in the DB..." })
    }
})



// GET /pizzas -- Get the list of pizzas
// GET /pizzas?maxPrice=20
router.get("/pizzas", async (req, res) => {
    try {
        const { maxPrice } = req.query;

        let filter = {};
        if (maxPrice !== undefined) {
            filter = { price: { $lte: maxPrice } };
        }

        const pizzasFromDB = await Pizza.find(filter).populate("cook");
        res.json(pizzasFromDB);
    } catch (err) {
        console.error("Error getting pizzas from DB:", err);
        res.status(500).json({ error: "Failed to get list of pizzas" });
    }
});



// GET /pizzas/:pizzaId -- Get the details for one pizza
router.get("/pizzas/:pizzaId", async (req, res, next) => {
    try {
        const { pizzaId } = req.params
        const pizzaFromDB = await Pizza.findById(pizzaId).populate("cook")
        res.json(pizzaFromDB)
    } catch (error) {
        console.log("Error getting pizza details from DB...");
        console.log(error);
        res.status(500).json({ error: "Failed to get pizza details" });
    }
})



// PUT /pizzas/:pizzaId -- Update one pizza
router.put('/pizzas/:pizzaId', async (req, res, next) => {

    const { pizzaId } = req.params

    const newDetails = req.body

    try {
        const pizzaFromDB = await Pizza.findByIdAndUpdate(pizzaId, newDetails, { new: true })
        res.json(pizzaFromDB)
    } catch (error) {
        console.error("Error updating pizza...");
        console.error(error);
        res.status(500).json({ error: "Failed to update a pizza" });
    }
})



// DELETE /pizzas/:pizzaId -- Delete one pizza
router.delete("/pizzas/:pizzaId", async (req, res, next) => {

    const { pizzaId } = req.params

    try {
        const response = await Pizza.findByIdAndDelete(pizzaId)
        res.json(response)
    } catch (error) {
        console.error("Error deleting pizza...");
        console.error(error);
        res.status(500).json({ error: "Failed to delete a pizza" });
    }
})




module.exports = router