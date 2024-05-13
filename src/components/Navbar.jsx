import React from 'react'
import user from '../assets/user.png';
import { useAuth } from '../AuthProvider';


const Navbar = () => {

  const { showText} = useAuth();


  return (
    <nav>
      <div className={` ${showText ? 'heding_box' : 'heding_box_mini'}`}>
        <h1>Techno</h1>
        <ul>
          <li>
            <p><b>name</b></p>
            <p>Lorem ipsum dolor sit amet.</p>
          </li>
          <li className='user_logo'><img src={user} alt="user logo"  /></li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
