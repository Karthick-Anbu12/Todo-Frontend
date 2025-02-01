import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import context from './Context';

function Logout() {
  const {isLoggedIn,setLoggedin,getdata}=useContext(context)
  let navigate = useNavigate();
  let logout = () => {
    window.localStorage.removeItem("mytoken");
    setLoggedin(false);
    navigate("/");
    getdata()

  };
  useEffect(() => {
    let token = window.localStorage.getItem("mytoken");
    if (token) {
      setLoggedin(true);
    }else{
        setLoggedin(false)
    }
    getdata()
  }, []);
    return (
      <div>
        {isLoggedIn && (
          <button className="border border-transparent text-white bg-red-600 rounded-lg px-2 py-1.5  hover:bg-transparent hover:text-red-600
         hover:border-red-600 hover:border  " onClick={logout}>
            Logout
          </button>
        )}
      </div>
    );
  }

export default Logout

