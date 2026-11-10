import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, useSearchParams,Link } from 'react-router-dom'
function SerchdataScreen() {

  const navigate = useNavigate()

  const [searchparams] = useSearchParams()
  const name = searchparams.get('name')

  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState('')
  const [data4, setData4] = useState('')
  const [change,setChange]=useState(false)
  useEffect(() => {

    const fetchdata = axios.get(`/api/users/searchdata?name=${name}`)
      .then(response => {
        setData(response.data.data1);
        setData2(response.data.data2);
        setData3(response.data.data3[0].次數);
        setData4(response.data.data3[0]);
      })

  }, [])


   return (
<>
{data4? 
    <div>
      <h2 style={{ backgroundColor: 'lightskyblue', padding: '1rem', width: '9rem' }}><Link style={{textDecoration:'none'}}to={`/dashboard/${name}`}>{name}   </Link>  </h2>
      <h3>運途毒素:{data3} </h3>
      <div className="row">
        <div className='col'><ol>{data.map((list) => {
          return (<li>--{list.date.substr(2, 8)}--{list.subject}</li>)
        })}</ol></div>
        <div className='col'>
          <ol>{data2.map((list) => {
            return (<li>--{list.date.substr(2, 8)}--{list.subject}<input type='checkbox' checked={list.check}></input></li>)
          })}</ol>
        </div>
      </div>
    </div>:'沒資料'}
    </>

  )
}

export default SerchdataScreen