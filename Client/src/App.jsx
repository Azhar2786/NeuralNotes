import React from 'react';
import Home from './pages/Home';
import Blog from './pages/Blog';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import Comments from './pages/admin/Comments';
import ListBlogs from './pages/admin/ListBlogs';
import Login from './components/admin/Login';
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext.jsx';

console.log("Hello World")

const App = () => {
  
  const {token} = useAppContext();
  console.log(token);

  return (

    <div>
        <Toaster />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/admin' element={token ? <Layout /> : <Login />}>
              <Route index element={<Dashboard />} />
              <Route path='addBlogs' element={<AddBlog />} />
              <Route path='listBlogs' element={<ListBlogs />} />
              <Route path='comments' element={<Comments />} />
            </Route>
        </Routes>

    </div>
  )
}

export default App;