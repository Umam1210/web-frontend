import React from 'react'
import NavbarUser from '../components/Navbar';

import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../config/api'

function DetailLogin() {

  let { id } = useParams();
  let { data } = useQuery('detailCache', async () => {
    const response = await API.get('/artikel/' + id);
    console.log("ini data", response)
    return response.data.data;
  });

  
  let today = new Date();

  let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();


  return (
    <>
      <NavbarUser />
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
        <img src={data?.image} alt="" className='rounded' width={"97%"} />
      </div>
      <p className='mx-5'>{data?.desc}</p>
    </>


  )
}

export default DetailLogin