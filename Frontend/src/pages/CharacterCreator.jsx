import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../CSS/CharacterCreator.css'

import darkElfHead from '../images/dark_elf_1/Head.png';
import darkElfFace from '../images/dark_elf_1/Face 01.png';
import darkElfBody from '../images/dark_elf_1/Body.png';
import darkElfRightArm from '../images/dark_elf_1/Right Arm.png';
import darkElfRightHand from '../images/dark_elf_1/Right Hand.png';
import darkElfLeftArm from '../images/dark_elf_1/Left Arm.png';
import darkElfLeftHand from '../images/dark_elf_1/Left Hand.png';
import darkElfRightLeg from '../images/dark_elf_1/Right Leg.png';
import darkElfLeftLeg from '../images/dark_elf_1/Left Leg.png';
import darkElfWeapon from '../images/dark_elf_1/Weapon.png';
import background from '../images/buttons/backgroundCreate.png'
import woodBkgd from '../images/woodBkgd.jpg'

import frame from '../images/buttons/frameCreate.png'
import portal from '../images/buttons/portal.png'
import portalBack from '../images/buttons/portalBack.png'

import armsL from '../images/buttons/armsL.png'
import armsR from '../images/buttons/armsR.png'
import legsL from '../images/buttons/legsL.png'
import legsR from '../images/buttons/legsR.png'
import bodyL from '../images/buttons/bodyL.png'
import bodyR from '../images/buttons/bodyR.png'
import faceL from '../images/buttons/faceL.png'
import faceR from '../images/buttons/faceR.png'
import headL from '../images/buttons/headL.png'
import headR from '../images/buttons/headR.png'
import weaponL from '../images/buttons/weaponL.png'
import weaponR from '../images/buttons/weaponR.png'

import randomBtn from '../images/buttons/randomize.png'
import createBtn from '../images/buttons/create.png'
import homeBtn from '../images/buttons/home.png'
import CreateSign from '../components/CreateSign'



const character_types = ['anubis', 'assassin_guy', 'black_ninja', 'citizen_women_1', 'citizen_women_2', 'citizen_women_3', 'dark_elf_1', 'dark_elf_3', 'egyptian_mummy', 'egyptian_sentry', 'ghost_pirate_1',  'ghost_pirate_2', 'goblin_1', 'goblin_3', 'medieval_king', 'medieval_knight', 'medieval_sergeant', 'minotaur_1', 'minotaur_2',  'villager_1', 'villager_3',  'white_armored_knight', 'white_ninja'];
const CharacterCreator = () => {


  const navigate = useNavigate()
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


  const [headIndex, setHeadIndex] = useState(3);
  const [headImage, setHeadImage] = useState(darkElfHead);
  const [faceIndex, setFaceIndex] = useState(3);
  const [faceImage, setFaceImage] = useState(darkElfFace);
  const [bodyIndex, setBodyIndex] = useState(3);
  const [bodyImage, setBodyImage] = useState(darkElfBody);
  

  const [armsIndex, setArmsIndex] = useState(3);
  const [armRightImage, setArmRightImage] = useState(darkElfRightArm);
  const [handRightImage, setHandRightImage] = useState(darkElfRightHand);
  const [armLeftImage, setArmLeftImage] = useState(darkElfLeftArm);
  const [handLeftImage, setHandLeftImage] = useState(darkElfLeftHand);
  const [legsIndex, setLegsIndex] = useState(3);
  const [legRightImage, setLegRightImage] = useState(darkElfRightLeg);
  const [legLeftImage, setLegLeftImage] = useState(darkElfLeftLeg);
  const [weaponIndex, setWeaponIndex] = useState(3);
  const [weaponImage, setWeaponImage] = useState(darkElfWeapon);

  const [randomClick, setrandomClick] = useState(0)

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

  // Randomizer
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
    randomCharacter();
  }, [randomClick]);

  const random_indexes = () =>{
    setHeadIndex(Math.floor((Math.random() * character_types.length)))
    setFaceIndex(Math.floor((Math.random() * character_types.length)))
    setBodyIndex(Math.floor((Math.random() * character_types.length)))
    setArmsIndex(Math.floor((Math.random() * character_types.length)))
    setLegsIndex(Math.floor((Math.random() * character_types.length)))
    setWeaponIndex(Math.floor((Math.random() * character_types.length)))

}


  // Submitting Form
  const submitHandler = async (e) => {
    e.preventDefault();
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
  
    const response = await fetch('http://localhost:4000/api/characters/new', {
      method: 'POST',
      body: JSON.stringify(character),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      if (data.error && data.error.characterName) {
        setErrors({ characterName: data.error.characterName });
      } else {
        setErrors({});
      }
      if (!characterName.trim()) {
        setErrors({ characterName: { message: `WOAH THERE! You must name your champion!` } });
        return;
      }
  
      if (characterName.length > 20) {
        setErrors({ characterName: { message: `Keep hero names to 20 characters or less.` } });
        return;
      }
    } else {
      setErrors({});
      setHead(character_types[headIndex]);
      setFace(character_types[faceIndex]);
      setBody(character_types[bodyIndex]);
      setArms(character_types[armsIndex]);
      setLegs(character_types[legsIndex]);
      setWeapon(character_types[weaponIndex]);
      setCharacterName('');
      setHP(100);
      navigate('/characters/all');
    }
  };
  


  return (
    
    <div className='screenBackground'
    // style={{backgroundImage:`url(${woodBkgd})`}}
    >

      <CreateSign/>

      <form className="character_div" onSubmit={submitHandler}>


{/* CHARACTER -------------------------------------------------------- */}

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

        <button type="button" onClick={() => change_character_piece(1, 'Face')}
        className="char_button button_right face_button">
        Face→</button>

        <button type="button" onClick={() => change_character_piece(-1, 'Body')}
        className="char_button button_left body_button">
        ←Body</button>

        <button type="button" onClick={() => change_character_piece(1, 'Body')}
        className="char_button button_right body_button">
        Body→</button>

        <button type="button" onClick={() => change_character_piece(-1, 'Arms')}
        className="char_button button_left arm_button">
        ←Arms</button>

        <button type="button" onClick={() => change_character_piece(1, 'Arms')}
        className="char_button button_right arm_button">
        Arms→</button>

        <button type="button" onClick={() => change_character_piece(-1, 'Legs')}
        className="char_button button_left leg_button">
        ←Legs</button>

        <button type="button" onClick={() => change_character_piece(1, 'Legs')}
        className="char_button button_right leg_button">
        Legs→</button>

        <button type="button" onClick={() => change_character_piece(-1, 'Weapon')}
        className="char_button button_left weapon_button">
        ←Weapon</button>

        <button type="button" onClick={() => change_character_piece(1, 'Weapon')}
        className="char_button button_right weapon_button">
        Weapon→</button> */}

        {/* <input type="text" className='nameField' onChange={(e) => setCharacterName(e.target.value)}
        value={characterName} /> */}

        {/* <button className='submit_button char_button'
        type='submit'>Submit</button> */}

        <button className='selectButtons createBtn'
        type='submit'
        style={{backgroundImage:`url(${createBtn})`}}/>

      
      
      
      
      
      
      
      
      
      
      </form>



{/* REVISION -------------------------------------------------------- */}

      <div className='sceneContainer'>
        <img className='background' src={background} alt="forest background" />
        <img className='frame' src={frame} alt="character frame" />
        <div className='portalMask'>
        <img className='portal' src={portal} alt="character portal" />
        </div>
        <img className='portalBack' src={portalBack} alt="bkgd of portal" />
      
      
      <div className='leftSigns'>
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
      
      
      <div className='rightSigns'>
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


      <div className='characterName'>
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


      <button className='selectButtons randomizeBtn'
        type='button' 
        style={{backgroundImage:`url(${randomBtn})`}}
        onClick={() => setrandomClick((prevRandomClick) => prevRandomClick + 1)}/>

      {/* <button className='selectButtons createBtn'
        type='submit'
        style={{backgroundImage:`url(${createBtn})`}}/> */}

      <Link to='/characters/all'>
      <button className='selectButtons homeBtn'
        type='button'
        style={{backgroundImage:`url(${homeBtn})`}}/>
      </Link>

      </div>
    </div>
  );
};
export default CharacterCreator