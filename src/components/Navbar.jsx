import React, { useEffect, useState } from 'react'
import star from '../assets/star-half-empty.png';
import user from '../assets/user.png';


const Navbar = () => {

 
  return (
    <nav>
      <div className='heding_box'>
        <h1>Techno</h1>
        <ul>
          <li>
           ghjghg
          </li>
          <li>
            <p><b>name</b></p>
            <p>Lorem ipsum dolor sit amet.</p>
          </li>
          <li className='user_logo'><img src={user} alt="" srcset="" /></li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
