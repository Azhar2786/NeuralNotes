import { useNavigate } from 'react-router-dom';
import React from 'react'

const BlogCard = ({Blog}) => {

    const {title, description, category, image, _id} = Blog;

    const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='cursor-pointer w-full rounded-lg overflow-hidden shadow hover:scale-102'>
      <img src={image} alt="" className='aspect-video'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block rounded-full text-primary text-xs'>{category}</span>

      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{__html: description.slice(0, 80)}}></p>
      </div>
    </div>
  )
}

export default BlogCard
