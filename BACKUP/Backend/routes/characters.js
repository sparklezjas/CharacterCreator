const express = require('express')
const {
    createCharacter,
    getCharacter,
    getCharacters,
    deleteCharacter,
    updateCharacter
} = require('../controllers/characterController')

const router = express.Router()

router.get('/all', getCharacters)
router.get('/one/:id', getCharacter)
router.post('/new', createCharacter)
router.delete('/delete/:id', deleteCharacter)
router.patch('/edit/:id', updateCharacter)

module.exports = router