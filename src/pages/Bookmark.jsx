import React,{useState} from 'react'
import CardBookmark from '../components/Card'
import Navbarlogin from '../components/NavbarLogin'
import { useQuery } from 'react-query'
import { API } from '../config/api'

import { Card, Row, Form, InputGroup, } from 'react-bootstrap'

import { Link, useParams, useNavigate } from "react-router-dom";

function Bookmark() {
  
  const [search, setSearch] = useState('');

  
  let { data } = useQuery('bookmarksCache', async () => {
    const response = await API.get('/bookmarks');
    console.log("ini response bookmark",response)
    return response.data.data;
});

console.log("ini bookmarks", data);
console.log("hallo");


let user = useQuery('usersCache', async () => {
  const response = await API.get('/check-auth');
  console.log("ini response user",response)
  return response.data.data;
});


  return (
    <>
      <Navbarlogin />
      <h1 className='my-3 mx-5'>Bookmark</h1>

      <Row xs={1} md={4} className="d-flex justify-content-center">
                        {data?.filter((item) => item.user_id === user?.data?.id).map((item, id) => {
                            return (
                                <Card style={{ width: '18rem' }} className="my-4 mx-3">
                                    <Link to="/bookmark">

                                        {/* <img src={book} alt="" className='position-absolute top-0 end-0 m-3' /> */}

                                    </Link>
                                    <Link to={`/detail/${item?.artikel.id}`} className='text-decoration-none text-dark'>
                                        <Card.Img variant="top" src={item?.artikel.image} className="pt-2" />
                                        <Card.Body>
                                            <div className='d-flex'>
                                                <Card.Title className='me-auto'>{item?.artikel.title}</Card.Title>
                                                <p className='p-2'>{item?.user.name}</p>
                                            </div>
                                            <Card.Text>
                                                {item?.artikel.desc}
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

export default Bookmark