import React,{useState,useRef,useEffect} from 'react'
import { Container,Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SideBar } from './sideBarComponents/sideBar'
import {IoIosNotifications} from "react-icons/io"
import { SideMenu } from './sideMenu'

export const NavBar = () => {
  const InputRef = useRef<HTMLInputElement>(null)
  return (
    <Nav style={{display:"flex",justifyContent:"flex-end"}}>
      <Nav>
      <Nav.Item>
        <Nav.Link style={{display : "flex",gap:"10px"}}>
          <SideBar/>
        </Nav.Link>
      </Nav.Item>
      <Nav>
      <Nav.Item>
        <Nav.Link>
          <IoIosNotifications className='mt-1' size={30} style={{color:"white"}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
        <SideMenu/>
        </Nav.Link>
      </Nav.Item>
      </Nav>
      </Nav>
    </Nav>
  )
}