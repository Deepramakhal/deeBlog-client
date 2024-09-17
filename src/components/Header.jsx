/*eslint-disable*/
import React,{useState,useContext, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'
import { useDispatch } from 'react-redux'
import { setSearchTerm, fetchResult } from '../features/blogSlice.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Header(){
  const [input, setInput] = useState('')
  const {isLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const {logout} = useContext(AuthContext)
  const [newPassword,setNewPassword] = useState('')
  const [oldPassword,setOldPassword] = useState('')
  const [passwordChangepopup, setPasswordChangepopup] = useState(false)

  useEffect(()=>{
    setMenuOpen(false)},[])

  const handleSearch = (e) =>{
    e.preventDefault()
    dispatch(setSearchTerm(input));
    dispatch(fetchResult(input));
    navigate('search')
  }

  const logoutUser = async ()=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`)

      if(response.status === 200){
        logout()
        navigate('/')
      }
    } catch (error) {
      console.log("Logout failed",error)
    }
  }


  const changePassword = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/change-password`,{
        oldPassword, newPassword
      })

      if(response.status === 200){
        alert("Password changed successfully")
      }

      setPasswordChangepopup(false)
      logoutUser()
    } catch (error) {
      alert("Incorrect old password")
    }
  }

  const handlePasswordChange = ()=>{
    setPasswordChangepopup(!passwordChangepopup)
  }


  return (
    <>
    {/* laptop/computer/tablet view */}
      <header className={`w-screen min-h-fit flex justify-center p-2 bg-[#074161] sm:hidden md:flex items-center flex-wrap`}>
        <nav className='w-screen h-20 md:w-[90%]  md:rounded-2xl bg-[#202020] flex items-center justify-around relative'>
          <div id='logo' className='min-w-fit max-w-[10%] h-16 mr-auto ml-4'>
            <NavLink to='/'><img src="/logo.webp" alt="" className='w-16 h-16'/></NavLink>
          </div>
          <div id='search-bar' className='min-w-[20%] mr-auto'>
            <form onSubmit={handleSearch} className='w-[150%]'>
              <input type='search' 
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                placeholder='Search blogs'
                className='w-[80%] px-6 rounded-l-xl h-8 placeholder:text-center placeholder:font-serif focus:border-2 focus:border-slate-600'
              />
              <input id='search-icon' type='submit' value='Search' className='cursor-pointer w-[20%] text-white bg-slate-600 rounded-r-xl h-8 px-2' />
            </form>
          </div>
          <div id="navigation" className='text-white mr-4 ml-auto text-'>
            <ul className='flex gap-2'>
              <li className='navigation-items'>
                <NavLink
                to="/"
                className={({isActive})=>`${isActive?"text-cyan-300":"text-white"}`}
                >Home</NavLink>
              </li>
              <li className='navigation-items'>
                <NavLink to='/about-us'
                className={({isActive})=>`${isActive?"text-cyan-300":"text-white"}`}
                >About us</NavLink>
              </li>
              <li className='navigation-items relative'>
                {isLoggedIn? (
                  <svg id='profile-icon' onClick={()=>setMenuOpen(!menuOpen)} width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 42V38C40 35.8783 39.1571 33.8434 37.6569 32.3431C36.1566 30.8429 34.1217 30 32 30H16C13.8783 30 11.8434 30.8429 10.3431 32.3431C8.84285 33.8434 8 35.8783 8 38V42M32 14C32 18.4183 28.4183 22 24 22C19.5817 22 16 18.4183 16 14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14Z" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ):(
                  <NavLink
                to="/login"
                className={({isActive})=>`${isActive?"text-cyan-300":"text-white"}`}
                >Login</NavLink>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {menuOpen && isLoggedIn && (<div className='w-screen h-fit flex flex-col items-center relative mb-2'>
        <ul className='w-[90%] bg-[#202020] flex h-fit p-4 text-white justify-around rounded-lg'>
          <li className='navigation-items'><NavLink to='/users/me'>Profile</NavLink></li>
          <li className='navigation-items'><button onClick={logoutUser}>Logout</button></li>
          <li className='navigation-items'>{isLoggedIn && <button onClick={handlePasswordChange}>Change Password</button>} </li>
          {isLoggedIn && <li className='navigation-items'><NavLink to='/dashboard' onClick={()=>setPasswordChangepopup(false)}>Dashboard</NavLink></li>}
        </ul>
      </div>)}
      {
          passwordChangepopup && (
            <div className='w-screen h-screen bg-[#202020] absolute flex justify-center items-center'>
              <div className='w-[40%] h-fit bg-[#202020] p-4 rounded-md border-2 border-white'>
                <form onSubmit={changePassword} className='w-full'>
                  <div className='w-full flex flex-col'>
                    <label htmlFor="oldPassword" className='text-white'>Old Password</label>
                    <input type="password" id="oldPassword" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className='w-full h-8 border-2 border-slate-500 rounded-md p-2' />
                  </div>
                  <div className='w-full flex flex-col'>
                    <label htmlFor="newPassword" className='text-white'>New Password</label>
                    <input type="password" id="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className='mb-8 w-full h-8 border-2 border-slate-500 rounded-md p-2' />
                  </div>
                  <div className='w-full flex justify-end'>
                    <button type="submit" className='w-20 h-8 bg-slate-600 text-white rounded-md absolute'>Change</button>
                  </div>
                </form>
                <button onClick={()=>setPasswordChangepopup(false)} className='w-20 h-8 bg-slate-600 text-white rounded-md'>Close</button>
              </div>
            </div>
          )
        }
    </>
  )
}

export default Header