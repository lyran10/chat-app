import React, { useState,useEffect } from 'react'
import { Container,Col,Row } from 'react-bootstrap'
import { NavBar } from '../components/navBar'

export const MainPage = () => {

  const [size,setSize] = useState<number>(window.innerWidth)
 
  const resize = () => {
   setSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
  },[])

  return (
    <Container style={{height:"100vh",width:"100vw",backgroundColor:"#3b5998",maxWidth:"100%",margin:"0px 0px",padding :"0px 0px"}}> 
      <NavBar/>
    </Container>
  )
}