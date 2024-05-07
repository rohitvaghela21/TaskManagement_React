import React from 'react'
import imdb from '../assets/imdb.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookmark, faClipboard, faCube, faGift, faList, faSuitcase, faTemperatureQuarter, faUsers } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className='said_bar'>
    <section className='compny_logo_box'>
      <img src={imdb} className='compny_logo' alt="" srcset="" />
      <FontAwesomeIcon icon={faBars} />
    </section>
    <section className='itumes'>
      <ul>
        <li className='active'><FontAwesomeIcon icon={faGift} className="itum " /> Site Manegment</li>
        <li> <FontAwesomeIcon icon={faClipboard} className="itum" /> Departments</li>
        <li><FontAwesomeIcon icon={faUsers} className="itum" /> Staff Management</li>
        <li><FontAwesomeIcon icon={faBookmark} className="itum" /> Templates</li>
        <li><FontAwesomeIcon icon={faSuitcase} className="itum" /> Task Manegment</li>
        <li><FontAwesomeIcon icon={faTemperatureQuarter} className="itum" /> Temperature logs</li>
        <li> <FontAwesomeIcon icon={faList} className="itum" /> Categories</li>
        <li><FontAwesomeIcon icon={faCube} className="itum" />  Inventory</li>
      </ul>
    </section>
  </div>
  )
}

export default Sidebar
