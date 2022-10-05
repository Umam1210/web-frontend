import React from 'react'
import { Card, Row } from 'react-bootstrap'
import book from '../image/Bookmark2.png'

import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useQuery } from 'react-query'
import { API } from '../config/api'

function CardLogin() {

  const state = useContext(UserContext)
  console.log("state", state)
  let { data } = useQuery('artikelsCache', async () => {
    const response = await API.get('/artikels');
    // console.log("ini response",response)
    return response.data.data;
  });
  console.log("ini", data);

  return (
    <>
      <Row xs={1} md={4} className="mx-5 px-0">
        {data?.map((item, id) => {
          return (
            <Card style={{ width: '18rem' }} className="my-4 mx-5">
              <img src={book} alt="" className='position-absolute top-0 end-0 m-3' />
              <Link to={`/detail-after-login/${item?.id}`} className='text-decoration-none text-dark'>
                <Card.Img variant="top" src={item?.image} className="pt-2" />
                <Card.Body>
                  <Card.Title>{item?.title}</Card.Title>
                  <Card.Text>
                    {item?.desc}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>

          )
        })}
      </Row>
    </>
  )
}

export default CardLogin