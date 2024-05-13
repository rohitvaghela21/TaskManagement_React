import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import form_main from "../assets/form_main.png";

const Form = () => {

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
    )
      .then((response) => response.json())
    // .then((response) => {
    //   // console.log(response);
    // });

    await loginAction(formData);

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div style={{ display: "flex", height: "46vw", backgroundColor: "#E6E6E6" }}>
        <section className="form_main_img">
          <div >
            <img src={form_main} alt="main form" />
          </div>
        </section>
        {/* <section style={{width:"32%" , height:"100%", display:"flex" ,flexDirection:"column", alignItems:"center"}}> */}
        <form onSubmit={hendulSubmit} method="post" >
          <div className="flex flex-col justify-around w-full">
            <p className="text-[#000] text-sm my-[2px]">Welcome Back</p>
            <p className="text-[16px] my-[8px]">Sign in below</p>
            <ul>
              <li>
                <label htmlFor="email font-bold" >Email</label>
                <input
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
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  placeholder="password"
                  onChange={handleChange}
                  required
                />
              </li>
              <li className="flex justify-between items-center h-[26px]">
                <div className="flex items-center ">
                  <input type="checkbox" name="checkbox" id="" className="w-[24px]" />
                  <p className="w-full px-[5px] ">Remember Me</p>
                </div>
                <p>Forgot password ?</p>

              </li>
            </ul>
            <button type="submit " className="submit">Login</button>
            <p className="my-[10px] text-center text-slate-500">New on our platform? <span className="text-slate-500" ><a href="" >Create an account</a></span></p>
          </div>
        </form>
        {/* </section> */}
      </div>
    </>
  );
};

export default Form;
