import React, { useState,useEffect,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FiMenu} from "react-icons/fi"
import { ListGroup } from 'react-bootstrap';
// import { inputStyling } from '../../utils/styling';

export const SideMenu = () => {
  const InputRef = useRef<HTMLInputElement | null>(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const obj = {placement : "end"}
  const [width,setWidth] = useState<string>("0px")
  const [visibility,setVisibility] = useState<any>("hidden")

  useEffect(() => {
    setTimeout(() => {
      if(InputRef.current){
        InputRef.current.focus()
          setWidth("100%")
          setVisibility("visible")
      }
    },320)
  })

  const handleBlur = () => {
    setWidth("0px")
    setVisibility("hidden")
  }

  const handleHide = () => {
    handleClose()
    handleBlur()
  }

  return (
    <div>
      <FiMenu size={30} style={{color:"white"}} className='mt-1 me-3' onClick={handleShow}/>
      <Offcanvas style={{height : "150px"}} className="mt-5" show={show} onHide={handleHide} {...obj as {placement : any}}>
        <Offcanvas.Body>
        <ListGroup>
      <ListGroup.Item>My Profile</ListGroup.Item>
      <ListGroup.Item>Logout</ListGroup.Item>
    </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}