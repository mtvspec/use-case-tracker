"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persons_service_1 = require("./persons.service/persons.service");
const ps = new persons_service_1.PersonsService();
exports.persons = express_1.Router();
exports.persons
    .get('/', (req, res) => {
    ps.getAllPersons()
        .then(result => res.status(result.status).json(result.data).end())
        .catch(err => res.status(err.status).json(err.data).end());
})
    .get('/:id', (req, res) => {
    ps.getPerson(req.params.id)
        .then(result => res.status(result.status).json(result.data).end())
        .catch(err => res.status(err.status).json(err.data).end());
})
    .post('/', (req, res) => {
    const personData = req.body;
    const pattern = {
        iin: 'string',
        lastName: 'string',
        firstName: 'string|required',
        middleName: 'string'
    };
    ps.createPerson(req.body)
        .then(result => res.status(result.status).json(result.data).end())
        .catch(err => res.status(err.status).json(err.data).end());
})
    .put('/:id', (req, res) => {
    req.body.id = req.params.id;
    ps.updatePerson(req.body)
        .then(result => res.status(result.status).json(result.data).end())
        .catch(err => res.status(err.status).json(err.data).end());
})
    .delete('/:id', (req, res) => {
    ps.deletePerson(req.params.id)
        .then(result => res.status(result.status).json(result.data).end())
        .catch(err => res.status(err.status).json(err.data).end());
});
//# sourceMappingURL=index.js.map