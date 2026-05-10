import React from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const {axios, setToken} = useAppContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const {data} = await axios.post('/api/admin/login', {email, password});

      console.log(data);

      if(data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
        window.location.href = '/admin';
      }

      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-blue-500 shadow-xl shadow-blue-100 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'><span className='text-blue-700'>Admin</span></h1>
                <p className='font-light'>Enter your credentials to access the admin pannel</p>
            </div>

            <form onSubmit={handleSubmit} className=' mt-6 w-full sm:max-w-md text-gray-600 flex flex-col gap-4'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} required type="text" placeholder='Username' className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'/>
                <input onChange={(e) => setPassword(e.target.value)} value={password} required type="password" placeholder='Password' className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'/>
                <button type="submit" className='w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors'>Login</button>
            </form>

        </div>
      </div>
    </div>
  )
}

export default Login;
