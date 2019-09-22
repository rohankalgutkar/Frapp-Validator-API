const express = require('express'),
    bodyParser = require('body-parser');

const validations = require('./validations')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/validate', function (req, res) {
    try {
        var isCircular = validations.validateDependencies(req.body.dependencyGraph.tasks);
        if (isCircular) {
            throw new Error('Circular dependency in Graph')
        }

        var result = validations.checkTaskAvailability(req.body);
        console.log(result);

        if (typeof result == "boolean")
            res.send({ open: result })
        else
            res.send(result)
    } catch (e) {
        res.status(400).send(e.message)
    }
});

app.post('/*', function (req, res) {
    res.status(404).send("Invalid URL")
})

app.listen(3000)