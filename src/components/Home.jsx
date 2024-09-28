/*eslint-disable*/
import React, { useContext,useState,useEffect } from 'react';
import axios from 'axios'
import dayjs from 'dayjs'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data: blogs } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/`);
        setBlogs(blogs.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  const uploadDate = (blog) => {
    return dayjs(blog.createdAt).format('DD/MM/YYYY');
  };
  const updatedON = (blog) => {
    return dayjs(blog.updatedAt).format('DD/MM/YYYY');
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          if (blogs.length === 0 ){
            alert("try to break the refresh button if still the server is not loaded!!!");
          }
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
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
                <p className='w-full text-left'>Category:{blog.category}</p>
                <h1 className='w-full text-left m-1 text-2xl font-bold '>{blog.title}</h1>
                <p className='w-full text-lg text-justify'>{blog.content}</p>
                <p className='text-left sm:text-center sm:w-full   mt-2 bg-gray-400 md:w-fit text-sm rounded-md px-4 font-mono'>Written on {uploadDate(blog)}
                  <br/>Updated on {updatedON(blog)}</p>
              </fieldset>
            ))
          }
          {
            blogs.length === 0 && <div className='w-full flex flex-col justify-center items-center gap-10'>
              <p className='text-center font-bold'>The server is down, can take time upto 50s to 2m to load the contents from the server..</p>
              <button onClick={() => window.location.reload()}
              className='w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Refresh</button>

              <div className='text-3xl border-red-500 border-2 rounded-lg px-6 py-2 animate-pulse'>{formatTime(seconds)}</div>
            </div>
          }
        </div>
      </div>
  );
};

export default Home;
