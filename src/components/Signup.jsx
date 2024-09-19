/*eslint-disable*/
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {

  const [username,setUsername] = useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [profilePicture,setProfilePicture] = useState(null)
  const navigate = useNavigate();
  let checkedPassword;
  let passwordCheckingError= false;

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setProfilePicture(file);
};

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('username',username);
    formData.append('email',email);
    formData.append('password',checkedPassword);
    formData.append('profilePicture',profilePicture);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })

      if(response.status===200){
        alert("User registered successfully");
        navigate('/')


      }else alert("Signup failed")
    } catch (error) {
      window.alert("User with this username or emial already exists"  )
    }

  }  
  (()=>{
    if(password===confirmPassword)
      checkedPassword = password;
    else{
      passwordCheckingError = true
    }
  })()

  return (
    <div className='w-[90%] h-[70vh] mt-8 flex justify-center items-center '>
      <form onSubmit={handleSubmit} className='w-1/2 h-fit gap-8 flex flex-col border-[10px] p-6 border-double bg-clip-border bg-gradient-to-br from-[#295c31] to-[#a18c15]'>
        <input type="text" 
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          placeholder='Enter username'
          required
          className='backdrop:blur-3xl h-10 placeholder:text-black bg-white/10 border-2 border-cyan-500 placeholder:text-center text-center'
        />
        <input type="email" 
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder='Enter email '
          required
          className='backdrop:blur-3xl h-10 placeholder:text-black bg-white/10 border-2 border-cyan-500 placeholder:text-center text-center'

        />
        <input type="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder='Enter your password'
          required
          className='backdrop:blur-3xl h-10 placeholder:text-black bg-white/10 border-2 border-cyan-500 placeholder:text-center text-center'

        />
        <input type="text" 
          value={confirmPassword}
          onChange={(e)=>{setConfirmPassword(e.target.value)}}
          placeholder='Confirm your password'
          className={`backdrop:blur-3xl h-10 placeholder:text-black bg-white/10 border-2 border-white placeholder:text-center text-center ${passwordCheckingError?"focus:bg-red-300":"border-cyan-500"}`}

        />
        <input type="file" 
        onChange={handleFileChange}
        accept='image/*'
        name="profilePicture"
        required
        className='file:rounded-full file:p-4'
        placeholder='Choose profile picture'
        />
        {passwordCheckingError?(<p>Password and confirm password must be same</p>):(<input type='submit' value='Sign up'/>)}
      </form>
    </div>
  )
}

export default Signup