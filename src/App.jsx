/*eslint-disable*/
import React, {  useEffect} from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'

function App() {
  // to make sure user stay logged in if page is reloaded
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    } else {
      axios.post('/refresh-token').then((response) => {
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
      }).catch((error) => {
        console.log('Unable to refresh token', error);
      });
    }
    navigate('/')
  }, []); 

  return (
    <AuthProvider>
    <div
      id="screen-div"
      className="min-h-screen max-w-screen  flex flex-col overflow-hidden bg-[#074161]"
    >
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <div
        id="main-content-div"
        className="flex-grow overflow-y-auto overflow-x-hidden w-screen flex justify-center ml-2 relative mb-2"
      >
        <Outlet />
      </div>

      <footer className="h-[70px] w-full flex-shrink-0 text-center">
        <Footer />
      </footer>
    </div>
</AuthProvider>

  )
}
export default App 