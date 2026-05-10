import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/admin/SideBar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

    const {axios, setToken, navigate} = useAppContext();

    const logout = () => {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null);
        navigate('/');
    }

  return (
    <>
        <div className='w-full h-16 text-white flex items-center justify-between px-4 border-b border-gray-200'>
            <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/')}/>
            <button onClick={logout} className='text-sm px-8 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer'>Logout</button>
        </div>

        <div className='flex h-[calc(100vh-70px)]'>
            <div className='w-60 bg-white h-full border-r border-gray-200'>
                <SideBar />
            </div>
            <Outlet />
        </div>
    </>
  )
}

export default Layout
