const express = require('express')
const router = express.Router()
const { getProject, setProject, updateProject, deleteProject} = require('../controller/projectController')

router.route('/').get(getProject).post(setProject)
router.route('/:id').delete(updateProject).put(deleteProject)


module.exports = router