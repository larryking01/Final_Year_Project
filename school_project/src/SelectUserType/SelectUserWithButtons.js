import React from 'react'
import { useHistory, Link, NavLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PersonIcon from '@material-ui/icons/Person'



// for styling
import { makeStyles } from '@material-ui/styles'
import '../App.css'
import { Person } from '@material-ui/icons'


// setting up material-ui styling
const useStyles = makeStyles( theme => ({
    headerTypography: {
        color: 'white',
        position: 'relative',
        top: '50px'
    },
    userTypography: {
        color: 'white',
        position: 'relative',
        top: '130px'
    },
    studentButton: {
        position: 'relative',
        top: '180px',
        color: 'white',
        background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
        width: '300px'
    },
    staffButton: {
        position: 'relative',
        top: '220px',
        color: 'white',
        background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
        width: '300px'
    },
    nssAccomLink: {
        position: 'relative',
        top: '240px',
        color: 'yellow',
        fontSize: '14px',
        textDecoration: 'none'
    }

    
}))








export default function SelectUserWithButtons() {

    // initializing routing.
    const router = useHistory()

    // initializing styling.
    const classes = useStyles()



    return (
        <div className='App-header'>
            <Typography className={ classes.headerTypography } variant='h5'>
                Student Tracking, Complaint Submission And NSS Accommodation Finder.
            </Typography>

            <Typography className={ classes.userTypography } variant='h6'>
                Click an option below to continue....
            </Typography>

            <div>
                <Button className={ classes.studentButton } 
                        startIcon={ <MenuBookIcon /> }
                        onClick={ () => router.push('/signin') }
                >
                    Student 
                </Button>

            </div>

            <div>
                <Button className={ classes.staffButton }
                        startIcon={ <PersonIcon /> }
                        onClick={ () => router.push('/stafflogin')  }
                >
                    Staff 
                </Button>
                
            </div>

            <Link  className={ classes.nssAccomLink} to='/nssaccomodationfinder'>
                Are you looking for national service accommodation? Click here 
            </Link>

            
        </div>
    )
}
