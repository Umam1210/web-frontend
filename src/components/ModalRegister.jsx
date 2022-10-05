import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import maps from '../image/maps.png'
import leaf from '../image/leaf.png'

import { useMutation } from 'react-query'
import { useState } from 'react'
import { API } from '../config/api'


function ModalRegister() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  document.title = "Journey"


  const [message, setMessage] = useState("halo");
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password, phone, address } = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);
      console.log(response);

      // Notification
      if (response.data.status === 'success...') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          email: '',
          password: '',
          name: '',
          phone: '',
          address: '',
        });
      } else {
        // const alert = (
        //   <Alert variant="danger" className="py-1">
        //     Failed
        //   </Alert>
        // );
        // setMessage(alert);
      }
    } catch (error) {
      // const alert = 
      // (
      // <Alert variant="danger" className="py-1">
      //   Failed
      // </Alert>
      // );
      setMessage(alert);
      console.log(error);
    }
  });


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Register
      </Button>

      <form onSubmit={(e) => handleSubmit.mutate(e)} >
        <Modal show={show} onHide={handleClose} style={{ width: "400px" }} className="position-absolute top-50 start-50 translate-middle">
          {message && message}
          <img src={maps} alt="" className='position-absolute top-0 start-0 rounded-top' width={"12%"} />
          <img src={leaf} alt="" className='position-absolute top-0 end-0 rounded-top' width={"20%"} />
          <div className="d-flex justify-content-center py-4">
            <div>
              <h1>
                Register
              </h1>
            </div>
          </div>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <input
                type="text"
                // placeholder="Full Name"
                value={name}
                name="name"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                // placeholder="Email"
                value={email}
                name="email"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <input
                type="password"
                // placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Phone</Form.Label>
              <input
                type="text"
                // placeholder="Phone"
                value={phone}
                name="phone"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <input
                type="text"
                // placeholder="Address"
                value={address}
                name="address"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ border: "none" }}>
            <Button variant="primary"
              onClick={(e) => {
                handleClose()
                handleSubmit.mutate(e)
              }}
              className="w-100"
              type='submit'
            >
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default ModalRegister