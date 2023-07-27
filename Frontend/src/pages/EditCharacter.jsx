import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import '../CSS/CharacterCreator.css'
import { useAuthContext } from '../hooks/useAuthContext';

import background from '../images/darkForest.jpg'
import frameEdit from '../images/buttons/frameEdit.png'
import armsL from '../images/buttons/armsLs.png'
import armsR from '../images/buttons/armsRs.png'
import legsL from '../images/buttons/legsLs.png'
import legsR from '../images/buttons/legsRs.png'
import bodyL from '../images/buttons/bodyLs.png'
import bodyR from '../images/buttons/bodyRs.png'
import faceL from '../images/buttons/faceLs.png'
import faceR from '../images/buttons/faceRs.png'
import headL from '../images/buttons/headLs.png'
import headR from '../images/buttons/headRs.png'
import weaponL from '../images/buttons/weaponLs.png'
import weaponR from '../images/buttons/weaponRs.png'

import randomBtn from '../images/buttons/randomize.png'
import createBtn from '../images/buttons/create.png'
import saveBtn from '../images/buttons/save.png'
import homeBtn from '../images/buttons/home.png'
import cancelBtn from '../images/buttons/cancel.png'
import CreateSign from '../components/CreateSign'
import EditSign from '../components/EditSign';

const character_types = ['anubis', 'assassin_guy', 'black_ninja', 'citizen_women_1', 'citizen_women_2', 'citizen_women_3', 'dark_elf_1', 'dark_elf_3', 'egyptian_mummy', 'egyptian_sentry', 'ghost_pirate_1',  'ghost_pirate_2', 'goblin_1', 'goblin_3', 'medieval_king', 'medieval_knight', 'medieval_sergeant', 'minotaur_1', 'minotaur_2',  'villager_1', 'villager_3',  'white_armored_knight', 'white_ninja'];
const EditCharacter = () => {

  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { id } = useParams();
  const [head, setHead] = useState ("")
  const [face, setFace] = useState ("")
  const [arms, setArms] = useState ("")
  const [legs, setLegs] = useState ("")
  const [body, setBody] = useState ("")
  const [weapon, setWeapon] = useState ("")
  const [characterName, setCharacterName] = useState ("")
  const [HP, setHP] = useState ("")
  const [character, setCharacter] = useState ("")
  const [errors, setErrors] = useState({})


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


  const change_character_piece = async (index_change, body_part) => {
    if (body_part === 'Head') {
      setHeadIndex((prevIndex) => validate_index(prevIndex + index_change));
    } else if (body_part === 'Body') {
      setBodyIndex((prevIndex) => validate_index(prevIndex + index_change));
    } else if (body_part === 'Face') {
        setFaceIndex((prevIndex) => validate_index(prevIndex + index_change));
    } else if (body_part === 'Arms') {
        setArmsIndex((prevIndex) => validate_index(prevIndex + index_change));
    }  else if (body_part === 'Legs') {
        setLegsIndex((prevIndex) => validate_index(prevIndex + index_change));
    } else if (body_part === 'Weapon') {
        setWeaponIndex((prevIndex) => validate_index(prevIndex + index_change));
    }
  };


//   updating head
  useEffect(() => {
    const updateHeadImage = async () => {
      const module = await import(`../images/${character_types[headIndex]}/Head.png`);
      setHeadImage(module.default);
    };
    updateHeadImage();
}, [headIndex]);


// updating face
    useEffect(() => {
    const updateFaceImage = async () => {
      const module = await import(`../images/${character_types[faceIndex]}/Face 01.png`);
      setFaceImage(module.default);
    };
    updateFaceImage();
}, [faceIndex]);


// updating body
  useEffect(() => {
    const updateBodyImage = async () => {
      const module = await import(`../images/${character_types[bodyIndex]}/Body.png`);
      setBodyImage(module.default);
    };
    updateBodyImage();
  }, [bodyIndex]);


// updating arms
useEffect(() => {
    const updateArmsImages = async () => {
      const [armModuleR, handModuleR, armModuleL, handModuleL ] = await Promise.all([
        import(`../images/${character_types[armsIndex]}/Right Arm.png`),
        import(`../images/${character_types[armsIndex]}/Right Hand.png`),
        import(`../images/${character_types[armsIndex]}/Left Arm.png`),
        import(`../images/${character_types[armsIndex]}/Left Hand.png`)
      ]);
      setArmRightImage(armModuleR.default);
      setHandRightImage(handModuleR.default);
      setArmLeftImage(armModuleL.default);
      setHandLeftImage(handModuleL.default);
    };
    updateArmsImages();
  }, [armsIndex]);


//   updating legs
    useEffect(() => {
    const updateLegsImages = async () => {
      const [legModuleR, legModuleL] = await Promise.all([
        import(`../images/${character_types[legsIndex]}/Right Leg.png`),
        import(`../images/${character_types[legsIndex]}/Left Leg.png`),
      ]);
      setLegRightImage(legModuleR.default)
      setLegLeftImage(legModuleL.default)
    };
    updateLegsImages();
  }, [legsIndex]);


  // updating weapon
  useEffect(() => {
    const updateWeaponImage = async () => {
      const module = await import(`../images/${character_types[weaponIndex]}/Weapon.png`);
      setWeaponImage(module.default);
    };
    updateWeaponImage();
  }, [weaponIndex]);
  const validate_index = (index) => {
    if (index < 0) {
      index = character_types.length - 1;
    }
    if (index >= character_types.length) {
      index = 0;
    }
    return index;
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      setErrors('You must be logged in')
      return
    }
    if (!characterName.trim()) {
      setErrors({ characterName: 'Character name is required' })
      return
    }
    if (characterName.length > 20) {
      setErrors({ characterName: 'Name must be 20 characters or less' })
      return
    }
    const character = {
      head: character_types[headIndex],
      face: character_types[faceIndex],
      body: character_types[bodyIndex],
      arms: character_types[armsIndex],
      legs: character_types[legsIndex],
      weapon: character_types[weaponIndex],
      characterName,
      HP: 100,
    };
    console.log('Character data to be sent:', character);
  
    try {
      const response = await fetch(`http://localhost:4000/api/characters/edit/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(character),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });
      const data = await response.json();
  
      if (!response.ok) {
        setErrors(data.error);
      }
      if (response.ok) {

        console.log('Character updated successfully!');
        navigate('/characters/all');
      }
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };
  

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

// Randomizer
const [randomClick, setrandomClick] = useState(0)

  useEffect(() => {
    const randomCharacter = async () => {
      random_indexes()
      const [headModule, faceModule, bodyModule, armModuleR, armModuleL, handModuleR, handModuleL, legModuleR, legModuleL, weaponModule] = await Promise.all([
        import(`../images/${character_types[headIndex]}/Head.png`),
        import(`../images/${character_types[faceIndex]}/Face 01.png`),
        import(`../images/${character_types[bodyIndex]}/Body.png`),
        import(`../images/${character_types[armsIndex]}/Right Arm.png`),
        import(`../images/${character_types[armsIndex]}/Left Arm.png`),
        import(`../images/${character_types[armsIndex]}/Right Hand.png`),
        import(`../images/${character_types[armsIndex]}/Left Hand.png`),
        import(`../images/${character_types[legsIndex]}/Right Leg.png`),
        import(`../images/${character_types[legsIndex]}/Left Leg.png`),
        import(`../images/${character_types[weaponIndex]}/Weapon.png`),

      ]);
      setHeadImage(headModule.default)
      setFaceImage(faceModule.default)
      setBodyImage(bodyModule.default)
      setArmRightImage(armModuleR.default)
      setArmLeftImage(armModuleL.default)
      setHandRightImage(handModuleR.default)
      setHandLeftImage(handModuleL.default)
      setLegRightImage(legModuleR.default)
      setLegLeftImage(legModuleL.default)
      setWeaponImage(weaponModule.default)
    };
    if(randomClick != 0) {

      randomCharacter();
    }
  }, [randomClick]);

  const random_indexes = () =>{
    setHeadIndex(Math.floor((Math.random() * character_types.length)))
    setFaceIndex(Math.floor((Math.random() * character_types.length)))
    setBodyIndex(Math.floor((Math.random() * character_types.length)))
    setArmsIndex(Math.floor((Math.random() * character_types.length)))
    setLegsIndex(Math.floor((Math.random() * character_types.length)))
    setWeaponIndex(Math.floor((Math.random() * character_types.length)))

}

  return (

  <div className='screenBackground'
  // style={{backgroundImage:`url(${woodBkgd})`}}
    >
    <div className='stoneSign'>
    <EditSign/>
    </div>

    <form className="character_div" onSubmit={submitHandler}>


{/* CHARACTER -------------------------------------------------------- */}
      <div className='champion'>
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

{/* BUTTONS -------------------------------------------------------- */}


      {/* <button type="button" 
      onClick={() => change_character_piece(-1, 'Head')} 
      className="char_button button_left head_button">
      ←Head</button>

      <button type="button" 
      onClick={() => change_character_piece(1, 'Head')} 
      className="char_button button_right head_button">
      Head→</button>

      <button type="button" 
      onClick={() => change_character_piece(-1, 'Face')} 
      className="char_button button_left face_button">
      ←Face</button>

      <button type="button" 
      onClick={() => change_character_piece(1, 'Face')} 
      className="char_button button_right face_button">
      Face→</button>

      <button type="button" 
      onClick={() => change_character_piece(-1, 'Body')} 
      className="char_button button_left body_button">
      ←Body</button>

      <button type="button" 
      onClick={() => change_character_piece(1, 'Body')} 
      className="char_button button_right body_button">
      Body→</button>

      <button type="button" 
      onClick={() => change_character_piece(-1, 'Arms')} 
      className="char_button button_left arm_button">
      ←Arms</button>

      <button type="button" 
      onClick={() => change_character_piece(1, 'Arms')} 
      className="char_button button_right arm_button">
      Arms→</button>

      <button type="button" 
      onClick={() => change_character_piece(-1, 'Legs')} 
      className="char_button button_left leg_button">
      ←Legs</button>

      <button type="button" 
      onClick={() => change_character_piece(1, 'Legs')} 
      className="char_button button_right leg_button">
      Legs→</button>

      <button type="button" 
      onClick={() => change_character_piece(-1, 'Weapon')} 
      className="char_button button_left weapon_button">
      ←Weapon</button>

      <button type="button" 
      onClick={() => change_character_piece(1, 'Weapon')} 
      className="char_button button_right weapon_button">
       Weapon→</button> */}

      <div className="error editError">{errors.characterName}</div>
      
      {/* <input type="text" 
      onChange={(e) => setCharacterName(e.target.value)} value={characterName} /> */}
      
      {/* <button className='submit_button char_button'  
      type='submit'>Submit</button> */}

      <button className='selectButtons saveButtonEdit'
        type='submit'
        style={{backgroundImage:`url(${saveBtn})`}}/>

    </form>



{/* REVISION -------------------------------------------------------- */}


      <div className='sceneContainer sceneContainerEdit'>
        <img className='background' src={background} alt="forest background"/>
        <img className='frameEdit' src={frameEdit} alt="character frame" />
        {/* <div className='portalMask'>
        <img className='portal' src={portal} alt="character portal" />
        </div>
        <img className='portalBack' src={portalBack} alt="bkgd of portal" /> */}
      
      
      <div className='leftSigns leftSignsEdit'>
        <button className='imageButtonL lHead' 
        style={{backgroundImage:`url(${headL})`}}
        onClick={() => change_character_piece(-1, 'Head')}/>
        
        <button className='imageButtonL lFace' 
        style={{backgroundImage:`url(${faceL})`}}
        onClick={() => change_character_piece(-1, 'Face')}/>
        
        <button className='imageButtonL lBody' 
        style={{backgroundImage:`url(${bodyL})`}}
        onClick={() => change_character_piece(-1, 'Body')}/>
        
        <button className='imageButtonL lArms' 
        style={{backgroundImage:`url(${armsL})`}}
        onClick={() => change_character_piece(-1, 'Arms')}/>
        
        <button className='imageButtonL lLegs' 
        style={{backgroundImage:`url(${legsL})`}}
        onClick={() => change_character_piece(-1, 'Legs')}/>
        
        <button className='imageButtonL lWeapon' 
        style={{backgroundImage:`url(${weaponL})`}}
        onClick={() => change_character_piece(-1, 'Weapon')}/>
      </div>
      
      
      <div className='rightSigns rightSignsEdit'>
        <button className='imageButtonR rHead' 
        style={{backgroundImage:`url(${headR})`}}
        onClick={() => change_character_piece(1, 'Head')}/>
        
        <button className='imageButtonR rFace' 
        style={{backgroundImage:`url(${faceR})`}}
        onClick={() => change_character_piece(1, 'Face')}/>
        
        <button className='imageButtonR rBody' 
        style={{backgroundImage:`url(${bodyR})`}}
        onClick={() => change_character_piece(1, 'Body')}/>
        
        <button className='imageButtonR rArms' 
        style={{backgroundImage:`url(${armsR})`}}
        onClick={() => change_character_piece(1, 'Arms')}/>
        
        <button className='imageButtonR rLegs' 
        style={{backgroundImage:`url(${legsR})`}}
        onClick={() => change_character_piece(1, 'Legs')}/>
        
        <button className='imageButtonR rWeapon' 
        style={{backgroundImage:`url(${weaponR})`}}
        onClick={() => change_character_piece(1, 'Weapon')}/>
      </div>


      <div className='characterName characterNameEdit'>
        <input type="text" className='enterName'
        onChange={(e) => setCharacterName(e.target.value)}
        value={characterName}/>
        {errors.characterName ? 
        <p className='error-message'>
        {errors.characterName.message}</p> : null}
        
        {/* {errors.characterName && (
        <p style={{ color: 'red', fontSize: '10pt', margin: '-5px' }}>
        {errors.characterName.message}</p>)} */}

      </div>


      <button className='selectButtons selectButtonsEdit randomizeBtn'
        type='button' 
        style={{backgroundImage:`url(${randomBtn})`}}
        onClick={() => setrandomClick((prevRandomClick) => prevRandomClick + 1)}/>

      {/* <button className='selectButtons createBtn'
        type='submit'
        style={{backgroundImage:`url(${createBtn})`}}/> */}

      <Link to='/characters/all'>
      <button className='selectButtons selectButtonsEdit cancelButton homeBtn'
        type='button'
        style={{backgroundImage:`url(${cancelBtn})`}}/>
      </Link>

      </div>
  </div>
  );
};
export default EditCharacter
