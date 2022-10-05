import React, { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import cat from '../image/cat.jpeg'
import profile from '../image/user 2.png'
import journey from '../image/daun.png'
import bookmark from '../image/Vector.png'
import logout from '../image/logout 1.png'
import { Link, useNavigate } from "react-router-dom";


function Tooltip() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);


  const Navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    Navigate('/')
  }

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  // function profil() {
  //   Navigate('/profile')
  // }

  return (
    <div ref={ref}>
      <p onClick={handleClick} className="rounded" variant='light'>
        <img src={cat} alt="" width={"50px"} height={"50px"} className="rounded-circle border border-primary" />
      </p>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Link to="/profile" className='text-decoration-none text-dark'>
            <Popover.Header as="h3">
              <img src={profile} alt="" className='me-3' />
              Profile
            </Popover.Header>
          </Link>
          <Popover.Header as="h3">
            <Link to="/add-journey" className='text-decoration-none text-dark'>
              <img src={journey} alt="" className='me-3' />
              New Journey
            </Link>
          </Popover.Header>
          <Popover.Header as="h3">
            <Link to="/bookmark" className='text-decoration-none text-dark'>
              <img src={bookmark} alt="" className='me-4' />
              Bookmark
            </Link>
          </Popover.Header>
          <Popover.Body
            onClick={handleLogout}

          >
            <img src={logout} alt="" className='me-3' />
            <strong>Logout</strong>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  )
}

export default Tooltip