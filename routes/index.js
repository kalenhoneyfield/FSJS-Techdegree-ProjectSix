const express = require('express');
const data = require('../data.json');

const router = express.Router();

router.get('/', (req, res) =>{
    const proj = Math.floor(Math.random() * (data.projects).length)
    res.redirect('/projects/' + proj) //if the user goes straight here, assume they want to see a project, give them one
})

router.get('/:id', (req, res, next) =>{
    try{
        const { id } = req.params
        if(isNaN(id)){ //assuming the user hand types in a project name
            const error = new Error('Project Path Not Found')
            error.statusCode = 404
            return next(error)
        }
        else if(!data.projects[id]){ //assuming we somehow end up on a valid number but invalid project id
            const error = new Error(`Project with ID:${id} Not Found on System`)
            error.statusCode = 404
            return next(error)
        }

        res.locals.totalProjects = (data.projects).length
        res.locals.projects = data.projects[id]
        res.locals.personal = data.personal
        res.render('project')
    }
    catch {
        const error = new Error('Internal Server Error')
        error.statusCode = 500
        return next(error)
    }
})




module.exports = router;