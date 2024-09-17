/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);

 
  const categorySuggestions = ['Technology', 'Health', 'Finance', 'Travel', 'Other'];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === 'Other') {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
      setCustomCategory(''); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory = isCustomCategory ? customCategory : category;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/postblog`, {
        title,
        content,
        category: finalCategory,
      });

      if (response.status === 200) {
        alert('Blog created successfully');
        navigate('/');
      }
      console.log(response);
    } catch (error) {
      alert('You need to login first to create a blog');
      navigate('/login');
    }
  };

  return (
    <div className='w-[90%] h-full relative'>
      <div id='create-blog-content' className='w-[100%] border-2 bg-white border-black p-4 rounded-lg'>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Select Category:</label>
          <select
            name='category'
            value={category}
            onChange={handleCategoryChange}
            className='border-2 border-gray-300 rounded-md p-2 mb-4'
          >
            <option value=''>-- Select a category --</option>
            {categorySuggestions.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Show custom category input if 'Other' is selected */}
          {isCustomCategory && (
            <div className='mb-4'>
              <input
                type='text'
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder='Enter custom category'
                className='border-2 border-gray-300 rounded-md p-2 mt-2'
              />
            </div>
          )}

          <label className="block mb-2">Blog Title:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter blog title'
            className='border-2 border-gray-300 rounded-md p-2 mb-4 w-full'
          />

          <label className="block mb-2">Blog Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Write your blog content here...'
            className='border-2 border-gray-300 rounded-md p-2 w-full h-40 resize-y mb-4 '
          />

          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
