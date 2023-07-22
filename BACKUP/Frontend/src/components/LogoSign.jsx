import React from 'react'
import logo from '../images/logo-sign.png'
import '../CSS/LogoSign.css'

const LogoSign = () => {

  return (
    
    <div className='signBox'>
        <img className='sign' src={logo} alt='logo'></img>
    </div>
  )
}

export default LogoSign