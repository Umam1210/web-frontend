import React from 'react'
import '../css/home.css'
import Navbar from '../components/Navbar'
import text from '../image/text1.png'
import text2 from '../image/text2.png'
import Journey from '../components/Journey'
import book from '../image/Bookmark2.png'

import { Card, Row, Form, InputGroup, } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { useState } from 'react'
import ModalLogin from '../components/ModalLogin'

function Home() {

    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let { data } = useQuery('artikelsCache', async () => {
        const response = await API.get('/artikels');
        // console.log("ini response",response)
        return response.data.data;
    });
    // console.log("ini", data);


    function login() {
        handleShow(<ModalLogin />)
        alert("Harus Login terlebih dahulu")
    }

    return (
        <>
            <div className='Home'>
                <Navbar />
                <div>
                    <img src={text} alt="" width={"40%"} style={{ marginLeft: "96px", marginTop: "90px" }} />
                </div>
                <div>
                    <img src={text2} alt="" width={"40%"} style={{ marginLeft: "96px", marginTop: "30px" }} />
                </div>
            </div>

            <div>
                <Journey />
                <div className="input-group px-5 ">
                    <Form className='w-100'>
                        <InputGroup className='my-3 w-100'>
                            <Form.Control
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search here...'
                                className='w-100'
                            />
                        </InputGroup>
                    </Form>
                </div>
                <Row xs={1} md={4} className="d-flex justify-content-center">
                    {data?.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.title.toLowerCase().includes(search);
                    }).map((item, id) => {
                        return (
                            <Card style={{ width: '18rem' }} className="my-4 mx-3">
                                {/* <p className='position-absolute top-0 end-0 m-3'>
                                        <ModalLogin />
                                    </p> */}
                                <img src={book} alt="" className='position-absolute top-0 end-0 m-3' onClick={login} />
                                <Link to={`/detail-after-login/${item.id}`} className='text-decoration-none text-dark'>
                                    <Card.Img variant="top" src={item?.image} className="pt-2" />
                                    <Card.Body>
                                    <div className='d-flex'>
                                                <Card.Title className='me-auto'>{item?.title}</Card.Title>
                                                <p className='p-2'>{item?.user.name}</p>
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
            </div>
        </>
    )
}

export default Home