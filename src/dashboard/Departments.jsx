import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
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

  const [siteName, setSiteName] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const siteData = {
      name: siteName,
      location: siteLocation,
      description: description,
    };

    try {
      const response = await fetch("/api/sites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(siteData),
      });

      if (response.ok) {
        alert("Site added successfully");
        // Clear the form fields
        setSiteName("");
        setSiteLocation("");
        setDescription("");
      } else {
        throw new Error("Failed to add site");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add site");
    }
  };


  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState("left");

  const handleClick = (event) => {
    if (event.target.closest("#inner-element") === null) {
      setIsVisible(false);
    }
    setIsVisible(true);
    setPosition("right");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const selectedOption = `${option.name} (${option.location})`;
    setSelectedOption(selectedOption);
    setIsOpen(false);
    onChange(selectedOption);
  };

  const [isOpens, setIsOpens] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleToggleDropdowns = () => {
    setIsOpens(!isOpens);
  };

  const handleOptionsClick = (options) => {
    setSelectedOptions(options.location);
    setIsOpens(false);
    onChange(options.location);
  };




  return (
    <>
      <Navbar />
      <Sidebar />
      <div className={`${showText ? 'deshbord_main w-[84%] absolute' : 'deshbord_mini h-[60vw] w-[95%] absolute'}`} >
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
                  <p className='text-[#aaaaaa] font-semibold'>{dep.location}</p>
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
                onClick={handleClick}
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

      <div
        className="add_site_data w-[30%]"
        style={{
          left: position === "left" ? "0" : "auto",
          right: position === "right" ? "0" : "auto",
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        <form className="site_data_form w-[26%]" onSubmit={''}>
          <p className=" bg-[#f8f8f8] py-[.8rem] px-[1.6rem] mb-[1rem] flex justify-between">
            Create Departments
            <FontAwesomeIcon
              icon={faXmark}
              className="w-[40px] h-[24px] text-[#625f6e]"
              onClick={(e) => {
                setIsVisible(false);
              }}
            />
          </p>

          <div className="overflow-scroll h-[100%]">
            <ul className=" px-[1.4rem]">
              <li className="flex flex-col mb-[1rem]">
                <label className='mb-[.2857rem]'>Department Name:</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(event) => setSiteName(event.target.value)}
                  className="siteName"
                  placeholder="Enter Site Name"

                />
              </li>
              <li className="flex flex-col mb-[1rem]">
                <label className='mb-[.2857rem]'>Description: </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Enter Description"
                />
              </li>
            </ul>

            <div className="text-[#5e5873] text-[.857rem] px-[1.4rem] mb-[1rem]">
              <label> Select Site: </label>
              <div className="custom-select" ref={dropdownRef}>
                <div className="custom-select__selected flex justify-between rounded-[.357rem] h-[38px]" onClick={handleToggleDropdown}>
                  {selectedOption ? selectedOption : 'Select Site' }
                  <FontAwesomeIcon icon={faAngleRight} className='rotate-90' />
                </div>
                {isOpen && (
                  <div className="custom-select__dropdown">
                    {setPanel.map((option) => (
                      <div
                        key={option.name}
                        className="custom-select__option"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.name} ({option.location})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-[#5e5873] text-[.857rem] px-[1.4rem] mb-[1rem]">
              <label> Select Users: </label>
              <div className="custom-select" ref={dropdownRef}>
                <div className="custom-select__selected flex justify-between rounded-[.357rem] h-[38px]" onClick={handleToggleDropdowns}>
                  {selectedOptions ? selectedOptions : 'Select...' }
                  <FontAwesomeIcon icon={faAngleRight} className='rotate-90' />
                </div>
                {isOpens && (
                  <div className="custom-select__dropdown">
                    {setPanel.map((options) => (
                      <div
                        key={options.location}
                        className="custom-select__option"
                        onClick={() => handleOptionsClick(options)}
                      >
                        {options.location}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="h-[60px]  px-[1.4rem] w-full flex items-center justify-start">
              <button
                type="submit"
                className="w-[] py-[10px] px-[18px] bg-[#102B5B] text-white rounded-[5px] mx-[10px]"
              >
                Submit
              </button>

              <button
                type="submit"
                className="w-[] py-[10px] px-[18px] bg-[#ea5455!important] text-white rounded-[5px] mx-[10px]"
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default Departments;
