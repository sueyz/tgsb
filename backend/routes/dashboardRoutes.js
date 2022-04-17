const express = require('express')
const router = express.Router()
const { getSomething, setSomething, updateSomething, deleteSomething} = require('../controller/dashboardController')

router.route('/').get(getSomething).post(setSomething)
router.route('/:id').delete(deleteSomething).put(updateSomething)

// router.get('/', getSomething)
// router.post('/', setSomething)

// router.put('/:id', updateSomething)
// router.delete('/:id', deleteSomething)

module.exports = router