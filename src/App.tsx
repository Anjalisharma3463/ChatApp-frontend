  
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [Messages , setmessages] = useState([]);
  //@ts-ignore
 const wsRef = useRef();
  useEffect(  () => {

    const ws = new WebSocket('ws://localhost:8080');
        ws.onmessage = ( event) => {
          //@ts-ignore
           setmessages(m => [...m , event])
        }
        wsRef.current = ws;


        ws.onopen = () =>{
          ws.send( JSON.stringify({
            type: 'join',
            payload:{

              roomId: "red"
            }
          }))
        }

        return () => {
          ws.close(); 
        }
      }, []);


  return (
    <>
      <div className='h-screen bg-black  '>
        <br />  <br />
                <div className='h-[95vh]'>
                   
                  {Messages.map((message , index) => (
                   <div className='m-8'>
                   <span key={index} className='bg-white rounded-md p-4 m-4'>
                      {message}
                    </span>
                     </div>
                  ))}
                </div>
                <div className='w-full bg-white flex'>
                   <input id='message' className='flex-1 p-4' type="text" />
                   <button onClick={
                    ()=>{
//@ts-ignore
const message = document.getElementById("message")?.value; 
//@ts-ignore
                      wsRef.current.Send( JSON.stringify({
                        type: 'chat',
                        payload: {

                          message :message
                        }
                      }))
                    }
                   } className='bg-purple-600 text-white p-4'>Send Message</button>
                </div>
      </div>
    </>
  )
}

export default App
