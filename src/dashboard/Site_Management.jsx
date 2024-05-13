import { faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../AuthProvider';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const SiteManagement = () => {

  const {  setPage,page ,fetchSitePanel, setPanel,showText ,loginAction ,ActiveTitle} = useAuth();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (page > 0) {
    loginAction();
    fetchSitePanel();
    }
  }, [page]);

  const [show, setShow] = useState(Array(setPanel.length).fill(false));

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const updatedOptions = [...show];
        updatedOptions.fill(false);
        setShow(updatedOptions);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <>
  <Navbar />
  <Sidebar />
      <div className={`${showText ? 'deshbord_main' : 'deshbord_mini'}`} >
        <div className="header-navbar-shadow"></div>
        <div className="management_items w-full">
          <header className="flex items-center justify-between">
            <h2>{ActiveTitle}</h2>
            <div className="flex text-black">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-[20px] h-[20px] p-[10px]"
              />
              <input
                type="text"
                name="search"
                placeholder="Search sites"
                className="search_input"
              />
              <button
                type="button"
                className="w-full bg-[#102B5B] text-white rounded-[5px] mx-[15px]"
              >
                Add site
              </button>
            </div>
          </header>

          <div className="sites_items text-black my-[20px] ">
            <table className="w-full ">
              <tr className=" border-b #e5e7eb text-sm flex justify-between ">
                <td className="py-[20px] px-[12px] w-full  text-start">Site</td>
                <td className="py-[20px] px-[12px] w-full  text-start">Location</td>
                <td className="py-[20px] px-[12px] w-full  text-start">Site Admin</td>
                <td className="py-[20px] px-[12px] w-full  text-start">Action</td>
              </tr>

              {setPanel.map((item, index) => (
                <tr
                  className="border-b #e5e7eb text-[#625f6e] font-normal flex justify-between text-sm"
                  key={index}
                >
                  <td className="py-[36px] px-[12px] w-full text-start">
                    {item.name}
                  </td>
                  <td className="py-[36px] px-[12px] w-full text-start">
                    {item.location}
                  </td>
                  <td className="py-[36px] px-[12px] w-full text-start flex flex-wrap">
                    {item.siteAdminList.map((it) => {
                      return <p className="user_names">{it.userDetails.firstName} {it.userDetails.lastName}</p>
                    })}
                  </td>
                  <td className="py-[36px] px-[12px] w-full text-start relative" ref={dropdownRef}>
                    <div
                      onClick={() => {
                        const updatedOptions = [...show];
                        updatedOptions.fill(false);
                        updatedOptions[index] = !updatedOptions[index];
                        setShow(updatedOptions);
                      }}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                      {show[index] && (
                        <ul className="togal_box">
                          <a href="" > <FontAwesomeIcon icon={faPenToSquare} className="mx-[8px]" />Edit</a>
                          <a href="" > <FontAwesomeIcon icon={faTrash} className="mx-[8px]" /> Delete</a>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

            </table>

            <div className="w-full flex justify-center my-[24px]">
              <button
                type="button"
                className="w-[] py-[10px] px-[20px] bg-[#102B5B] text-white rounded-[5px] mx-[15px]"
              >
                End of Results
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default SiteManagement



