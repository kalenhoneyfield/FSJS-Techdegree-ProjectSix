const express = require('express');
const data = require('../data.json');

const router = express.Router();

router.get('/', (req, res) =>{
    const proj = Math.floor(Math.random() * (data.projects).length)
    res.redirect('/projects/' + proj) //if the user goes straight here, assume they want to see a project, give them one
})

router.get('/:id', (req, res) =>{
    const { id } = req.params
    res.locals.totalProjects = (data.projects).length
    res.locals.projects = data.projects[id]
    res.locals.personal = data.personal
    res.render('project')
})




module.exports = router;