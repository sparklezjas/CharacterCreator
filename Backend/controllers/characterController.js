const validator = require('validator')
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
    const {head, face, body, arms, legs, weapon, characterName, HP} = req.body
    if (!validator.isLength(characterName, { min: 1 })) {
        return res.status(400).json({ error: 'Character name is required' });
      }
    try{ 
        const character = await Characters.create({head, face, body, arms, legs, weapon, characterName, HP})
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
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such character' });
      }
    
      const { characterName } = req.body;
    
      // Validate characterName using the same validations as in the model
      if (!validator.isLength(characterName, { min: 1 })) {
        return res.status(400).json({ error: 'Character name is required' });
      }
      if (!validator.isLength(characterName, { max: 20 })) {
        return res.status(400).json({ error: 'Name must be 20 characters or less' });
      }
    
      try {
        const character = await Characters.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!character) {
          return res.status(400).json({ error: 'No such character' });
        }
    
        res.status(200).json(character);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

module.exports = {
    getCharacter,
    getCharacters,
    createCharacter,
    deleteCharacter,
    updateCharacter
}