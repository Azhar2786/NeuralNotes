import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Header = () => {

    const inputRef = useRef();
    const {setInput, input} = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInput(inputRef.current.value);
    }

    const onClear = () => {
        setInput('');
        inputRef.current.value = '';
    }

  return (
    <div className='mx-8 sm:mx-16 xl:sm-24 relative'>
        <div className='text-center mt-20 mb-8'>

            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New: AI feature inegrated</p>
                <img src={assets.star_icon} alt="" className='w-2.5'/>
            </div>

            <h1 className='text-4xl sm:text-6xl font-bold'>Your own <span className='text-blue-800'>blogging</span> <br/>platform</h1>
            
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story startsright here.
            </p>

            <form onSubmit={handleSubmit} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto'>
                <input ref={inputRef} type="text" placeholder='Search for blogs' className='w-full sm:w-96 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'/>
                <button type="submit" className='ml-2 bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition-colors'>Search</button>
            </form>
        </div>

        <div className='text-center'>
            {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>
                Clear Search
            </button>}
        </div>

        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-20'/>
    </div>
  )
}

export default Header