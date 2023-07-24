import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import play from '../images/buttons/play.png'
import update from '../images/buttons/update.png'
import deleteB from '../images/buttons/delete.png'
import '../CSS/CharacterCreator.css'

const Character = ({character, onDelete, onEdit}) => {
    const [headImage, setHeadImage] = useState(null)
    const [faceImage, setFaceImage] = useState(null);
    const [bodyImage, setBodyImage] = useState(null);
    const [armRightImage, setArmRightImage] = useState(null);
    const [handRightImage, setHandRightImage] = useState(null);
    const [armLeftImage, setArmLeftImage] = useState(null);
    const [handLeftImage, setHandLeftImage] = useState(null);
    const [legRightImage, setLegRightImage] = useState(null);
    const [legLeftImage, setLegLeftImage] = useState(null);
    const [weaponImage, setWeaponImage] = useState(null);
  
    useEffect(() => {
        const loadHeadImage = async () => {
          try {
            const module = await import(`../images/${character.head}/Head.png`);
            setHeadImage(module.default);
          } catch (error) {
            console.error('Error loading head image:', error);
          }
        };
        loadHeadImage();
      }, [character.head])
//face
      useEffect(() => {
        const loadFaceImage = async () => {
          try {
            const module = await import(`../images/${character.face}/Face 01.png`);
            setFaceImage(module.default);
          } catch (error) {
            console.error('Error loading face image:', error);
          }
        };
        loadFaceImage();
      }, [character.face])
//body
      useEffect(() => {
        const loadBodyImage = async () => {
          try {
            const module = await import(`../images/${character.body}/Body.png`);
            setBodyImage(module.default);
        } catch (error) {
            console.error('Error loading body image:', error);
        }
        };
        loadBodyImage();
    }, [character.body])
//arms
    useEffect(() => {
        const loadArmImages = async () => {
        try {
            const [armModuleR, handModuleR, armModuleL, handModuleL ] = await Promise.all([
                import(`../images/${character.arms}/Right Arm.png`),
                import(`../images/${character.arms}/Right Hand.png`),
                import(`../images/${character.arms}/Left Arm.png`),
                import(`../images/${character.arms}/Left Hand.png`)
            ]);
            setArmRightImage(armModuleR.default);
            setHandRightImage(handModuleR.default);
            setArmLeftImage(armModuleL.default);
            setHandLeftImage(handModuleL.default);  
        } catch (error) {
            console.error('Error loading arm image:', error);
        }
        };
        loadArmImages();
    }, [character.arms])
//legs
    useEffect(() => {
        const loadLegImages = async () => {
        try {
            const [legModuleR, legModuleL] = await Promise.all([
                import(`../images/${character.legs}/Right Leg.png`),
                import(`../images/${character.legs}/Left Leg.png`),
            ]);
            setLegRightImage(legModuleR.default)
            setLegLeftImage(legModuleL.default)
        } catch (error) {
            console.error('Error loading leg image:', error);
        }
        };
        loadLegImages();
    }, [character.legs])
//weapon
useEffect(() => {
    const loadWeaponImage = async () => {
      try {
        const module = await import(`../images/${character.weapon}/Weapon.png`);
        setWeaponImage(module.default);
      } catch (error) {
        console.error('Error loading weapon image:', error);
      }
    };
    loadWeaponImage();
  }, [character.weapon])

    return (
    <div className="character_div"
    // style={{border:"red solid 2px"}}
    > 
      <h2
      className='characterTitle'
      >{character.characterName}</h2>
      {headImage && <img src={headImage} alt="head" className="char_head" />}
      {faceImage && <img src={faceImage} alt="face" className="char_face" />}
      {bodyImage && <img src={bodyImage} alt="body" className="char_body" />}
      <div className='right_arm_div grouped_char_piece'>
      {armRightImage && <img src={armRightImage} alt="armRight" className="char_right_arm" />}
      {handRightImage && <img src={handRightImage} alt="handRight" className="char_right_hand" />}
    </div>
      
    <div className='left_arm_div grouped_char_piece'>
    {armLeftImage && <img src={armLeftImage} alt="armLeft" className="char_left_arm" />}
    {handLeftImage && <img src={handLeftImage} alt="handLeft" className="char_left_hand" />}
    </div>
      
      
    <div className="grouped_char_piece leg_div">
    {legRightImage && <img src={legRightImage} alt="leg" className="char_right_leg" />}
    {legLeftImage && <img src={legLeftImage} alt="leg" className="char_left_leg" />}
    </div>
    
    {weaponImage && <img src={weaponImage} alt="weapon" className="char_weapon" />}
      
      
      <div>
        <button
         className="playButton actionButtons"
         style={{backgroundImage:`url(${play})`}}
        ></button>

    <Link to={`/characters/edit/${character._id}`}>
          <button
            className="updateButton actionButtons"
            style={{ backgroundImage: `url(${update})` }}
            onClick={onEdit}
          ></button>
        </Link>
        <button onClick={onDelete}
         className="deleteButton actionButtons"
         style={{backgroundImage:`url(${deleteB})`}}
        ></button>

      </div>
    </div>
  )
}

export default Character