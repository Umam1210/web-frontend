import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import maps from '../image/maps.png'
import leaf from '../image/leaf.png'


import { useMutation } from 'react-query'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'

function ModalLogin() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post('/login', body, config);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        // Status check
        if (response?.status === 200) {
          navigate('/home');
        } else {
          navigate('/');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Wrong Email or Password
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }

  });

  return (
    <>
      <Button variant="" className='border border-light text-dark btn btn-light' onClick={handleShow}>
        Login
      </Button>
      <form onSubmit={(e) => handleSubmit.mutate(e)}  >
        <Modal show={show} onHide={handleClose} style={{ width:"400px"}} className="position-absolute top-50 start-50 translate-middle" >
            <img src={maps} alt="" className='position-absolute top-0 start-0 rounded-top' width={"12%"}/>
            <img src={leaf} alt="" className='position-absolute top-0 end-0 rounded-top' width={"20%"} />
            <div className="d-flex justify-content-center py-4">
              <div>
                <h1>
                  Login
                </h1>
              </div>
            </div>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {message && message}
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                placeholder=""
                value={email}
                name="email"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <input
                type="password"
                placeholder=""
                value={password}
                name="password"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ border: "none" }}>
            <Button variant="primary w-100"
              onClick={(e) => {
                // handleClose()
                handleSubmit.mutate(e)
              }}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default ModalLogin