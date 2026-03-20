import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const[city,setCity]=useState('')
  const [Wdetails,setWdetails]=useState()
  const [isloading,setIsLoading]=useState(false)

  useEffect (()=>{
   console.log("hello shri");
   
  },[])

  let getData=(event)=>{
    event.preventDefault()
   
  setIsLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=611fe571145e904d063d2da3cfdeb794&units=metric`)
    .then((res)=>res.json())
     
    .then((finalRes)=>{
      if(finalRes.cod == "404"){
        setWdetails(undefined);
        
      }
       else{
          setWdetails(finalRes);
         }
      
      
      setIsLoading(false);
    })
    
    setCity('');
  }
   


  return (
    
    <div className='w-full h-screen bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto '>
       <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App </h1>
       
       <form onSubmit={getData}>
        <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}className='w-[300px] h-[40px] pl-3 border ' placeholder='City Name' />
        <button>Submit</button>
       </form>

       <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
       <img src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?_=20170503175831' width={100} className={`absolute left-[40%] ${isloading ? '' : 'hidden'} `}/>

        {Wdetails !== undefined
          ?
         <>
         <h3 className='font-bold text-[30px] '>{Wdetails.name}  <span className='bg-[yellow] '>{Wdetails.sys.country}</span></h3>

        <h2 className='font-bold text-[40px]'>{Wdetails.main.temp}</h2>
        <img  className="block mx-auto" src={`http://openweathermap.org/img/w/${Wdetails.weather[0].icon}.png`}/>
        <p>{Wdetails.weather[0].description}</p>
         </>


          :
          "No city found"

             }

        

       </div>
      </div>

    </div>
    
  )
}

export default App
