import './App.css'
import Navbar from "./Components/Navbar/";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signin from './Components/Signin';
import Addtolist from './Components/Addtolist';
import { UserProvider } from './Components/Context';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Navbar />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/addtolist' element={<Addtolist />}></Route>        
             </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
