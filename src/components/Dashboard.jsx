import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
// import imdb from '../assets/imdb.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { token, loginAction } = useAuth();

  const [setPanel, setSetPanel] = useState([]);

  const [show, setShow] = useState(Array(setPanel.length).fill(false));

  const fetchSitePanel = async () => {
    const response = await fetch(
      `https://dev-backend.aquaint.co.uk/api/v1/site-panel/web-app-list?limit=10&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const sitePanelResponse = await response.json();
    setSetPanel(sitePanelResponse.data.list);

  };

  useEffect(() => {
    loginAction();
    fetchSitePanel();
  }, []);






  return (
    <>
      {/* <div class="header-navbar-shadow"></div> */}
      <Navbar />
      <Sidebar />
      <div className="deshbord_main">
        <div className="management_items">
          <header className="flex items-center justify-between">
            <h2>Site Management</h2>
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

          <div className=" sites_items text-black my-[20px] ">
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
                  <td className="py-[36px] px-[12px] w-full text-start flex">
                    {item.siteAdminList.map((it) => {
                      return <p className="px-[5px]">{it.userDetails.firstName} {it.userDetails.lastName}</p>
                    })}
                  </td>
                  <td className="py-[36px] px-[12px] w-full text-start relative">
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

        <ul>
          {/* {setPanel.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))} */}
        </ul>
      </div >
    </>
  );
};

export default Dashboard;
