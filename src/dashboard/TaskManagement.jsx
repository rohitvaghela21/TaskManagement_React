import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { faCaretDown, faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';

const TaskManagement = () => {

  const { token, setPage, page, fetchSitePanel, setPanel, showText, ActiveTitle } = useAuth();

  const [task, setTask] = useState([]);
  const [activeTask, setActiveTask] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpens, setIsOpens] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    const fetchTask = async () => {
      try {
        let url = `https://dev-backend.aquaint.co.uk/api/v1/master-task/web-app-list?limit=10&page=${page}`;

        if (activeTask) {
          url += `&siteID=${activeTask._id}`;
        }

        const data = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const Taskmang = await data.json();
        if (isMounted) {
          // Filter task data based on selected status
          const filteredTask = Taskmang.data.list.filter(tas => selectedItem === 'All' || tas.individualTask.status.toLowerCase() === selectedItem.toLowerCase());
          setTask(filteredTask);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchTask();
    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [activeTask, selectedItem,  selectedDate, token, page]); // Include activeTask and token in the dependency array

  const handleDepartClick = (dep) => {
    setActiveTask(dep);
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


  const menuItems = ['All', 'Pending', 'completed', 'inprogress', 'overdue'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item
    setIsOpen(false); // Close the dropdown
  };

  const toggleDropdowns = () => {
    setIsOpens(!isOpens);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpens(false);
  };

  const formatTime = (timeStr) => {
    const hour = parseInt(timeStr.substr(0, 2));
    const minute = parseInt(timeStr.substr(3, 2));

    // Check if hour and minute are valid numbers
    if (!isNaN(hour) && !isNaN(minute)) {
      const period = hour < 12 ? 'AM' : 'PM'; // Determine AM or PM
      const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
      return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
    } else {
      return ''; // Return a fallback value for invalid time
    }
  };

 
  const formatDate = (dateString) => {
    const dateParts = dateString.split(/[T-]/); // Split the date string by dashes and 'T'
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Reorder the date parts
    const limitedDate = formattedDate.substring(0, 10); // Limit the string to 10 characters
    return limitedDate;
  };



  return (
    <>
      <Navbar />
      <Sidebar />

      <div className={`${showText ? 'deshbord_main min-h-[50vw]' : 'deshbord_mini min-h-[50vw]'}`} >
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
                  className={`${activeTask.name === dep.name
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

        <div className={`${showText ? 'management_items w-[76%] ml-auto h-auto max-h-[160vw]' : 'management_items  w-[79%] ml-auto h-auto max-h-[160vw]'}`}>
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
                Add task
              </button>
            </div>
          </header>

          <div className="dropdown-container">
            <button
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={isOpen}
            >
              {selectedItem || "Toggle Dropdown"}
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                {/* <div className="dropdown-item" disabled>
                </div> */}
                {menuItems.map((item, index) => (
                  <div key={index} className={selectedItem === item ? "dropdown_active" : "dropdown-item"}
                    onClick={() => {
                      handleItemClick(item);
                      toggleDropdown();
                    }}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='text-[#625f6e] text-[14px] pl-[15px] mt-[10px] '>
            <p>Filter by Date</p>
            <button
              className="dropdown-toggle max-h-[38px]"
              onClick={toggleDropdowns}
              aria-expanded={isOpens}
            >
              {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'Select Date'}
            </button>
            {isOpens &&
              <div className='absolute'>
               <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Date"
              className="custom-date-picker"
            />
              </div>
            }
          </div>

          <div className="sites_items text-black my-[20px] ">
            <div className='w-80% overflow-scroll'>
              <table className="w-full mt-[20px] font-semibold">
                <tr className=" border-b #e5e7eb text-sm flex ">
                  <td className="py-[20px] px-[12px] min-w-[180px] max-w-full  text-start">Task Name</td>
                  <td className="py-[20px] px-[12px] min-w-[200px] max-w-full  text-start">Assignees </td>
                  <td className="py-[20px] px-[12px] min-w-[180px] max-w-full  text-start">Category </td>
                  <td className="py-[20px] px-[12px] min-w-[180px] max-w-full  text-start">Site </td>
                  <td className="py-[20px] px-[12px] min-w-[180px] max-w-full   text-start">Due Name </td>
                  <td className="py-[20px] px-[12px] min-w-[120px] max-w-full   text-start">Submitted At</td>
                  <td className="py-[20px] px-[12px] min-w-[140px] max-w-full  text-start">Status</td>
                  <td className="py-[20px] px-[12px] min-w-[120px] max-w-full   text-start">Action</td>
                </tr>

                {task.map((tas, index) => (
                  <tr className="border-b #e5e7eb text-[#625f6e]  flex text-sm" key={index} >

                    <td className="py-[36px] px-[12px] min-w-[180px] max-w-full text-start">
                      {tas.name}
                    </td>
                    <td className="py-[36px] px-[12px] min-w-[200px] max-w-full text-start">
                      {tas.assigneeID.map((tass) => (
                        <p>{tass.firstName} {tass.lastName}</p>
                      ))}
                    </td>
                    <td className="py-[36px] px-[12px] min-w-[180px] max-w-full text-start">
                      {tas.taskCategoryIDs.length > 0 ? tas.taskCategoryIDs.join(', ') : "-"}
                    </td>
                    <td className="py-[36px] px-[12px] min-w-[180px] max-w-full text-start">
                      {tas.siteID.name}
                    </td>
                    <td className="py-[36px] px-[12px] min-w-[180px] max-w-full flex flex-col text-start">
                      <p>{formatTime(tas.sortExpiryTime ? tas.sortExpiryTime.split('T')[1].split('+')[0] : ' ')}</p>
                      <p>{formatDate(tas.sortExpiryTime ?tas.sortExpiryTime :'' )}</p>
                    </td>
                    <td className="py-[36px] px-[12px] min-w-[120px] max-w-full text-start">
                      {tas.totalCheckListItems}
                    </td>
                    <td className="py-[36px] px-[12px] min-w-[140px] max-w-full text-start text-[#102B5B] font-bold">
                      <p className='border-solid border-2 border-[#102B5B] p-[5px] rounded-md text-center'> {tas.individualTask.status.toLowerCase()}
                      </p>
                    </td>

                    <td className="py-[36px] px-[12px] min-w-[120px] max-w-full text-start relative" ref={dropdownRef}>
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
            </div>

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

export default TaskManagement
