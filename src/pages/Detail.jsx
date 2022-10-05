import React from 'react'
import Navbarlogin from '../components/NavbarLogin'

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../config/api'
import logo from '../image/Bookmark2.png'

function Detail() {

  let { id } = useParams();

  let { data } = useQuery('artikelCache', async () => {
    const response = await API.get('/artikel/' + id);
    return response.data.data;
  });

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
              artikel_id: parseInt(id)
          });
          await API.post("/bookmark", body, config);
          navigate("/bookmark");
      } catch (error) {
          console.log(error);
      }
  };


  let today = new Date();

  let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
  
  console.log(date)

  return (
    <>
      <Navbarlogin />
      <div className='d-flex mb-3 my-4 mx-5'>
        
        <h2 className='me-auto p-2'>
          {data?.title}
        </h2>
        <h6 className='mx-5' style={{ color: "#3B97D3" }}>
          {data?.user.name}
        </h6>
      </div>
      <span style={{ color: "#3B97D3" }} className=" mx-5">{date}</span>
      <div className='px-5 py-3'>
      <img src={logo} alt="" 
      className='position-absolute end-0 mt-3'
      style={{marginRight:"80px"}}
      width={"3%"}
      onClick={handleSubmit}
       />
        <img src={data?.image} alt="" className='rounded ' width={"100%"} />
      </div>
      <p className='mx-5'>{data?.desc}</p>
    </>


  )
}

export default Detail