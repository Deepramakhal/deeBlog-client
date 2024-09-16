// /*eslint-disable*/
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Aboutus from './components/Aboutus.jsx'
import store from './app/store.js'
import {Provider} from "react-redux"
import SearchResult from './components/SearchResult.jsx'
import CreateBlog from './components/CreateBlog.jsx'
import Profile from './components/Profile.jsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>} />
      <Route path='search' element={<SearchResult/>} />
      <Route path='signup' element={<Signup />} />
      <Route path='/users/me' element={<Profile/>} />
      <Route path='login' element={<Login/>} />
      <Route path='/blogs/create' element={<CreateBlog />} />
      <Route path='dashboard' element={<Dashboard/>} />
      <Route path='about-us' element={<Aboutus />} />
    </Route>
  )
)



createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={route}/>
  </Provider>,
)
