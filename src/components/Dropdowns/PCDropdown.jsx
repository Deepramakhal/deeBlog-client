/*eslint-disable*/
import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext.jsx'
import axios from 'axios'

function PCdropdown() {

  const {logout} = useContext(AuthContext)
  const navigate = useNavigate() 
  const [newPassword,setNewPassword] = useState('')
  const [oldPassword,setOldPassword] = useState('')
  const [passwordChangepopup, setPasswordChangepopup] = useState(false)

  // Logout user funcitanality
    

    // Change password functionality
    const changePassword = async(e)=>{
      e.preventDefault()
      try {
        const response = await axios.post('/api/users/change-password',{
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
        <ul id='profile-dropdown' className='w-fit h-fit shadow-md shadow-black bg-zinc-300 text-lg p-2 absolute z-50 border-t-2 border-black'>
            <Link to='/users/me'>
              <li className='border-slate-500 hover:bg-cyan-300 hover:text-black cursor-pointer border-b-2'>
                  <button className='cursor-pointer'>Profile</button>
              </li>
            </Link>
            <Link to='/blogs/create'>
              <li className='border-slate-500 hover:bg-cyan-300 hover:text-black border-b-2'>
                  <button className='cursor-pointer'>Create Blog</button>
              </li>
            </Link>
            <li className='border-slate-500 hover:bg-cyan-300 hover:text-black cursor-pointer border-b-2 '>
                <button onClick={logoutUser} className='cursor-pointer hover:cyan-300'>Logout</button>
            </li>
            <li className='border-slate-500 hover:bg-cyan-300 hover:text-black'>
               <button onClick={handlePasswordChange} className='cursor-pointer'>Change password</button>
            </li>
        </ul>

        
    </>
  )
}

export default PCdropdown