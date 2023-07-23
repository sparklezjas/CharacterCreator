import React from 'react'
import createSign from '../images/make-character-sign.png'
import '../CSS/CreateSign.css'

const CreateSign = () => {
  return (
    <div className='signBox'>
    <img className='sign' src={createSign} alt='swinging create sign'></img>
    </div>
  )
}

export default CreateSign