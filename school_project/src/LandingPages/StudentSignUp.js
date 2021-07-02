import React from 'react'
import AuthenticationNavBar from '../Drawers/AuthenticationNavBar'
import './StudentLogin.css'
import mathImage from './assets/math.png'
import brainstorming from './assets/brainstorming.png'
import login from './assets/login.png'
import authentication from './assets/authentication.png'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'





export default function StudentSignUp2( props ) {

    // destructuring props.
    const {
        signUpEmail, 
        setSignUpEmail, 
        signUpPassword, 
        setSignUpPassword, 
        handleSignUp, 
        emailError, 
        passwordError
    } = props 



    // for routing.
    const router = useHistory()


    // handling form submission
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        handleSignUp()
    }


    return (
        <div>
            <AuthenticationNavBar buttonText='Student Sign Up' />

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
                    <Form.Control type='email' required placeholder='Email' style={{ width: '400px', marginBottom: '30px' }} onChange={ (event) => setSignUpEmail(event.target.value) }
                        value={ signUpEmail } />

                    <Form.Control type='password' required placeholder='Password' style={{ width: '400px', marginBottom: '50px' }} onChange={ (event) => setSignUpPassword(event.target.value) }
                        value={ signUpPassword } />

                    <Button variant='primary' type='submit' style={{ width: '400px', marginLeft: '2px', paddingLeft: '180px', marginBottom: '10px' }}> Sign Up </Button>

                    <Link to='/studentsignin'> Already have an account? Sign in here </Link>


                </Form>






            </div>
            
        </div>
    )
}
