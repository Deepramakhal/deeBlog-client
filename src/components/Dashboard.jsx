/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const [blogsOnDashboard, setBlogsOnDashboard] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [blogId, setBlogId] = useState('')
  const [deleteBlogConfirmation, setDeleteBlogConfirmation] = useState(false)
  const Navigate = useNavigate();
  const [isCustomCategory, setIsCustomCategory] = useState(false); 
  const [customCategory, setCustomCategory] = useState('');      


  const categorySuggestions = ['Technology', 'Health', 'Finance', 'Travel'];

  
  useEffect(()=>{
      const fetchBlogs = async()=>{
        try {
          const {data:blogs} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/`)
          const {data:userDetails} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-details`)
          
          setBlogsOnDashboard(blogs.data.filter((e)=>{
            return e.writer.username === userDetails.data.username
          }))
          
        } catch (error) {
          console.error(error)
        } 
      }

    fetchBlogs()
  },[deleteBlogConfirmation,isEditing]);

  const handleEdit =(id) =>{
    setIsEditing(!isEditing)
    setBlogId(id)
  }
  
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setNewCategory(selectedCategory);    
    if (selectedCategory === 'Other') {
      setIsCustomCategory(true);         
    } else {
      setIsCustomCategory(false);        
      setCustomCategory('');             
    }
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    
    const finalCategory = isCustomCategory ? customCategory : newCategory; 
  
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/update`, {
        title: newTitle,
        content: newContent,
        category: finalCategory,  
      });
  
      if (response.status === 200) {
        alert("Blog updated successfully");
      }
    } catch (error) {
      alert("Error updating blog");
    }
  };
  


  const handleDeleteBlog = (id)=>{
    setDeleteBlogConfirmation(!deleteBlogConfirmation)
    setBlogId(id)
  }
  const deleteBlog = async ()=>{
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}`)
    alert("Blog deleted successfully")
    setDeleteBlogConfirmation(!deleteBlogConfirmation)
    Navigate('/dashboard')
  }


  return (
      <div className='w-[90%] h-full relative '>
      {/* blogs content */}
      <div id='home-page-content' className=" absolute mt-1 ml-1 w-[100%] h-full flex justify-center">
          <div>
            { 
              blogsOnDashboard.length > 0 &&
              blogsOnDashboard.map((blog)=>(
                <div key={blog._id} className='w-[90vw] flex h-fit px-2 border-2 border-black mb-2 py-4 bg-white rounded-lg'>
                  <div className='w-[80vw]'>
                    <h1>Category:{blog.category}</h1>
                    <h1 className='font-bold'>{blog.title}</h1>
                    <p>{blog.content} </p>
                  </div>
                  <div className='w-[10vw] flex flex-col border-l-2 border-black justify-around'>
                    <button id={blog._id} onClick={()=>handleEdit(blog._id)} className='rounded-full w-full h-fit p-2 text-center m-1  bg-black text-green-400 '>Edit</button>
                    <button onClick={()=>handleDeleteBlog(blog._id)}
                    className='w-full h-fit p-2 text-center m-1  bg-slate-900 text-red-500 rounded-full'>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
          {
            blogsOnDashboard.length === 0 && (
              <div className='w-[90vw] flex h-fit px-2 justify-center items-center border-2 border-black mb-2 py-4 bg-white rounded-lg'>
                <h1 className='font-bold w-[70%]'>No blogs found...........................</h1>
                <Link to="/blogs/create" 
                className='hover:bg-opacity-100  w-fit h-fit p-4 bg-gradient-to-br from-green-600 to-blue-500 text-white   rounded-tl-full rounded-br-full rounded-tr-lg rounded-bl-lg'>Create blog your first blog on deeBlog</Link>
              </div>
            )
          }
          <div id='editPop' className={`fixed bg-white resize overflow-auto z-30 m-10 w-1/2 h-96 border-2 border-black ${isEditing ? 'visible' : 'hidden'}`}>
              <button className='absolute top-0 right-0 bg-red-400 p-1 rounded-3xl' onClick={() => setIsEditing(!isEditing)}>Close</button>
              <p className='absolute bottom-0 right-2 text-blue-600'>Resize the box according to your content →</p>
              <form onSubmit={updateBlog} className='flex flex-col p-2 gap-2  h-full'>
                
                {/* Category dropdown with "Other" option */}
                <select
                  required
                  value={newCategory}
                  onChange={(e) => {
                    const selectedCategory = e.target.value;
                    setNewCategory(selectedCategory);
                    if (selectedCategory === 'Other') {
                      setIsCustomCategory(true);
                    } else {
                      setIsCustomCategory(false);
                      setCustomCategory('');
                    }
                  }}
                  className='border-2 border-black mb-4 w-fit h-[10%] placeholder:text-green-600 placeholder:text-center text-center'
                >
                  <option value=''>-- Select a category --</option>
                  {categorySuggestions.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                  <option value='Other'>Other</option>
                </select>

                {/* Custom category input box when 'Other' is selected */}
                {isCustomCategory && (
                  <input
                    type='text'
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder='Enter custom category'
                    className='border-b-2 border-black mb-4 h-[10%] placeholder:text-green-600 placeholder:text-center text-center'
                  />
                )}

                <input
                  type='text'
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder='Enter blog title'
                  className='border-b-2 border-black mb-1 h-[10%] placeholder:text-blue-700 placeholder:text-center'
                />

                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder='Enter blog content'
                  className='border-2 rounded-lg border-black mb-1 min-h-[35%] p-1 resize-none overflow-y-scroll h-[50%] placeholder:text-amber-800 placeholder:text-center'
                  rows='10'
                />

                <button type='submit' className='relative left-[45%] bg-green-900 text-white h-[10%] p-2 rounded-md w-fit hover:bg-green-500 hover:text-black'>
                  Update
                </button>
              </form>
            </div>

          <div className='fixed w-screen h-fit flex justify-center'>
          <div id="deletepop" className={`flex flex-wrap justify-around absolute top-0 p-4 bg-white resize overflow-auto z-30 m-10 w-fit h-96 border-2 border-black ${deleteBlogConfirmation?'visible':'hidden'}`}>
            <h1 className='w-full text-center'>Are you sure you want to delete this blog?</h1>
            <button onClick={deleteBlog} className='bg-red-900 text-white h-[10%] p-2 rounded-md w-[40%] hover:bg-red-500 hover:text-black'>Yes</button>
            <button onClick={()=>setDeleteBlogConfirmation(!deleteBlogConfirmation)} className='h-[10%] p-2 rounded-md hover:bg-green-400 hover:text-black bg-green-900 w-[40%] text-white'>No</button>
          </div>
          </div>
      </div>
  </div>
);}
export default Dashboard;
