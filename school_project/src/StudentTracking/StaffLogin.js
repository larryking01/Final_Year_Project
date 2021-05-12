import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

// importing other files.
import '../App.css'
import { projectFirestore, timestamp } from '../firebaseSetup/firebaseConfig'



// setting up styling.
const useStyles = makeStyles({
    loginContainer: {
        backgroundColor: 'white',
        width: 580,
        height: 470,
        borderRadius: '5%',
        textAlign: 'center'
    },
    staffIDTextField: {
        marginTop: 120,
        width: 270
    },
    staffPINTextField: {
        marginTop: 50,
        width: 270
    },
    signInButton: {
        marginTop: 40,
        width: 270,
        backgroundColor: 'rgba(105, 13, 170, 0.541)',
        height: 35,
        fontSize: 16, 
        cursor: 'pointer',
        border: 'none',
        '&:hover': {
            backgroundColor: 'blue',
            color: 'white'
        }
    },
    headerText: {
        position: 'relative',
        top: 40
    }
})





// the functional component.
const StaffLogin = () => {

    // initializing styling
    const classes = useStyles()

    // for routing.
    let router = useHistory()

    // handling state.
    const [staffID, setStaffID] = useState('')
    const [staffPIN, setStaffPIN] = useState('')
    const [loginsArray, setLoginsArray] = useState([])
    const [verifyingComplete, setVerifyingComplete] = useState(true)

    // function to update staff ID
    const updateStaffID = (event) => {
        setStaffID(event.target.value)
    }

    // function to update staff PIN
    const updateStaffPIN = (event) => {
        setStaffPIN(event.target.value)
    }



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
                        router.push('/viewallstudents')
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
        <div className='parentContainer'>
            <div className={classes.loginContainer}>
                <form onSubmit={ HandleFormSubmit }>
                <Typography variant='h4' className={classes.headerText}>
                    Staff Login 
                </Typography>

                <div>
                <TextField className={classes.staffIDTextField}
                           variant='outlined' 
                           label='Staff ID'
                           color='primary'
                           type='text' 
                           required={ true } 
                           onChange={ updateStaffID }
                           value={ staffID }
                           onKeyPress={HandleEnterPressed}
                />
                </div>

                <div>
                <TextField className={classes.staffPINTextField}
                           variant='outlined' 
                           label='PIN'
                           color='primary'
                           type='password'  
                           required={ true }
                           onChange={ updateStaffPIN }
                           value={ staffPIN }
                           onKeyPress={HandleEnterPressed}
                           
                />
                </div>

                <div>
                <button type='submit' className={classes.signInButton} >
                    Continue
                </button>
                </div>

                { !verifyingComplete && <p> Verifying your credentials. Please wait..... </p>}

                </form>
            </div>
            
        </div>
    )
}



export default StaffLogin