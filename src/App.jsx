
// import { stringify } from 'postcss'
import React, { useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)


  async function fetchApi(e){
    e.preventDefault()
    if(!email || !message || !name){
      return toast.error("fill")
    }
    setLoading(true)
    const baseurl = 'https://forms-io.onrender.com/submit-form/7b7d3778-a1a9-4098-a60f-8b19515efdc1'
 try {
    const responds = await fetch(baseurl, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({name,email,message})
    })
    .then((res)=> res.json())
    if(responds){
      toast.success("submitted")
      setLoading(false)
    }
 
    
  } catch (error) {
   toast.warn('check your network connection')
  }
}


  return (
    <div className=' flex flex-col justify-center items-center h-[100vh] text-black'>
      <form className='flex flex-col gap-4 items-center justify-center bg-slate-400 p-10 w-[30%] rounded-2xl max-md:w-fit'>
      <input className='h-[40px] outline-none px-4 w-[15vw] max-md:w-[70vw]' required type="text" name="fullName" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
      <input className='h-[40px] outline-none px-4 w-[15vw] max-md:w-[70vw]' required type="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />
      <textarea className='w-[15vw] h-[100px] p-2 outline-none max-md:w-[70vw]' name="message" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
      <button className='bg-red-800 text-white px-5 py-2 ml-[170px] ' onClick={fetchApi} type="submit" placeholder='compose your message'>{loading ? 'sending...' : 'send' }</button>
      <ToastContainer />
        </form>
    </div>
  )
}

export default App
