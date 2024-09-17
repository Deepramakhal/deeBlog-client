/*eslint-disable*/
import React,{ useEffect, useState,useRef} from 'react'
import axios from 'axios'


function Profile() {

  const [username,setUsername] = useState('');
  const [newUsername,setNewUsername] = useState('');
  const [email,setEmail] = useState('')
  const [newEmail,setNewEmail] = useState('')
  const [profilePicture,setProfilePicture]= useState(null)

  const [visiblePop,setVisiblePop] = useState(false)

  const fileInputRef = useRef(null)
  
  // Disdplay profile details funcitanality
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-details`)
  
      setUsername(response.data.data.username)
      setEmail(response.data.data.email)
      setProfilePicture(response.data.data.profilePicture)
    }
    getUserDetails()
  },[])
  // Edit profile details funcitanality
  const popVisible = () => {
    setVisiblePop(!visiblePop)
  }
  
  const editDetails = async()=>{
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/change-details`,{
      username:newUsername?newUsername:username,
      email:newEmail?newEmail:email
    })
    if(response.status === 200){
      alert("Details changed successfully")
    }
  }
  // Profile picture change funcitanality
  const handleFileinput = ()=>{
    fileInputRef.current.click()
  }

  const handleFile = async(e)=>{
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('profilePicture',file)
    
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/change-dp`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      console.log(response);
      
      setProfilePicture(response.data.data.profilePicture)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[100%] max-h-[70%] rounded bg-yellow-100 relative flex justify-center items-center'>
      <div className='w-screen min-h-full flex justify-center items-center'>
          <div className=' flex w-96 h-96  flex-col items-center justify-center gap-2'>
            <div id="profile-pic" className='w-48 h-36 flex absolute top-10'>
              <img src={profilePicture} className='rounded-full relative w-36 h-36 mb-4 border-4 border-double  border-black' alt="Profile Photo"/>
              <div id='edit-profile-pic' className='w-6 h-6 relative mt-auto' onClick={handleFileinput} >
                  <svg width="48" height="48" viewBox="0 0 48 48" className='w-6 h-6 cursor-pointer' fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" fill="black"/>
                  <path d="M22 8H8C6.93913 8 5.92172 8.42142 5.17157 9.17157C4.42143 9.92171 4 10.9391 4 12V40C4 41.0609 4.42143 42.0783 5.17157 42.8284C5.92172 43.5786 6.93913 44 8 44H36C37.0609 44 38.0783 43.5786 38.8284 42.8284C39.5786 42.0783 40 41.0609 40 40V26M37 5C37.7956 4.20435 38.8748 3.75735 40 3.75735C41.1252 3.75735 42.2044 4.20435 43 5C43.7956 5.79564 44.2426 6.87478 44.2426 8C44.2426 9.12521 43.7956 10.2043 43 11L24 30L16 32L18 24L37 5Z" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input type="file" id='pic-input' name="profilePicture" accept='image/*'  className='hidden' ref={fileInputRef} onChange={handleFile}/>
              </div>
            </div>
            <h2>Your username: {username}</h2>
            <h2>Your email: {email}</h2>
            <button onClick={popVisible} >Edit Details</button>
          </div>
          <div className={`overflow-auto h-96 w-96  border-2 resize border-black p-6 rounded-xl relative bg-white text-black
           ${visiblePop ? 'block' : 'hidden'}`}>
            <button onClick={popVisible} className='absolute top-0 right-0 bg-slate-500 p-2 rounded-xl text-red-500'>Close</button>
            <form onSubmit={editDetails} className='w-[90%] absolute top-10 flex flex-col'>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={newUsername} onChange={(e)=>setNewUsername(e.target.value)}
              className='border-b-2 border-slate-600 w-full active:border-b-2 active:border-black' />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}
              className='border-b-2 border-slate-600 w-full active:border-b-2 active:border-black' />
              <button type="submit">Edit details</button>
            </form>
           </div>
      </div>
    </div>
  )
}

export default Profile