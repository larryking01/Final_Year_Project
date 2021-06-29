import React from 'react'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'




export default function StudentTrackingNavBar( props ) {

    // destructuring props.
    const { staffID, staffPIN } = props


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
                    <h5 style={{ fontSize: '11px', position: 'relative', top: '8px', left: '4px'}}>Student Tracking</h5>
               </Navbar.Brand>

               <Nav >
                   
                   <NavDropdown title='All features' >
                       <NavDropdown.Item onClick={() => router.push('/managevisitors')}>Manage Visitors </NavDropdown.Item>
                       <NavDropdown.Item onClick={() => router.push('/viewallcomplaints')}>View all complaints </NavDropdown.Item>
                       <NavDropdown.Item onClick={() => router.push('/postannouncement')}>Post an announcement </NavDropdown.Item>
                       <NavDropdown.Item onClick={() => router.push('/manageannouncements')}>Manage announcements </NavDropdown.Item>
                       <NavDropdown.Item onClick={() => router.push('/nssaccomodationfinder')}>Access NSS accommodation </NavDropdown.Item>
                   </NavDropdown>

                   <Nav.Link onClick={() => router.push('/addnewstudent')}> Add a new student </Nav.Link>
                   <Nav.Link onClick={() => router.push('/viewallstudents')}> View all students </Nav.Link>
                   <Nav.Link onClick={() => router.push('/newvisitor')}> Add a new visitor </Nav.Link>
                   <Nav.Link onClick={() => {}}> { staffID } </Nav.Link>
                   
               </Nav>

               <Button variant='primary' 
                       style={{ position: 'relative', right: '90px' }}
                       onClick={() => router.push('/stafflogin')}>
                            Log out 
                </Button>







        </Navbar>
    )
}
