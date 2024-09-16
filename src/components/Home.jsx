/*eslint-disable*/
import React, { useContext,useState,useEffect } from 'react';
import axios from 'axios'

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data: blogs } = await axios.get('/api/blogs/');
        setBlogs(blogs.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
      <div className='w-[90%] h-full relative'>
        <div id='home-page-content' className="flex flex-col bg-white p-4  w-full rounded-lg gap-2 absolute">
          {blogs &&
            blogs.map((blog) => (
              <fieldset key={blog._id} className='w-[100%] border-2 border-black rounded-lg text-center p-2'>
                <legend className='flex'>
                <div className='flex justify-left'>
                  <img src={`${blog.writer.profilePicture}`} className='rounded-full w-10 h-10' />
                  <h1 className='p-2 font-bold'>{blog.writer.username}</h1>
                </div>
                </legend>
                <h1 className='w-full text-left m-1 text-2xl font-bold '>{blog.title}</h1>
                <p className='w-full text-lg text-justify'>{blog.content}</p>
              </fieldset>
            ))
          }
        </div>
      </div>
  );
};

export default Home;
