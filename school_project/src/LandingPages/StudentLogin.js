import React, { useState } from 'react'
import AuthenticationNavBar from '../Drawers/AuthenticationNavBar'
import './StudentLogin.css'
/*import mathImage from './assets/math.png'
import brainstorming from './assets/brainstorming.png'
import login from './assets/login.png' */
import authentication from './assets/authentication.png'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'





export default function StudentLogin2( props ) {

    //destructuring all the props.
    const { 
        signInEmail, 
        setSignInEmail, 
        signInPassword, 
        setSignInPassword, 
        handleLogin, 
        emailError, 
        passwordError,
        user ,
        clearErrors
        } = props 


    // for routing.
    const router = useHistory()



    // handling form submission
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        handleLogin()
        if( user ) {
            router.push('/studentlandingpage')
        } else {
            router.push('/studentsignin')
        }
    }


    
    return (
        <div>
            <AuthenticationNavBar buttonText='Student Sign In' />

            <div style={{
                marginTop: '94px',
                width: '90vw',
                height: '90vh',
                display: 'flex'
            }}>

                <img src={ authentication } width={ 800 } />
                <h1 style={{ position: 'relative', top: '60px', left: '70px'}}> Welcome </h1>
                <h4 style={{ position: 'relative', top: '160px', right: '140px'}}> Student </h4>


                <Form style={{ position: 'relative', right: '370px', top: '240px'}} onSubmit={ handleFormSubmit }>
                    <Form.Control type='email' placeholder='Email' required style={{ width: '400px', marginBottom: '30px' }} 
                        onChange={ (event) => {
                               setSignInEmail( event.target.value )
                               clearErrors()
                           } }
                           value={ signInEmail } />

                    <Form.Control type='password' placeholder='Password' required style={{ width: '400px', marginBottom: '50px' }} 
                        onChange={ (event) => {
                            setSignInPassword(event.target.value)
                            clearErrors() 
                          }}
                        value={ signInPassword }
                    />

                    <Button variant='primary' type='submit' style={{ width: '400px', marginLeft: '2px', paddingLeft: '180px', marginBottom: '10px' }}> Sign In </Button>

                    <Link to='/studentsignup'> Haven't registered yet? Sign up here </Link>


                </Form>






            </div>
            
        </div>
    )
}
