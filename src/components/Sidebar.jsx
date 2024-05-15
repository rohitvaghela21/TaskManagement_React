import React, { useState } from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/aquaint-color-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBars,
  faBookmark,
  faBowlFood,
  faClipboard,
  faCloudBolt,
  faCube,
  faGift,
  faList,
  faSnowflake,
  faSuitcase,
  faTemperatureQuarter,
  faTemperatureThreeQuarters,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../AuthProvider";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { toggleText, showText, ActiveTitle, setActiveTitle } = useAuth();

  const handleSetActiveTitle = (sidename, name) => {
    setActiveTitle(sidename, name);
  };

  const sidebarname = [
    { sidename: "SiteManagement", icon: faGift, sidesubname: [] },
    { sidename: "Departments", icon: faClipboard, sidesubname: [] },
    { sidename: "StaffManagement", icon: faUsers, sidesubname: [] },
    { sidename: "Templates", icon: faBookmark, sidesubname: [] },
    { sidename: "TaskManagement", icon: faSuitcase, sidesubname: [] },
    { sidename: "TemperatureLogs", icon: faTemperatureQuarter, sidesubname: [], },
    { sidename: "Categories", icon: faList, sidesubname: [] },
  ];

  const sidesubname = [
    { name: "Fridges", icon: faSnowflake },
    { name: "Freezers", icon: faCloudBolt },
    { name: "Suppliers", icon: faUser },
    { name: "Food Items", icon: faBowlFood },
    { name: "Probes", icon: faTemperatureThreeQuarters },
  ];


  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className={`said_bar ${showText ? "" : "collapsed"}`}>
        <section
          className={`${showText
            ? "compny_logo_box"
            : "h-[110px] flex flex-col justify-evenly items-center "
            }`}
        >
          <img
            src={showText ? logo : logo2}
            className={`${showText ? "compny_logo" : "w-[36px]"}`}
            alt="compny_logo"
          />
          <FontAwesomeIcon
            icon={showText ? faBars : faXmark}
            className="w-[50px] h-[24px] text-[#625f6e]"
            onClick={toggleText}
          />
        </section>

        <section className={`${showText ? "itumes" : "itumes mt-[20px]"}`}>
          <div className="flex flex-col py-[20px]">
            {sidebarname.map((sid) => (
              <Link
                key={sid.sidename}
                to={`/dashboard/${sid.sidename.toLowerCase()}`}
                className={`${showText ? "itme_box" : "icon-only"}
                   ${ActiveTitle === sid.sidename ? "active" : ""}`}
                onClick={() => handleSetActiveTitle(sid.sidename)}
              >
                <FontAwesomeIcon icon={sid.icon} className="itum py-[10px] px-[10px]" />
                {showText && sid.sidename}
              </Link>
            ))}
          </div>
        </section>

        <section className={`${showText ? "itumes" : "itumes "}`}>
          <div className="flex flex-col py-[20px]">
            <button
              className={`${showText ? "itme_box" : "icon-only"}
                   ${ActiveTitle == "Inventory" ? "active" : ""}`}
              onClick={() => {
                handleSetActiveTitle("Inventory");
                setIsShow(!isShow);
              }}
            >

              <FontAwesomeIcon icon={faCube} className="itum" />
              {showText &&
                <>
                  Inventory
                  <FontAwesomeIcon icon={faAngleRight} className={`${ActiveTitle == "inventory"
                    ? "w-[18px] h-[18px] py-[10px] px-[8px] ml-[60px] rotate-90 ease-in"
                    : "w-[18px] h-[18px] py-[10px] px-[8px] ml-[60px] ease-in"} `}
                  />
                </>
              }
            </button>

            {isShow &&
              sidesubname.map((sub) => (
                <Link
                  key={sub.name}
                  to={`/dashboard/${sub.name.toLowerCase()}`}
                  className={`${showText ? "itme_box" : "icon-only"}
                                ${ActiveTitle == sub.name ? "active" : ""}`
                  }
                  onClick={() => handleSetActiveTitle(sub.name)}
                >
                  <FontAwesomeIcon icon={sub.icon} className="itum" />
                  {showText && sub.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Sidebar;
