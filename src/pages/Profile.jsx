import React from 'react'
import Navbarlogin from '../components/NavbarLogin'
import cat from '../image/cat.jpeg'

import { useQuery } from 'react-query'
import { API } from '../config/api'
import CardProfile from '../components/CardProfile';

function Profile() {

  let { data } = useQuery('usersCache', async () => {
    const response = await API.get('/check-auth');
    // console.log("ini response profil", response)
    return response.data.data;
  });

  // console.log(" ini data", data);

  return (
    <>
      <Navbarlogin />
      <h2 className='ms-5 my-3'>Profile</h2>
      <div className="d-flex justify-content-center" >
        <img src={cat} alt="" width={"200px"} height={"200px"} className="rounded-circle border border-primary" />
      </div>
      <div className="d-flex justify-content-center">
        <h3>{data?.name}</h3>
      </div>
      <div className="d-flex justify-content-center">
        <h5>{data?.email}</h5>
      </div>
      <CardProfile />

    </>
  )
}

export default Profile