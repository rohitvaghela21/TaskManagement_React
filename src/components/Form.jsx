import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import form_main from "../assets/form_main.png";
import logo from "../assets/logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginAction } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const hendulSubmit = async (e) => {
    e.preventDefault();
    // console.log("formData", formData);
    console.log(
      "formData",
      JSON.stringify({
        email: formData.email,
        password: formData.password,
      })
    );
    fetch(
      "https://dev-backend.aquaint.co.uk/api/v1/authentication/web-app-login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    ).then((response) => response.json());
    // .then((response) => {
    //   // console.log(response);
    // });

    await loginAction(formData);

    setFormData({
      email: "",
      password: "",
    });
  };

  // position: absolute;
  //   top: 2rem;
  //   z-index: 1;
  //   justify-content: unset;
  return (
    <>
      <div
        style={{ display: "flex", height: "46vw", backgroundColor: "#f8f8f8" }}
      >
        <section className="absolute top-10 left-10 z-[1] flex justify-unset">
          <a className="brand-logo" href="/">
            <img src={logo} alt="logo" className="w-[24%]"  />
          </a>
        </section>

        <section className="form_main_img">
          <div>
            <img src={form_main} alt="main form" />
          </div>
        </section>

        <form className="main_form" onSubmit={hendulSubmit} method="post">
          <div className="flex flex-col justify-around w-full">
            <p className="text-[#000] text-sm my-[2px]">Welcome Back 👋 </p>
            <p className="text-sm my-[8px]">Sign in below</p>
            <ul>
              <li>
                <label htmlFor="email text-[10px]">Email</label>
                <input className="flex input_box py-[8px] px-[16px]"
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  placeholder="example@yahoo.com"
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                <label htmlFor="password text-[10px]">Password</label>
                <div className="flex input_box">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                    className="py-[10px] px-[10px] w-[40px]"
                  />
                </div>
              </li>

              <li className="flex justify-between items-center h-[26px]">
                <div>
                  <p className="w-full px-[5px] flex items-center ">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id=""
                      className="w-[18px] h-[22px] mr-[5px]"
                    />
                    Remember Me</p>
                </div>
                <p>Forgot password ?</p>
              </li>
            </ul>
            <button type="submit " className="submit">
              Login
            </button>
            <p className="my-[10px] text-center text-slate-500">
              New on our platform?{" "}
              <span className="">
                <a href="" className="text-red-600 font-semibold">
                  Create an account
                </a>
              </span>
            </p>
          </div>
        </form>
        {/* </section> */}
      </div>
    </>
  );
};

export default Form;
