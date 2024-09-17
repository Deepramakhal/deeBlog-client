/*eslint-disable*/
import React,{useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const categorySuggestions = [
    "Technology", "Entertainment", "Sports", "Business", "Science", "Health", "General"]



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/postblog`, {
        title, content, category
      })

      if(response.status === 200) {
        alert("Blog created successfully")
        navigate('/')
      }
      console.log(response)
    } catch (error) {
      alert("You need to login first to create blog")
      navigate('/login')
    }
  } 

  return (
    <div className='w-[90%] h-full relative'>
      <div id='create-blog-content' className="w-1/1  border-2 border-black">
        <form onSubmit={handleSubmit}>
          <select name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
            {categorySuggestions.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>

          <input type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder='Enter blog title'
          />
          <input type='text'
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          className='resize  min-h-0 p-2 flex flex-wrap max-w-xl border-2 border-black'
          />
          <button type='submit'>Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog