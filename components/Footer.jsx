import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const date = new Date().getFullYear()

const Footer = () => {
  return (
    <div className='footer-container'>
      <p> &copy; {date} Wilstrop Electronics, All Rights Reserved </p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer
