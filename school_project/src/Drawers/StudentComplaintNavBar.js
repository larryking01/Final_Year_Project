import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'




export default function StudentTrackingNavBar( props ) {

    // destructuring props.
    const { user, handleLogout } = props 


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

                   <Nav.Link onClick={() => router.push('/submitcomplaint')} style={{color: 'white'}} > Submit a complaint </Nav.Link>
                   <Nav.Link onClick={() => router.push('/studentcomplainthistory')} style={{color: 'white'}}> View complaints history </Nav.Link>
                   <Nav.Link onClick={() => router.push('/nssaccomodationfinder/disp')} style={{color: 'white'}}> Access NSS accommodation </Nav.Link>
                   <Nav.Link onClick={() => {}} style={{color: 'white'}}> { user.email } </Nav.Link>
                  
               </Nav>

               <Button /*variant='primary' */ 
                       style={{ position: 'relative', right: '90px', backgroundColor: '#00d1b2', color: 'black', width:'5.5em'  }}
                       onClick={ handleLogout }>
                            Log out 
                </Button>

        </Navbar>
    )
}
