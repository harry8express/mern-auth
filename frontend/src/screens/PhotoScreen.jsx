
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Image, Button, } from 'react-bootstrap'
import moment from 'moment'

const PhotoScreen = () => {
  const navigate = useNavigate()
 
  const [data, setData] = useState([])
  let { id } = useParams()
  useEffect(() => {

    const fetchdata = axios.get(`/api/users/auth/${id}`)
      .then(response => setData(response.data))
   

  }, [])

  return (
    <div>

      <Container>
        {data.map(ata => {
          return <Row><Col xs={10} md={5} lg={3}><Image src={`http://storage.googleapis.com/mamaenergy_bucket-1/貴賓照片/${ata.姓名}.jpg`} thumbnail />
            {ata.姓名} {ata.生日} {ata.住址}<Button variant='outline-primary' className='mx-3' onClick={() => navigate(`/information/${id}`)} >修改</Button>
            <Button variant='outline-success' className='mx-3' onClick={() => navigate(`/searchdata?name=${ata.姓名}`)} >資料</Button></Col></Row>
        })
        }        
        
       
      </Container>

    </div>
  )
}

export default PhotoScreen;