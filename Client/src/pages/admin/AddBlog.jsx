import React, { use } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddBlog = () => {

  const {axios} = useAppContext();
  const [isAdding, setIsAdding] = React.useState(false);

  const editorRef = React.useRef(null);
  const quillRef = React.useRef(null);

  const [title, setTitle] = React.useState('');
  const [subTitle, setSubTitle] = React.useState('');
  const [image, setImage] = React.useState(false);
  const [category, setCategory] = React.useState('Startup');
  const [isPublished, setIsPublished] = React.useState(false);

  const generateContent = async () => {

  }

  const onSubmitHandler = async (e) => {

    try {
      e.preventDefault();

      setIsAdding(true);

      const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML, category, isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const {data} = await axios.post('/api/blog/add', formData);

      if(data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle('');
        setSubTitle(''); 
        setIsPublished(false);
        quillRef.current.root.innerHTML = ''
        setCategory('Startup');
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  }

  React.useEffect(() => {

    if(editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 h-full overflow-scroll text-gray-600'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow-rounded'>

        <p>Upload Thumbnail</p>
        <label htmlFor='image'>
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer'/>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setTitle(e.target.value)} value={title} />
        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />
        
        <p className='mt-4'>Blog description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>

          <div ref={editorRef}/>

          <button type='button' className='absolute bottom-1 right-2 ml-2 text-xs bg-black/70 text-white px-4 py-1.5 rounded hover:underline cursor-pointer transition-all' onClick={generateContent}>
            Generate with AI
          </button>
        </div>

        <p className='mt-4'>Blog category</p>
        <select onChange={e => setCategory(e.target.value)} name="Category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className='scale-125 cursor-pointer'/>
        </div>
        
        <button disabled={isAdding}  type="submit" className='mt-8 w-40 h-10 bg-blue-600 text-white rounded cursor-pointer text-sm'>
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>
    </form>
  )
}

export default AddBlog
