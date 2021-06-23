import React, { useState } from 'react'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'

import PersistentDrawer from '../Drawers/PersistentDrawer'
//import SwipeableDrawer from '../Drawers/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

import './addVisitorBtnStyles.css'



// setting up styles.
const useStyles = makeStyles( theme => ({
    parentContainer: {
        width: '500px',
        height: '545px',
        position: 'relative',
        left: '660px',
        top: '40px',
        /*boxShadow: '2px 2px 8px',
        borderRadius: '3%',
        textAlign: 'center' */
    },
    headerTextDiv: {
        backgroundColor: '#01579b',
        color: 'white',
        width: '850px',
        height: '80px',
        //borderRadius: '50%'
        boxShadow: '2px 2px 8px grey',
        position: 'relative',
        top: '30px',
        left: '400px'
    },
    headerText: {
        position: 'relative',
        left: '340px',
        top: '20px'
    },
    visitorFullNameTextFieldDiv: {
        position: 'relative',
        top:'70px',
        right: '200px'
    },
    visitorFullNameTextField: {
        width: '300px'
    },
    visitorIndexNumberTextFieldDiv: {
        position: 'relative',
        top: '16px',
        left: '200px'
    },
    visitorIndexNumberTextField: {
        width: '300px'
    },
    roomVisitedTextFieldDiv: {
        position: 'relative',
        top: '65px',
        right: '200px'
    },
    roomVisitedTextField: {
        width: '300px'
    },
    personGettingVisitedTextFieldDiv: {
        position: 'relative',
        top: '5px',
        left: '200px'

    },
    personGettingVisitedTextField: {
        width: '300px'

    },
    dateTextFieldDiv: {
        position: 'relative',
        top: '110px',
        //right: '170px'
    },
    timeTextFieldDiv: {
        position: 'relative',
        top: '130px',
        //left: '150px'
    },
    buttonsDiv: {
        position: 'relative',
        top: '130px'
    },
    datePicker: {
        position: 'relative',
        right: '180px',
        bottom: '60px'

    },
    timePicker: {
        position: 'relative',
        left: '40px',
        bottom: '60px'
    },
    visitorAddStatus: {
        position: 'relative',
        top: '115px'
    }
}))




export default function NewVisitor() {

    // initializing styling.
    let classes = useStyles()

    // handling state.
    const [ visitorFullName, setVisitorFullName ] = useState('')
    const [ visitorIndexNumber, setVisitorIndexNumber ] = useState('')
    const [ visitingRoom, setVisitingRoom ] = useState('')
    const [ roomMemberGettingVisited, setRoomMemberGettingVisited ] = useState('')
    const [ visitorAddedComplete, setVisitorAddedComplete ] = useState( true )

    // state for date and time
    const [ selectedDateAndTime, setSelectedDateAndTime ] = useState(new Date());
    

    const updateDateAndTime = ( date ) => {
        setSelectedDateAndTime( date )
    }

    const updateVisitorFullName = ( event ) => {
          setVisitorFullName( event.target.value )
    }

    const updateVisitorIndexNumber = ( event ) => {
        setVisitorIndexNumber( event.target.value )
    }

    const updateVisitingRoom = ( event ) => {
        setVisitingRoom( event.target.value )
    }

    const updateRoomMemberGettingVisited = ( event ) => {
        setRoomMemberGettingVisited( event.target.value )
    }


    // handling cancel button click.
    const handleCancelBtnClick = ( ) => {
        setVisitorFullName('')
        setVisitorIndexNumber('')
        setRoomMemberGettingVisited('')
        setVisitingRoom('')
    }


    // handling form submit.
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        setVisitorAddedComplete( false )
    
        let newVisitor = {
            visitorFullName,
            visitorIndexNumber : visitorIndexNumber.trim(),
            visitingRoom : visitingRoom.trim(),
            roomMemberGettingVisited,
            dateOfVisit: selectedDateAndTime.toDateString(),
            timeOfVisit: selectedDateAndTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            timeOfDeparture: 'Not available yet'
        }


        // saving the student details into the firebase database.
        projectFirestore.collection('Added Visitors Collection').add( newVisitor )
        .then( doc => {
            // modal goes here later.
            console.log(`visitor added with id ${ doc.id }`)
            alert('Visitor saved successfully')
            setVisitorAddedComplete( true )
            handleCancelBtnClick()
        })
        .catch(error => {
            console.log(`visitor could not be added due to error: ${error}`)
            alert('failed to save visitor due to error')
            setVisitorAddedComplete( true )
        })
        
    }



    return (
        <div style={{display: 'flex'}}>

            <PersistentDrawer />

            <div style={{display: 'column'}}>
            <div className={ classes.headerTextDiv }>
                <Typography  variant='h6' className={ classes.headerText} >
                    Add a new visitor
                </Typography>
            </div>
            
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>

            <div className={ classes.parentContainer }>
                <form onSubmit={ handleFormSubmit }>
                
          
                <div className={ classes.visitorFullNameTextFieldDiv}>
                    <TextField 
                        variant='outlined'
                        label="Visitor's full name"
                        required={ true }
                        value={ visitorFullName }
                        onChange={ updateVisitorFullName }
                        className={ classes.visitorFullNameTextField }
                    />
                </div>

                <div className={ classes.visitorIndexNumberTextFieldDiv }>
                    <TextField 
                        variant='outlined'
                        label="Visitor's Index Number"
                        required={ true }
                        value={ visitorIndexNumber }
                        onChange={ updateVisitorIndexNumber }
                        className={ classes.visitorIndexNumberTextField }
                    />
                </div>
          



                <div className={ classes.roomVisitedTextFieldDiv }>
                    <TextField 
                        variant='outlined'
                        label='Room of visit'
                        required={ true }
                        value={ visitingRoom }
                        onChange={ updateVisitingRoom }
                        className={ classes.roomVisitedTextField }
                    />
                </div>

                <div className={ classes.personGettingVisitedTextFieldDiv }>
                    <TextField 
                        variant='outlined'
                        label='Who is being visited (Full name)'
                        required={ true }
                        value={ roomMemberGettingVisited }
                        onChange={ updateRoomMemberGettingVisited }
                        className={ classes.personGettingVisitedTextField }
                    />
                </div>

                <div className={ classes.dateTextFieldDiv }>
                    <DatePicker 
                                disableToolbar
                                variant="inline"
                                required={ true }
                                format="MM / dd / yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select Date"
                                value={ selectedDateAndTime }
                                onChange={ updateDateAndTime }
                                className={ classes.datePicker }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }} /> 

                            <TimePicker 
                                margin="normal"
                                id="time-picker"
                                label="Pick Time"
                                required={ true }
                                value={ selectedDateAndTime }
                                onChange={ updateDateAndTime }
                                className={ classes.timePicker }
                                KeyboardButtonProps={{
                                  'aria-label': 'change time',
                                }}
                    
                              /> 
            
                </div>

                { !visitorAddedComplete && <span className={ classes.visitorAddStatus }>
                     Saving visitor... Please wait
                </span>}

                <div className={ classes.buttonsDiv}>
                    <button type='submit' className='addVisitorButton'> Add Visitor </button>

                    <button type='button' className='cancelAddVisitorButton' onClick={ handleCancelBtnClick } > Cancel </button>

                </div>

            </form>
            </div>
            

        </MuiPickersUtilsProvider>
        </div>
        </div>
    )
}
