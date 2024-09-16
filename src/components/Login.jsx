/*eslint-disable*/
import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const [username,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [submit,setSubmit] = useState(false);

  useEffect(()=>{
    const loginUser = async () =>{
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login}`,{
          username,
          email:email.toLowerCase(),
          password
        })

        if(response.status === 200){
          setResponseMessage('User logged in successfully...');
          login(response.data.data.accessToken)
          alert("User logged in")
          navigate('/') 
        } 
        else setResponseMessage('Login failed..') 

        const accesToken = response.data.accessToken || null;
        if(accesToken) localStorage.setItem('accesToken',accesToken)

      } catch (error) {
        console.error("Server failed to log in user")
        alert("Incorrect details")
      }
    }

    if(submit){
      loginUser();
      setSubmit(false)
    }

    
  },[submit, username, email, password, login, navigate])
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    setSubmit(true)
  }
  
  return (
    <>
      <div className='w-screen flex items-center justify-center h-[80vh] flex-col'>
        <form onSubmit={handleSubmit} 
        className='flex  border-8 bg-[#074161] border-double border-white  w-1/2 h-1/2 rounded-3xl p-10 '>
          <div className='w-[50%] h-full gap-8 flex flex-col'>
            <input type="text"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder='Enter your username'
            className='h-[15%] border-b-4 border-cyan-500 bg-green-400 w-[100%] rounded-2xl placeholder:text-center focus:bg-white placeholder:text-blue-700'
            />
            <input type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter registered email'
            className='h-[15%] border-b-4 border-cyan-500 bg-green-400 w-[100%] rounded-2xl placeholder:text-center focus:bg-white  placeholder:text-blue-700'

            />
            <input type="password"  
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter your password'
            className='h-[15%] border-b-4 border-cyan-500 bg-green-400 w-[100%] rounded-2xl placeholder:text-center focus:bg-white  placeholder:text-blue-700'  
            />
            <input type="submit" value="Log in"
            className='cursor-pointer border-b-4 border-blue-500 bg-green-400 w-[60%] relative ml-[10%] mt-auto rounded-2xl placeholder:text-center'/>
          </div>
          <div className='w-[50%] h-full flex flex-col items-center justify-center text-wrap'>
            <h1 className='w-[50%] text-[50px] text-justify text-white'>Dont have an account!!</h1>
            <Link to="/signup"
            className='text-center cursor-pointer border-2 border-cyan-500 bg-green-400 w-[60%] animate-bounce relative ml-[10%] mt-auto rounded-2xl placeholder:text-center'>Sign up</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login