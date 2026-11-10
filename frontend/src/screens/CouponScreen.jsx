import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'

const CouponScreen = () => {

      const[data,setData]=useState([])
      const[change,setChange]=useState('')
      useEffect(() => {      
           
            const fetchdata =axios.get(`/api/users/coupon`)         
            .then(response=>setData(response.data))
             setChange('')
          
          }, [change])

          function deleteUser(id) {
            const deleteuser = axios.delete('/api/users/profile/' + id)
              .then(
                
              ).catch(
                error => console.error(error)
              )
            setChange('change')
        
          }


  return (<>
      {data ? data.map(dat => {
            return <li id={dat._id} style={{margin:'1rem'}} >{dat.name} <span style={{color:'blue'}}>{dat.subject}</span> {dat.date.substring(0, 10)}
              <Button variant='warning' className='mx-2' onClick={() => deleteUser(dat._id)}>Delete</Button></li>
          }) : ('')
}
</>
)
 
}

export default CouponScreen