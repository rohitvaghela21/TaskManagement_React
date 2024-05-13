import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Departments = () => {
  const { token, setPage, page, fetchSitePanel, setPanel, showText, ActiveTitle } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [activeDepart, setActiveDepart] = useState("");

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    const fetchDepartments = async () => {
      try {
        let url = `https://dev-backend.aquaint.co.uk/api/v1/department-panel/web-app-list?limit=10&page=1`;

        if (activeDepart) {
          url += `&siteID=${activeDepart._id}`;
        }

        const data = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        const departmentData = await data.json();

        if (isMounted) {
          setDepartments(departmentData.data.list);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments()

    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [activeDepart, token]); // Include activeDepart and token in the dependency array
  // Add dependencies to the array


  const handleDepartClick = (dep) => {
    setActiveDepart(dep);
  };

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

  useEffect(() => {
    fetchSitePanel();
    setPage(1);
  }, [setPage]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className={`${showText ? 'deshbord_main' : 'deshbord_mini h-[60vw]'}`} >
        <div className="header-navbar-shadow"></div>
        <div className='department_items_name'>
          <header className="flex text-black mb-[10px]">
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
          </header>

          <ul className='text-[#625f6e]'>
            {setPanel.map((dep) => (
              <li key={dep._id}>
                <Link
                  onClick={() => handleDepartClick(dep)}
                  className={`${activeDepart.name == dep.name
                    ? "departactive rounded-lg text-sm"
                    : "h-[80px] border #625f6e flex flex-col items-start justify-center mb-[10px] p-[10px] rounded-lg text-sm"
                    }`}
                >
                  <p><b>{dep.name}</b></p>
                  <p>{dep.location}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${showText ? 'management_items w-[76%] ml-auto h-[50vw]' : 'management_items w-[79%] ml-auto'}`}>
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
                Add Department
              </button>
            </div>
          </header>

          <div className="sites_items text-black my-[20px] ">
            <table className="w-full ">
              <tr className=" border-b #e5e7eb text-sm flex justify-between ">
                <td className="py-[20px] px-[12px] w-full  text-start">Department Name</td>
                <td className="py-[20px] px-[12px] w-full  text-start">Site Name</td>
                <td className="py-[20px] px-[12px] w-full  text-start">User</td>
                <td className="py-[20px] px-[12px] w-full  text-start">Action</td>
              </tr>

              {departments.map((item, index) => (
                <tr
                  className="border-b #e5e7eb text-[#625f6e] font-normal flex justify-between text-sm"
                  key={index}
                >
                  <td className="py-[36px] px-[12px] w-full text-start">
                    {item.sortName}
                  </td>
                  <td className="py-[36px] px-[12px] w-full text-start flex flex-wrap">
                    <p className="user_names"> {item.siteData.name}</p>
                  </td>
                  <td className="py-[36px] px-[12px] w-full text-start">
                    {item.userCount}
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

export default Departments;
