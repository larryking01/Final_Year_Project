import React, { useState } from 'react'
import AuthenticationNavBar from '../Drawers/AuthenticationNavBar'
/*import mathImage from './assets/math.png'
import brainstorming from './assets/brainstorming.png'
import login from './assets/login.png' */
import authentication from '../LandingPages/assets/authentication.png'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'





// importing other files.
import '../App.css'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'



// setting up styling.
const useStyles = makeStyles({
    
})





// the functional component.
const StaffLogin = ( props ) => {

    // destructuring props.
    const { staffID, staffPIN, setStaffID, setStaffPIN } = props





    // initializing styling
    const classes = useStyles()

    // for routing.
    let router = useHistory()


    // handling state.
    const [loginsArray, setLoginsArray] = useState([])
    const [verifyingComplete, setVerifyingComplete] = useState(true)


    /* function to update staff ID
    const updateStaffID = (event) => {
        setStaffID(event.target.value)
    }


    // function to update staff PIN
    const updateStaffPIN = (event) => {
        setStaffPIN(event.target.value)
    } */



    /* Showing and hiding the password
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword)
    }

    */


    // function to verify staff credentials.
    const HandleFormSubmit = (event) => {
       
        event.preventDefault()
        setVerifyingComplete(false)
        let staffLoginCollection = projectFirestore.collection('Staff Login Collection')
        staffLoginCollection.where('staffID', '==', staffID)
        .get().then( querySnapshot => {
            if(querySnapshot.empty) {
                // modal goes here later.
                setVerifyingComplete(true)
                alert(`Invalid staff ID. No staff with the ID ${staffID} exists`)
            }
            else {
                staffLoginCollection.where('staffID', '==', staffID).where('pin', '==', staffPIN)
                .get().then( querySnapshot => {
                    if(querySnapshot.empty) {
                        // modal goes here later.
                        setVerifyingComplete(true)
                        alert(`Invalid pin for staff ID ${staffID}. Enter the correct pin to continue`)
                    } 
                    else {
                        setVerifyingComplete(true)
                        // modal goes here later
                        alert('verification successful !!')
                        router.push('/stafflandingpage')
                    }
                })
            }
        })
        
    }

    // handling when the enter key is pressed.
    const HandleEnterPressed = (event) => {
        if(event.key === 'Enter') {
            HandleFormSubmit(event)
        }
    }
    


    return (
       
            <div className={classes.loginContainer}>

                <AuthenticationNavBar buttonText='Staff Sign In' />

                <div style={{
                marginTop: '94px',
                width: '90vw',
                height: '90vh',
                display: 'flex'

                 }}>

                    <img src={ authentication } width={ 800 } />
                    <h1 style={{ position: 'relative', top: '60px', left: '70px'}}> Welcome </h1>
                    <h4 style={{ position: 'relative', top: '160px', right: '140px'}}> Staff </h4>


                    <Form style={{ position: 'relative', right: '370px', top: '240px'}} onSubmit={ HandleFormSubmit }>
                    <Form.Control type='text' placeholder='Staff ID' required style={{ width: '400px', marginBottom: '30px' }} 
                        onChange={ (event) => {
                               setStaffID( event.target.value )
                               
                           } }
                           value={ staffID } />

                    <Form.Control type='password' placeholder='Staff PIN' required style={{ width: '400px', marginBottom: '50px' }} 
                        onChange={ (event) => {
                            setStaffPIN(event.target.value)
                             
                          }}
                        value={ staffPIN }
                    />

                    <Button variant='primary' type='submit' style={{ width: '400px', marginLeft: '2px', paddingLeft: '180px', marginBottom: '10px' }}> Sign In </Button>

                    { !verifyingComplete && <p> Verifying your credentials. Please wait..... </p> }

                
                </Form>

                </div>

            </div>
            
    )
}



export default StaffLogin