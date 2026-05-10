import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog, fetchBlogs}) => {

    const {title, createdAt} = blog;
    const BlogData = new Date(createdAt);

    const {axios} = useAppContext();

    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to DELETE this blog?');

        if(!confirm) return;

        try {

            const {data} = await axios.post('/api/blog/delete', {id: blog._id})
            if(data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const togglePublish = async () => {
        try {
            const {data} = await axios.post('/api/blog/toggle-publish', {id: blog._id})
            if(data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <tr>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{BlogData.toDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={blog.isPublished ? 'text-green-500' : 'text-red-500'}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglePublish} className='text-sm px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer'>
                {blog.isPublished ? 'Unpublish' : 'Publish'}
            </button>

            <img onClick={deleteBlog} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer'/>
        </td>
    </tr>
  )
}

export default BlogTableItem