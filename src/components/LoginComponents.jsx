import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { userLogin } from "../api/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const LoginComponents = () => {
  const [loginDetail, setLoginDetail] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    if (loginDetail) {
      const res = await userLogin({ loginDetail });
      if (res.status === 200) {
        toast("Login sucessfully");
        navigate("/admin");
        localStorage.setItem("access_token", res?.data?.accessToken);
      } else {
        toast(res?.response?.data?.message);
      }
    }
  };
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="w-[40%]  h-[50%] px-14 ">
        <div className="w-full h-full flex  flex-col items-center justify-center">
          <h1 className="text-5xl text-amber-500  logintext">Login</h1>

          <div className="mt-10 flex flex-col w-full gap-5">
            <h1 className="italic text-lg text-amber-500">Email or Phone</h1>
            <input
              type="text"
              name="email"
              className="border  text-white border-[#414141]  bg-transparent rounded-md w-full p-2 focus:outline-none"
              placeholder="Email or Phone"
              onChange={(e) =>
                setLoginDetail({
                  ...loginDetail,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-10 flex flex-col w-full gap-5 ">
            <h1 className="italic text-lg text-amber-500">Password</h1>
            <input
              type="text"
              name="password"
              className="border  text-white border-[#414141]  bg-transparent rounded-md w-full p-2 focus:outline-none"
              placeholder="Password"
              onChange={(e) =>
                setLoginDetail({
                  ...loginDetail,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-10 flex gap-10">
            <button
              className="px-5 py-2 bg-amber-500 text-white rounded-lg"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
