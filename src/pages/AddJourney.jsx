import React from 'react'
import Navbarlogin from '../components/NavbarLogin'

import { Form, InputGroup, FloatingLabel, Button } from "react-bootstrap";
import { useMutation } from 'react-query'
import { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../context/UserContext'
import { API } from '../config/api'
import { UserContext } from '../context/UserContext';
import { useQuery } from 'react-query'



function AddJourney() {

  let navigate = useNavigate();
  // const [categories, setCategories] = useState([]); //Store all category data
  // const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview

  const [form, setForm] = useState({
    title: "",
    image: "",
    desc: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log("handle change", form);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set(
        "image",
        form.image[0],
        form.image[0].name
      );

      formData.set("desc", form.desc);
      // form.user_id === 0 && form.user_id === "" ? (formData.set("user_id", data?.id)) : (formData.set("user_id", form.user_id))

      console.log("form", form);

      // Insert film data
      const response = await API.post("/artikel", formData, config);
      console.log(response);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  });


  const fileInput = useRef(null);
  const handleFileInput = (e) => fileInput.current.click();

  const [formValues, setFormValues] = useState([{ title: "", link: "" }]);


  // let addFormFields = () => {
  //   setFormValues([...formValues, { title: "", link: "" }]);
  // };

  // let handleSubmit1 = (event) => {
  //   event.preventDefault();
  //   alert(JSON.stringify(formValues));
  // };

  // const [state, dispatch] = useContext(UserContext)
  // // let { id } = useParams();
  // // console.log("state", state)
  // let { data } = useQuery('usersCache', async () => {
  //   const response = await API.get('/check-auth');
  //   console.log("ini response", response)
  //   return response.data.data;
  // });

  // console.log(" ini data", data);


  // const checkUser = async () => {
  //   try {
  //     const response = await API.get('/check-auth');

  //     // If the token incorrect
  //     if (response.status === 404) {
  //       return dispatch({
  //         type: 'AUTH_ERROR',
  //       });
  //     }

  //     // Get user data
  //     let payload = response.data.data.user;
  //     // Get token from local storage
  //     payload.token = localStorage.token;

  //     // Send data to useContext
  //     dispatch({
  //       type: 'USER_SUCCESS',
  //       payload,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.token) {
  //     checkUser();
  //   }
  // }, [])


  return (
    <>
      <Navbarlogin />
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className='mx-5'>
          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="title"
              // value={title}
              placeholder="Title"
              onChange={handleChange}

            />
          </Form.Group>
          {/* <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Control
              type="number"
              name="user_id"
              defaultValue={data?.id}
              placeholder="User"
              onChange={handleChange}
            />
          </Form.Group> */}

          <InputGroup className="">
            <Form.Control
              type="file"
              name="image"
              //  value={image}
              onChange={handleChange}

            />
            <InputGroup.Text id="basic-addon1">
              {/* <img src={icon} alt="" style={{ height: "20px" }} /> */}
            </InputGroup.Text>
          </InputGroup>
          <FloatingLabel className="my-3" controlId="floatingTextarea2" label="Description" >
            <Form.Control
              as="textarea"
              type="text"
              name="desc"
              // value={desc}
              placeholder="desc"
              onChange={handleChange}
              style={{ height: '100px' }}

            />
          </FloatingLabel>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary" className="px-5 py-1 mt-3 mx-5 ">
              Post
            </Button >
          </div>

        </div>
      </form>
    </>
  )
}

export default AddJourney