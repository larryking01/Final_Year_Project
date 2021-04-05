import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'

import { useHistory } from 'react-router-dom'
import '../App.css'



// setting up material-ui styling.
const useStyles = makeStyles({
    introText: {
        color: 'white',
        position: 'relative',
        top: 60
    },
    userTypeText: {
        color: 'white',
        position: 'relative',
        top: 100
    },
    checkboxContainer: {
        marginTop: 200,
        color: 'white'
    },
    continueBtn: {
        marginTop: 30,
        background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
        width:300
    }
})


// the functional component.
export default function SelectUser(props) {
    // for styling
    const classes = useStyles()

    // for routing
    const router = useHistory()

    // handling state.
    const [studentChecked, setStudentChecked] = useState(false)
    const [staffChecked, setStaffChecked] = useState(false)

    // function to handle student checked.
    function HandleStudentChecked (event) {
        setStudentChecked(event.target.checked)
        console.log(studentChecked)
        console.log(`router = ${router}`)
    }


    // function to handle staff checked.
    function HandleStaffChecked (event) {
        setStaffChecked(event.target.checked)
        console.log(staffChecked)
        console.log(`router = ${router}`)
    }



    // function to display the checkboxes
    function ShowCheckBoxes() {
        return (
          <div className={classes.checkboxContainer}>
            <FormControlLabel control={ 
                <Checkbox checked={studentChecked} 
                          disabled = { staffChecked ? true : false }
                          onChange={HandleStudentChecked}
                          inputProps= {{
                              'aria-label': 'primary checkbox'
                          }}
                /> }
                 label='Student' 
                      />


            <FormControlLabel control={
                <Checkbox checked={staffChecked} 
                          disabled = { studentChecked ? true : false }
                          onChange={HandleStaffChecked}
                          inputProps= {{
                            'aria-label': 'primary checkbox'
                        }}
                /> }
                label='Staff'
                   />

          </div>
        )
    }


    // function to handle when the continue button is clicked.
    function HandleContinueButtonClick() {
        if(studentChecked) {
            router.push('/studentlogin')
        } else if(staffChecked) {
            router.push('/stafflogin')
        } else {
            // a dialog or modal comes in here later.
            alert('You need to select a user-type to continue')
        }
    }


    return (
        <div className='App-header'>
          <Typography variant='h4' className={classes.introText} >
            Integrated student tracking, report submission and nss accomodation finder.
          </Typography>
          <Typography variant='h6' className={classes.userTypeText}>
              Please select your user-type below to continue.....
          </Typography>

          <ShowCheckBoxes />
          <Button className={classes.continueBtn} 
                  onClick={HandleContinueButtonClick}
                  variant='contained'
                  size='large'
                  color='primary'
                  startIcon={<DoubleArrowIcon />}
                  >
              Continue 
          </Button>
            
        </div>
    )
}
