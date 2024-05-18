import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ReactSelect from "react-select";

const SiteManagement = () => {
  const {
    setPage,
    page,
    fetchSitePanel,
    setPanel,
    showText,
    loginAction,
    ActiveTitle,
  } = useAuth();

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
  const [selectedDay, setSelectedDay] = useState(null);

  const handleClick = (event) => {
    if (event.target.closest("#inner-element") === null) {
      setIsVisible(false);
    }
    setIsVisible(true);
    setPosition("right");
  };

  const opne = ["Before Open", "Opne", "Morning", "Lunch", "Afternoon", "Evening", "Close", "After Close"]

  const daysOfWeek = [
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
  ];

  const [isClosed, setIsClosed] = useState(false);

  const handleChange = (event) => {
    setIsClosed(event.target.checked);
  };


  return (
    <>
      <Navbar />
      <Sidebar />

      <div
        className={`${showText ? "deshbord_main w-[84%] absolute" : "deshbord_mini w-[95%] absolute"
          }`}
      >
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
                onClick={handleClick}
              >
                Add site
              </button>
            </div>
          </header>

          <div className="sites_items text-black my-[20px] ">
            <table className="w-full ">
              <tr className=" border-b #e5e7eb text-sm flex justify-between ">
                <td className="py-[20px] px-[12px] w-full  text-start">Site</td>
                <td className="py-[20px] px-[12px] w-full  text-start">
                  Location
                </td>
                <td className="py-[20px] px-[12px] w-full  text-start">
                  Site Admin
                </td>
                <td className="py-[20px] px-[12px] w-full  text-start">
                  Action
                </td>
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
                      return (
                        <p className="user_names">
                          {it.userDetails.firstName} {it.userDetails.lastName}
                        </p>
                      );
                    })}
                  </td>
                  <td
                    className="py-[36px] px-[12px] w-full text-start relative"
                    ref={dropdownRef}
                  >
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
                          <a href="">
                            {" "}
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="mx-[8px]"
                            />
                            Edit
                          </a>
                          <a href="">
                            {" "}
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="mx-[8px]"
                            />{" "}
                            Delete
                          </a>
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
        className="add_site_data"
        style={{
          left: position === "left" ? "0" : "auto",
          right: position === "right" ? "0" : "auto",
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        <form className="site_data_form w-[42%]" onSubmit={handleSubmit}>
          <p className=" bg-[#f8f8f8] py-[.8rem] px-[1.6rem] mb-[1rem] flex justify-between">
            New Site
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
                <label className='mb-[.2857rem]'>Site Name:</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(event) => setSiteName(event.target.value)}
                  className="siteName"
                  placeholder="Enter Site Name"

                />
              </li>
              <li className="flex flex-col mb-[1rem]">
                <label className='mb-[.2857rem]'>Site Location: </label>
                <input
                  type="text"
                  value={siteLocation}
                  className="siteName"
                  onChange={(event) => setSiteLocation(event.target.value)}
                  placeholder="Enter Site Location"
                />
              </li>
              <li className="flex flex-col mb-[1rem]">
                <label className='mb-[.2857rem]' >Description: </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Enter Description"
                />
              </li>
            </ul>

            <div className="mb-[1rem]  px-[1.4rem]">
              <ul className="site_data_days">
                {daysOfWeek.map((day, index) => (
                  <li key={index} className="site_data_days_name">
                    {" "}
                    {day.value}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[#5e5873] text-[.857rem] px-[1.4rem] mb-[1rem]">
              Please select & enter time slots which you will assign tasks to
            </p>
            <p className="text-[#5e5873] text-[.857rem] px-[1.4rem] mb-[1rem]">
              Select a day to copy the times across from
            </p>

            <div className="text-[#5e5873] text-[.857rem] px-[1.4rem] mb-[1rem]">
              <label> Select Day: </label>
              <div className="flex">
                <ReactSelect
                  options={daysOfWeek}
                  value={selectedDay}
                  onChange={setSelectedDay}
                  className="select_name"
                />
                <button
                  type="button"
                  className="w-[] py-[10px] px-[20px] bg-[#102B5B] text-white rounded-[5px] mx-[15px]"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="px-[1.4rem]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isClosed}
                  onChange={handleChange}
                  id="closed-all-day"
                  className="w-[20px] h-[20px] mr-[10px]"
                />
                <label htmlFor="closed-all-day">Closed all day</label>
              </div>
              <ul>
                <li className="flex flex-col items-center mt-[1rem]">
                  <div className="w-full ">
                    {opne.map((op, index) => (
                      <>
                        <div className="flex items-center mt-[1rem]">
                          <input type="checkbox" id="before-open" className="w-[36px] h-[36px] mr-[10px]" />
                          <label htmlFor="before-open" className="w-full">
                            {op}
                          </label>
                          <div className="flex w-[700px] justify-around">
                            {isClosed ? (
                              <h5>Closed</h5>
                            ) : (
                              <>
                                {[0].map((item, index) => (
                                  <div key={index} className="flex gap-[5px]">
                                    <select className="select_box" >
                                      {[...Array(24)].map((_, i) => (
                                        <option key={i} value={i < 10 ? '0' + i : i}>
                                          {i < 10 ? '0' + i : i}
                                        </option>
                                      ))}
                                    </select>
                                    :
                                    <select className="select_box" >
                                      {[...Array(4)].map((_, i) => (
                                        <option key={i} value={i * 15}>
                                          {i * 15}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ))}
                                <span>
                                  <h5> to </h5>
                                </span>
                                {[0].map((item, index) => (
                                  <div key={index} className="flex gap-[5px]">
                                    <select className="select_box" >
                                      {[...Array(24)].map((_, i) => (
                                        <option key={i} value={i < 10 ? '0' + i : i}>
                                          {i < 10 ? '0' + i : i}
                                        </option>
                                      ))}
                                    </select>
                                    :
                                    <select className="select_box" >
                                      {[...Array(4)].map((_, i) => (
                                        <option key={i} value={i * 15}>
                                          {i * 15}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </li>
              </ul>

            </div>

            <div className="h-[180px] w-full flex items-center justify-center">
              <button
                type="submit"
                className="w-[] py-[10px] px-[20px] bg-[#102B5B] text-white rounded-[5px] mx-[15px]"
              >
                Add Site
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default SiteManagement;
