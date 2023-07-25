import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import '../CSS/CharacterCreator.css'
import { useAuthContext } from '../hooks/useAuthContext';

const GameCharacter = () => {
    const { id } = useParams();
    const {user} = useAuthContext()

    const [headIndex, setHeadIndex] = useState(0);
    const [headImage, setHeadImage] = useState(null);
    const [faceIndex, setFaceIndex] = useState(0);
    const [faceImage, setFaceImage] = useState(null);
    const [bodyIndex, setBodyIndex] = useState(0);
    const [bodyImage, setBodyImage] = useState(null);
    const [armsIndex, setArmsIndex] = useState(0);
    const [armRightImage, setArmRightImage] = useState(null);
    const [handRightImage, setHandRightImage] = useState(null);
    const [armLeftImage, setArmLeftImage] = useState(null);
    const [handLeftImage, setHandLeftImage] = useState(null);
    const [legsIndex, setLegsIndex] = useState(0);
    const [legRightImage, setLegRightImage] = useState(null);
    const [legLeftImage, setLegLeftImage] = useState(null);
    const [weaponIndex, setWeaponIndex] = useState(0);
    const [weaponImage, setWeaponImage] = useState(null);
    const [characterName, setCharacterName] = useState ("")

    const character_types = ['anubis', 'assassin_guy', 'black_ninja', 'citizen_women_1', 'citizen_women_2', 'citizen_women_3', 'dark_elf_1', 'dark_elf_3', 'egyptian_mummy', 'egyptian_sentry', 'ghost_pirate_1',  'ghost_pirate_2', 'goblin_1', 'goblin_3', 'medieval_king', 'medieval_knight', 'medieval_sergeant', 'minotaur_1', 'minotaur_2',  'villager_1', 'villager_3',  'white_armored_knight', 'white_ninja'];

    const [oneCharacter, setOneCharacter] = useState();
    useEffect(() => {
      // Ensure the id exists and has a valid value
      if (id && user) {
        axios
          .get(`http://localhost:4000/api/characters/one/${id}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
      })
          .then((res) => {
            console.log("Response from API:", res)
            setOneCharacter(res.data);
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }, [id, user])


  // Helper function to handle dynamic imports for images
  const loadImage = async (characterType, imageName, setImage) => {
    try {
      const module = await import(`../images/${characterType}/${imageName}`);
      setImage(module.default);
    } catch (error) {
      // Handle errors, e.g., set a default image or show an error message
      console.error(error);
    }
  };


useEffect(() => {
  if (oneCharacter) {
    // Update the image states based on the character's chosen parts
    const { head, body, face, arms, legs, weapon, characterName } = oneCharacter;

     // Find the index of the character's head value in the character_types array
     const headIndexFromData = character_types.indexOf(head);
     const bodyIndexFromData = character_types.indexOf(body);
     const faceIndexFromData = character_types.indexOf(face);
     const armsIndexFromData = character_types.indexOf(arms);
     const legsIndexFromData = character_types.indexOf(legs);
     const weaponIndexFromData = character_types.indexOf(weapon);

     // Set the headIndex to the correct index from the data
     setHeadIndex(headIndexFromData);
     setBodyIndex(bodyIndexFromData);
     setFaceIndex(faceIndexFromData);
     setArmsIndex(armsIndexFromData);
     setLegsIndex(legsIndexFromData);
     setWeaponIndex(weaponIndexFromData);

    // Load images using the helper function
    loadImage(head, 'Head.png', setHeadImage);
    loadImage(body, 'Body.png', setBodyImage);
    loadImage(face, 'Face 01.png', setFaceImage);
    loadImage(arms, 'Right Arm.png', setArmRightImage);
    loadImage(arms, 'Right Hand.png', setHandRightImage);
    loadImage(arms, 'Left Arm.png', setArmLeftImage);
    loadImage(arms, 'Left Hand.png', setHandLeftImage);
    loadImage(legs, 'Right Leg.png', setLegRightImage);
    loadImage(legs, 'Left Leg.png', setLegLeftImage);
    loadImage(weapon, 'Weapon.png', setWeaponImage);
    setCharacterName(characterName)
  }
}, [oneCharacter]);


return (

    <div className='character_div'>
      
  
        {headImage && <img src={headImage} 
        alt="head" className="char_head" />}
  
        {bodyImage && <img src={bodyImage}
         alt="body" className="char_body" />}
  
        {faceImage && <img src={faceImage}
         alt="face" className="char_face" />}
  
        <div className="right_arm_div grouped_char_piece">
        {armRightImage && <img src={armRightImage} 
        alt="arm" className="char_right_arm" />}
        {handRightImage && <img src={handRightImage} 
        alt="hand" className="char_right_hand" />}
        </div>
  
        <div className="left_arm_div grouped_char_piece">
        {armLeftImage && <img src={armLeftImage} 
        alt="arm" className="char_left_arm" />}
        {handLeftImage && <img src={handLeftImage} 
        alt="hand" className="char_left_hand" />}
        </div>
  
        <div className="grouped_char_piece leg_div">
        {legRightImage && <img src={legRightImage} 
        alt="leg" className="char_right_leg" />}
        {legLeftImage && <img src={legLeftImage} 
        alt="leg" className="char_left_leg" />}
        </div>
  
        {weaponImage && <img src={weaponImage} 
        alt="weapon" className="char_weapon" />}
</div>
)  

}

export default GameCharacter