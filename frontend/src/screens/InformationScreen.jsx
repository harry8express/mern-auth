import React, { useState, useEffect, useRef } from 'react'
import { Stack, Form, Button, Container,Row,Col } from 'react-bootstrap'

import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
function InformationScreen() {
      const [data, setData] = useState([])

      const navigate = useNavigate()

      let { id } = useParams()
      useEffect(() => {

            const fetchdata = axios.get(`/api/users/auth/${id}`)
                  .then(response => setData(response.data))


      }, [])
      const handleSubmit = async (e) => {
            e.preventDefault()
            const updatedata = axios.put(`/api/users/profile`, data[0])
                  .then(navigate(`/dashboard/${id}`))

      }

      return (

            <Container>
                  {data.map(ata => {

                        return (<>
                              <Form onSubmit={handleSubmit} id='' className='  w-lg-50 w-md-60 w-xs-90' >
                                   <Form.Control size="lg" className='mb-3  ' type="text" defaultValue={ata.姓名} readOnly />
                                   <Form.Control size="lg" className='mb-3 ' type="text" defaultValue={ata.生日} onChange={(e) => setData([{ ...ata, 生日: e.target.value }])} />
                                    <Form.Control size="lg" className='mb-3 ' type="text" defaultValue={ata.住址} onChange={(e) => setData([{ ...ata, 住址: e.target.value }])} />
                                   <Form.Group as={Row}><Form.Label column sm='1'>運毒次數</Form.Label><Col ><Form.Control size="lg" className='mb-3 ' type="text" defaultValue={ata.次數} onChange={(e) => setData([{ ...ata,次數 : e.target.value }])} /></Col></Form.Group> 
                                    <Form.Group as={Row}><Form.Label column sm='1'>推薦名單</Form.Label><Col ><Form.Control size="lg" className='mb-3 ' type="text" defaultValue={ata.推薦人} onChange={(e) => setData([{ ...ata, 推薦人: e.target.value }])} /></Col></Form.Group>
                                    <Button variant="outline-primary" type='submit'>Submit</Button>
                                   
                              </Form>
                             
                              <div className='mt-5'>{new Date(ata.updatedAt).toLocaleDateString('zh-TW', {  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</div>
                        </>)
                  })}
            </Container>


      )
}

export default InformationScreen