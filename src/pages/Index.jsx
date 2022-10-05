import React from 'react'
import '../css/home.css'
import Journey from '../components/Journey'
import book from '../image/Bookmark2.png'

import Navbarlogin from '../components/NavbarLogin'
import { Card, Row, Form, InputGroup, } from 'react-bootstrap'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { useState } from 'react'


function Index() {

    const [search, setSearch] = useState('');

    let { data } = useQuery('artikelsCache', async () => {
        const response = await API.get('/artikels');
        // console.log("ini response",response)
        return response.data.data;
    });

    let { id } = useParams();

    let { data: artikel } = useQuery("artikelCache", async () => {
        const response = await API.get("/artikel/" + id);
        return response.data.data;
    });
    console.log("ini", artikel);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const body = JSON.stringify({
                literatur_id: parseInt(id),
            });
            await API.post("/bookmark", body, config);
            navigate("/bookmark");
        } catch (error) {
            console.log(error);
        }
    };







    return (
        <>
            <div className='Index'>
                <Navbarlogin />
            </div>

            <div >
                <Journey />
                <div className="input-group px-5">
                    <Form className='w-100'>
                        <InputGroup className='my-3 w-100'>

                            {/* onChange for search */}
                            <Form.Control
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search here...'
                                className='w-100'
                            />
                        </InputGroup>
                    </Form>
                </div>
                <div>
                    <Row xs={1} md={4} className="d-flex justify-content-center">
                        {data?.filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : item.title.toLowerCase().includes(search);
                        }).map((item, id) => {
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
            </div>
        </>
    )
}

export default Index