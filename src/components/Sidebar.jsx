import React, { useState } from 'react';
import logo from '../assets/logo.png';
import logo2 from '../assets/aquaint-color-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookmark, faClipboard, faCube, faGift, faList, faSuitcase, faTemperatureQuarter, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthProvider';

const Sidebar = () => {

  const { toggleText,showText,showBars} = useAuth();



  return (
    <>
     <div className={`said_bar ${showText ? '' : 'collapsed'}`} >
        <section className={`${showBars ? 'compny_logo_box' : 'h-[110px] flex flex-col justify-evenly items-center '}`}>

          <img src={showBars ? logo : logo2} className={`${showText ? 'compny_logo' : 'w-[36px]'}`} alt="compny_logo" srcset="" />
          <FontAwesomeIcon icon={showBars ? faBars : faXmark} className="w-[50px] h-[24px] text-[#625f6e]" onClick={toggleText} />

        </section>
        <section className={`${showText ? 'itumes' : 'itumes mt-[20px]'}`}>
          <ul className='flex flex-col py-[20px]'>
            <li className={showText ? 'active' : 'border white flex flex-col justify-center active'}><FontAwesomeIcon icon={faGift} className="itum m-[0]" /> {showText && 'Site Management'}</li>
            <li className={showText ? '' : 'icon-only'}><FontAwesomeIcon icon={faClipboard} className="itum" /> {showText && 'Departments'}</li>
            <li className={showText ? '' : 'icon-only'}><FontAwesomeIcon icon={faUsers} className="itum" /> {showText && 'Staff Management'}</li>
            <li className={showText ? '' : 'icon-only'}><FontAwesomeIcon icon={faBookmark} className="itum" /> {showText && 'Templates'}</li>
            <li className={showText ? '' : 'icon-only'}><FontAwesomeIcon icon={faSuitcase} className="itum" /> {showText && 'Task Management'}</li>
            <li className={showText ? '' : 'icon-only'}><FontAwesomeIcon icon={faTemperatureQuarter} className="itum" /> {showText && 'Temperature Logs'}</li>
            <li className={showText ? '' : 'icon-only'}><FontAwesomeIcon icon={faList} className="itum" /> {showText && 'Categories'}</li>
            <li className={showText ? '' : 'icon-only'}><FontAwesomeIcon icon={faCube} className="itum" /> {showText && 'Inventory'}</li>
          </ul>
        </section>
      </div>

    
    </>
  );
};

export default Sidebar;
