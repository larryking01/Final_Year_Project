import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { InputAdornment, IconButton } from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

// importing other files.
import '../App.css'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'



// setting up styling.
const useStyles = makeStyles({
    loginContainer: {
        height: '470px',
        width: '360px',
        textAlign: 'center',
        position: 'relative',
        top: '40px',
        left: '400px',
        /*borderRadius: '5%',
        boxShadow: '2px 2px 8px' */
    },
    staffIDTextField: {
        marginTop: 100,
        width: 270
    },
    staffPINTextField: {
        marginTop: 50,
        width: 270
    },
    signInButton: {
        marginTop: 50,
        width: 270,
        backgroundColor: '#2E2A3B',
        color: 'white',
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

    // function to update staff ID
    const updateStaffID = (event) => {
        setStaffID(event.target.value)
    }

    // function to update staff PIN
    const updateStaffPIN = (event) => {
        setStaffPIN(event.target.value)
    }

    // Showing and hiding the password
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword)
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
                           type={ showPassword ? "text" : "password"}
                           required={ true }
                           onChange={ updateStaffPIN }
                           value={ staffPIN }
                           onKeyPress={HandleEnterPressed}
                           InputProps={{ 
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={ handleClickShowPassword }
                                  onMouseDown={ handleMouseDownPassword }
                                >
                                  { showPassword ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                           
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
            
    )
}



export default StaffLogin