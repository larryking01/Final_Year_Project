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
        width: 620,
        height: 520,
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
        backgroundColor: 'rgba(105, 13, 170, 0.541)'
    },
    headerText: {

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

    // function to update staff ID
    const updateStaffID = (event) => {
        setStaffID(event.target.value)
    }

    // function to update staff PIN
    const updateStaffPIN = (event) => {
        setStaffPIN(event.target.value)
    }



    // dummy function to add a staff ID and PIN to the staff login collection.
    const HandleButtonClick = () => {
        let temporaryArray = []
       
        if(staffID.length < 1 && staffPIN.length < 1) {
            // modal goes in here later.
            alert('You need to enter a valid staff ID and pin to continue')
        } else if(staffID.length < 1 && staffPIN.length > 1) {
            alert('No staff ID entered. Enter a valid staff ID to continue')
        } else if(staffID.length > 1 && staffPIN.length < 1) {
            alert('No PIN entered. Enter a matching pin to continue')
        } else {
            let staffLoginCollection = projectFirestore.collection('Staff Login Collection')
            staffLoginCollection.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    temporaryArray.push({...doc.data() })
                })
                setLoginsArray(temporaryArray)
                //console.log(loginsArray)

                // verifying that there is a matching user
                let verify = loginsArray.filter(eachItem => ( 
                    eachItem.staffID === staffID && eachItem.pin === staffPIN))
                if(verify.length > 0) {
                    // link to main page
                    alert('verification successful')
                    router.push('/viewallstudents')

                }
                else {
                    // modal goes here
                    alert('Your staff ID and pin does not match. Please make sure you have entered the right credentials to continue')
                }

            })
     
        }

    }

    // handling when the enter key is pressed.
    const HandleEnterPressed = (event) => {
        if(event.key === 'Enter') {
            HandleButtonClick()
        }
    }
    


    





    return (
        <div className='parentContainer'>
            <div className={classes.loginContainer}>
                <Typography variant='h4' className={classes.headerText}>
                    Staff Login 
                </Typography>


                <div>
                <TextField className={classes.staffIDTextField}
                           variant='outlined' 
                           label='Staff ID'
                           color='primary'
                           type='text'  
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
                           onChange={ updateStaffPIN }
                           value={ staffPIN }
                           onKeyPress={HandleEnterPressed}
                           
                />
                </div>

                <div>
                <Button variant='contained' className={classes.signInButton}
                        color='primary' onClick={ HandleButtonClick } >
                    Continue
                </Button>
                </div>

               
                    
            </div>
            

        </div>
    )
}



export default StaffLogin