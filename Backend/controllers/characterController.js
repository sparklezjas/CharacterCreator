const Characters = require(`../models/characterModel`)
const mongoose = require ('mongoose')

const getCharacters = async (req, res) => {
    const characters = await Characters.find({}).sort({createdAt: -1})

    res.status(200).json(characters)
}

const getCharacter = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such character'})
    }

    const character = await Characters.findById(id)
    if (!character){
        return res.status(404).json({error: "No such character"})
    }
    res.status(200).json(character)
}

const createCharacter = async (req, res) => {
    const {head, eyes, body, weapon, characterName, HP} = req.body
    try{ 
        const character = await Characters.create({head, eyes, body, weapon, characterName, HP})
        res.status(200).json(character)
    }
        catch (error){
        res.status(400).json({error: error.message})
    }
}

const deleteCharacter = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such character'})
    }
    const character = await Characters.findOneAndDelete({_id: id})
    if (!character){
        return res.status(400).json({error: "No such character"})
    }
    res.status(200).json(character)
}

const updateCharacter = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such character'})
    }

    const character = await Characters.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!character){
        return res.status(400).json({error: "No such character"})
    }
    res.status(200).json(character)
}

module.exports = {
    getCharacter,
    getCharacters,
    createCharacter,
    deleteCharacter,
    updateCharacter
}