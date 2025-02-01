import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const context = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setLoggedin] = useState(true)
  const [data, setdata] = useState([])
  const [list, setlist] = useState([])
  const [completed,setcompleted]=useState([])
  const getdata = async () => {
    const value = await axios.get("http://localhost:3000/userdata", {
      headers: {
        Authorization: window.localStorage.getItem("mytoken")
      }
    });
    setdata(value.data)
    setlist([...value.data.list])
    setcompleted([...value.data.Completed])
  }
  const remove = async (index) => {
    list.splice(index, 1)
    setlist([...list])
    try {
      await axios.post("http://localhost:3000/removefromlist", list, {
        headers: {
          Authorization: window.localStorage.getItem("mytoken")
        }
      })
      getdata();
    } catch (error) {
      console.log("Someting went wrong")
    }
  }
  const movetocomplete = async (index) => {
    let value = list[index]
    try {
      await axios.post("http://localhost:3000/movetocomplete", value, { headers: { Authorization: window.localStorage.getItem("mytoken") } })
      list.splice(index, 1)
      setlist([...list])
      await axios.post("http://localhost:3000/removefromlist", list, {
        headers: {
          Authorization: window.localStorage.getItem("mytoken")
        }
      })
    getdata()
    }
    catch (error) {
      console.log("Someting went wrong")
    }
  }
  useEffect(() => {
    getdata()
  }, [])
  return <context.Provider value={{ data, getdata, isLoggedIn, setLoggedin, list, remove, movetocomplete,completed }}>
    {children}
  </context.Provider>
}
export default context
