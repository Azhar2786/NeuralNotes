import React from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlogs = () => {

  const {axios} = useAppContext();
  const [blogs, setBlogs] = React.useState([]);

  const fetchBlogs = async () => {
    try {

      const {data} = await axios.get('/api/admin/blogs');

      if(data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      
      <h1>All Blogs</h1>

      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
            <table className='w-full table-auto text-sm text-left'>
              <thead className='text-xs uppercase bg-gray-50 text-gray-400'>
                <tr>
                  <th scope='col' className='px-2 py-4'>Title</th>
                  <th scope='col' className='px-2 py-4'>Date</th>
                  <th scope='col' className='px-2 py-4'>Status</th>
                  <th scope='col' className='px-2 py-4'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {blogs.map((blog) => (
                  <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} />
                ))}
              </tbody>
            </table>

          </div>
    </div>
  )
}

export default ListBlogs
