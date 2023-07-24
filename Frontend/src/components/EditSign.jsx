import React from 'react'
import editSign from '../images/edit-character-sign.png'
import '../CSS/EditSign.css'

const EditSign = () => {
  return (
    <div className='signBox'>
    <img className='sign' src={editSign} alt='swinging edit sign'></img>
    </div>
  )
}

export default EditSign