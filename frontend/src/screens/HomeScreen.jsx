import Hero from '../components/Hero';
import axios from 'axios'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button, Container, Stack } from 'react-bootstrap';
import moment from 'moment';
import { useState, useEffect, useCallback,useMemo } from 'react';

import { useNavigate, Link } from 'react-router-dom'


const HomeScreen = () => {
  const navigate = useNavigate();

  //const [subject, setSubject] = useState('')

  const [data, setData] = useState([])
  const [change, setChange] = useState(false)
  const [formdata, setFormdata] = useState({ name: '', date: moment().format('YYYY-MM-DD'), time: '12:30', subject: '', check: false })
  const { name, date, time, subject } = formdata
  const style = { border: '1px solid black', borderRadius: '0.5rem' }
  const [t2230,setT2230] = useState([])
  var T1230=[]
  var T1330 = []
  var T1430 = []
  var T1530 = []
  var T1630 = []
  var T1730 = []
  var T1830 = []
  var T1930 = []
  var Tadd = []

 useEffect(() => {

  const fetchdata = axios.get(`/api/users/profile?date=${date}`).
  then(response => {
  setData(response.data)
  console.log(response.data)
  })

  },[change])



  function deleteUser(id) {
    if (window.confirm('確定刪除嗎?')) {
      const deleteuser = axios.delete('/api/users/profile/' + id)
        .then(
          setChange(true)
        ).catch(
          error => console.error(error)
        )
      setChange(!change)
    }
  }
  const onChange = (e) => {
    if (e.target.name == 'date') {
      setChange(!change)
    }
    setFormdata(pre => ({
      ...pre, [e.target.name]: e.target.value
    }))
  }

  const updateCheckbox = (id, check,次數) => {
    const updateCheckbox = axios.put('/api/users/profile/' + id, { check: check,次數:次數})
      .then(     
       
      )   
    
      .catch(
        error => console.error(error)
      )
    setChange(!change)
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    //const data = { 'name': nameRef.current.value, 'date': dateRef.current.value, 'subject': subjectRef.current.value }
    const result = await axios.post('/api/users', formdata)
      .then(

    ).catch(error => alert(error))
    setChange(!change)
    if (subject == "欠123切券" || subject == "欠運途券" || subject == "欠魂魄券") { navigate('/coupon') }
    setFormdata({ name: '', date: formdata.date, time: formdata.time, subject: '' })

  };


  const searchItem = () => {
    if (formdata.name == '' | formdata.name == undefined) {
      return
    }

    navigate(`/searchdata?name=${formdata.name}`)
  }

  
  {
    data ? 
  
    data.map(dat => {
      if (moment(dat.subject[0].date).isSame(moment(date), 'day')){
    dat.subject.map(datsubject => {
   
        if (datsubject.time == '12:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1230.push(datsubject)
          
                 
        } else if (datsubject.time == '13:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1330.push(datsubject)
      
        } else if (datsubject.time == '14:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1430.push(datsubject)
         
        } else if (datsubject.time == '15:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1530.push(datsubject)
        
        } else if (datsubject.time == '16:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1630.push(datsubject)
         
        } else if (datsubject.time == '17:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1730.push(datsubject)
         
        } else if (datsubject.time == '18:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1830.push(datsubject)
          //T1830.sort()
        } else if (datsubject.time == '19:30') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          T1930.push(datsubject)
          //T1930.sort()
        } else if (datsubject.time == '額外加場') {
          datsubject.次數 = dat.populatelist[0].次數
          datsubject.count = dat.count
          Tadd.push(datsubject)
          //Tadd.sort()
        }
      })
    }})
    
     : ''
    console.log(T1230)
  }
 
  return (
    <>
      <Form onSubmit={submitHandler} id='' className='mb-3 lg-w-1/3'  >
        <Form.Group as={Row} className="mb-1" controlId='formdate' >

          <Form.Label column lg='1'>
            name
          </Form.Label>
          <Col lg="4">

            <Form.Control type="text" size="sm" name='name' onChange={onChange} value={name} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-1" controlId="formdate">
          <Col lg='1'>
            <Form.Label column  >
              Date
            </Form.Label>
          </Col>
          <Col lg="4">


            <Form.Control type="date" name='date' size="sm" onChange={onChange} value={date} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" controlId="formtime">

          <Form.Label column lg="1">
            Time
          </Form.Label>
          <Col lg="4">
            <Form.Select size='sm' name='time' onChange={onChange} value={time}  >
              <option value="12:30">12:30</option>
              <option value="13:30">13:30</option>
              <option value="14:30">14:30</option>
              <option value="15:30">15:30</option>
              <option value="16:30">16:30</option>
              <option value="17:30">17:30</option>
              <option value="18:30">18:30</option>
              <option value="19:30">19:30</option>
              <option value="額外加場">額外加場</option>

            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" controlId="formtime">
          <Form.Label column lg="1">
            Subject
          </Form.Label>
          <Col lg='4'>
            <Form.Select aria-label="Default select example" size='sm' name='subject' onChange={onChange} value={subject} required>
              <option value=''></option>
              <option value="第1項">第1項</option>
              <option value="第2項">第2項</option>
              <option value="第3項">第3項</option>
              <option value="智慧切">智慧切</option>
              <option value="魂-1">魂-1</option>
              <option value="魂-2">魂-2</option>
              <option value="魂-3">魂-3</option>
              <option value="運-1">運-1</option>
              <option value="運-2">運-2</option>
              <option value="運-3">運-3</option>
              <option value="運毒">運毒</option>
              <option value="NEW撞">NEW撞</option>
              <option value="光芒">光芒</option>
              <option value="種子">種子</option>
              <option value="生命線">生命線</option>
              <option value="第4項">第4項</option>
              <option value="第5項">第5項</option>
              <option value="第6項">第6項</option>
              <option value="核爆高壓氧">核爆高壓氧</option>
              <option value="標撞切">標撞切</option>
              <option value="欠運途券">欠運途券</option>
              <option value="欠魂魄券">欠魂魄券</option>
              <option value="欠123切券">欠123切券</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit" className='mx-1'>
          Submit
        </Button>
        <Button variant="info" type="button" className='mx-5' onClick={searchItem}>
          搜尋
        </Button>
      </Form>




      <h4 style={{ color: 'limegreen', backgroundColor: 'moccasin', padding: '0.5rem', width: '10rem' }}>{moment(date).format('YYYY-MM-DD')}</h4>
      <Stack className='col-md-6' >

        {T1230.length != 0 ? <ul style={style}>12:30
          {T1230.map(dat => {

            //if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className=' mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox'  checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }
        {T1330.length != 0 ? <ul style={style}>13:30
          {T1330.map(dat => {
           // if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className=' mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox' checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }
        {T1430.length != 0 ? <ul style={style}>14:30
          {T1430.map(dat => {
           // if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className=' mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox' checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }
        {T1530.length != 0 ? <ul style={style}>15:30
          {T1530.map(dat => {
           // if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className=' mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox'   checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }
        {T1630.length != 0 ? <ul style={style}>16:30
          {T1630.map(dat => {
           // if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className='mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox' checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }
        {T1730.length != 0 ? <ul style={style}>17:30
          {T1730.map(dat => {
          //  if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className='mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox'  checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }
        {T1830.length != 0 ? <ul style={style}>18:30
          {T1830.map(dat => {
          //  if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className='mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox' checked={dat.check}onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
          //  }
          })}</ul> : ''
        }
        {T1930.length != 0 ? <ul style={style}>19:30
          {T1930.map(dat => {
           // if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className='mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox' checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }
        {Tadd.length != 0 ? <ul style={style}>額外加場
          {Tadd.map(dat => {
           // if (moment(dat.date).isSame(moment(date), 'day')) {
              return (<li id={dat._id} style={{ margin: '0.2rem' }} >({dat.count})<Link to={`/dashboard/${dat.name}`} >{dat.name}</Link>----{dat.subject}---<Link to={`/searchdata?name=${dat.name}`}>Lookup</Link>---
                ({dat.次數}) <Button variant='outline-danger' className='mx-1' onClick={() => deleteUser(dat._id)}>Del</Button><input type='checkbox' checked={dat.check} onChange={() => updateCheckbox(dat._id, !dat.check)} /></li>)
           // }
          })}</ul> : ''
        }


       

      </Stack>


    </>
  )
};
export default HomeScreen;