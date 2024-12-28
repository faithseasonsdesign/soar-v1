
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import React, { useState } from 'react';

import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage' ;
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import UserLoginPage from './pages/LoginPage/UsersLoginPage/UsersLoginPage';
import ScrollToTop from './ScrollToTop';
import RegisterPage from './pages/RegisterPage/RegisterPage';

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div id='menuWrapper' className={`navigation_parent_wrapper py-3 ${menuVisible ? 'menu-open' : ''}`}>
        <div className="container navigation_child_wrapper py-2 d-flex align-items-center justify-content-between">
          <div className="logo_wrapper px-3 px-sm-3 px-md-0">
            <li className="nav_link_item py-2 px-3 home_link rounded-1">
              <Link className='text-white home_link' to='/' onClick={closeMenu}>
                <span>
                    SOAR
                </span>
              </Link>
            </li>
          </div>
          <div className={`nav-list-items-wrapper p-5 p-sm-5 p-md-0 container text-center text-sm-center text-md-start d-md-flex align-items-center justify-content-end ${menuVisible ? 'show' : 'hide'}`}>
            <li className="nav_link_item">
              <Link className='text-dark active' to='/' onClick={closeMenu}><span>Home</span></Link>
            </li>
            <li className="nav_link_item mt-3 mt-sm-3 mt-md-0">
              <Link className='text-dark' to='/opportunities' onClick={closeMenu}><span>Opportunities</span></Link>
            </li>
            <li className="nav_link_item mt-3 mt-sm-3 mt-md-0">
              <Link className='text-dark' to='/blogs' onClick={closeMenu}><span>Blogs</span></Link>
            </li>
            <li className="nav_link_item mt-3 mt-sm-3 mt-md-0">
              <Link className='text-dark' to='/resources' onClick={closeMenu}><span>Resources</span></Link>
            </li>
            <li className="nav_link_item contact_link py-2 mt-3 mt-sm-3 mt-md-0">
              <Link className='text-white' to='/login' onClick={closeMenu}><span>Login</span></Link>
            </li>
          </div>
          <div id='menuBtn' onClick={toggleMenu} className="small_device_menu_wrapper container d-flex d-sm-flex d-md-none justify-content-end px-3">
            <li className="nav_link_item">
              <i className="fa fa-2x fa-bars text-white"></i>
            </li>
          </div>
        </div>
      </div>

      <Routes>
        
        <Route path='/' element={<HomePage/>} />
        <Route path='about-us' element={<AboutPage/>}/>
        <Route path='resources' element={<ResourcesPage/>}/>
        <Route path='contact-us' element={<ContactPage/>}/>
        <Route path='opportunities'/>
        <Route path='blogs' />
        {/* <Route path='/login' element={<UserLoginPage/>}/> */}
        <Route path='login' element={<RegisterPage/>} />

      </Routes>
    </BrowserRouter>
  );
}






