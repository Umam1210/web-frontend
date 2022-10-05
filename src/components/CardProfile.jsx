import React from 'react'
import { Card, Row } from 'react-bootstrap'
import book from '../image/Bookmark2.png'

import { Link } from "react-router-dom";
import { useQuery } from 'react-query'
import { API } from '../config/api'

function CardProfile() {

  //   const state = useContext (UserContext)
  // console.log("state", state)
  let { data } = useQuery('artikelsCache', async () => {
    const response = await API.get('/artikels');
    // console.log("ini response",response)
    return response.data.data;
  });
  // console.log("ini data2", data);


  let user = useQuery('usersCache', async () => {
    const response = await API.get('/check-auth');
    console.log("ini response user",response)
    return response.data.data;
  });

  // console.log(" ini user", user);


  return (
    <>
      <Row xs={1} md={4} className="d-flex justify-content-center">
        {data?.filter((item) => item.user_id === user?.data?.id).map((item, id) => {
          return (
            <Card style={{ width: '18rem' }} className="my-4 mx-3">
              <Link to="/bookmark">
              <img src={book} alt="" className='position-absolute top-0 end-0 m-3' />
              </Link>
              <Link to={`/detail/${item?.id}`} className='text-decoration-none text-dark'>
                <Card.Img variant="top" src={item?.image} className="pt-2" />
                <Card.Body>
                  <div className='d-flex'>
                  <Card.Title className='me-auto'>{item?.title}</Card.Title>
                  <p className='p-2' style={{ color: "#3B97D3" }} >{item?.user.name}</p>
                  </div>
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

export default CardProfile