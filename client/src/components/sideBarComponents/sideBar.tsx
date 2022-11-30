import React, { useState,useEffect,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaSearch} from "react-icons/fa"
import { inputStyling } from '../../utils/styling';

export const SideBar = () => {
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
    <>
      <Button  style={{fontFamily: 'Montserrat, sans-serif',backgroundColor:"#3b5998",display:"flex",gap:"5px"}} onClick={handleShow} className="me-2">
      <FaSearch className='mt-1'/>
        Find Players
      </Button>
      <Offcanvas show={show} onHide={handleHide} {...obj as {placement : any}}>
        <Offcanvas.Header>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <input ref={InputRef} style={inputStyling(width,visibility)} type="text"/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}