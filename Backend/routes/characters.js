const express = require('express')
const {
    createCharacter,
    getCharacter,
    getCharacters,
    deleteCharacter,
    updateCharacter
} = require('../controllers/characterController')

const router = express.Router()

router.get('/', getCharacters)
router.get('/:id', getCharacter)
router.post('/', createCharacter)
router.delete('/:id', deleteCharacter)
router.patch('/:id', updateCharacter)

module.exports = router