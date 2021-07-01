import React from 'react'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'




export default function AuthenticationNavBar( props ) {

    // destructuring props.
    const { buttonText } = props


    // for routing.
    const router = useHistory()




    return (
        <Navbar bg='navBarBackground' variant='dark' 
                style={{ width: '100vw', height: '95px' }} 
                fixed='top' >

               <Navbar.Brand style={{ marginLeft: '155px', cursor: 'pointer'}} 
                             onClick={() => router.push('/stafflandingpage')} >

                    <img src='https://t4.ftcdn.net/jpg/00/94/89/63/360_F_94896312_GccJGxVQIZ7iypo8bNAWVQVLyCJPIRbP.jpg'
                         alt='app image'
                         width='100px'
                    />
                    <h5 style={{ fontSize: '11px', position: 'relative', top: '8px', left: '4px'}}>Student Complaint</h5>
               </Navbar.Brand>

               <Nav>
                    <Button 
                       style={{ position: 'relative', right: '120px', backgroundColor: '#00d1b2', color: 'black', width: '200px', paddingLeft: '40px' }} >
                             { buttonText }
                           
                     </Button>
  
               </Nav>

        </Navbar>
    )
}
