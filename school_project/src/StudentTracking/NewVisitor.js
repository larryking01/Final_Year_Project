import React, { useState } from 'react'

import PersistentDrawer from './PersistentDrawer'
//import SwipeableDrawer from './SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { DatePicker, TimePicker, MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

import './addVisitorBtnStyles.css'



// setting up styles.
const useStyles = makeStyles( theme => ({
    parentContainer: {
        width: '500px',
        height: '530px',
        position: 'relative',
        left: '200px',
        top: '20px',
        boxShadow: '2px 2px 8px',
        borderRadius: '3%',
        textAlign: 'center'
    },
    visitorFullNameTextFieldDiv: {
        position: 'relative',
        top:'10px'
    },
    visitorFullNameTextField: {
        width: '270px'
    },
    visitorIndexNumberTextFieldDiv: {
        position: 'relative',
        top: '35px'
    },
    visitorIndexNumberTextField: {
        width: '270px'
    },
    roomVisitedTextFieldDiv: {
        position: 'relative',
        top: '65px'
    },
    roomVisitedTextField: {
        width: '270px'
    },
    personGettingVisitedTextFieldDiv: {
        position: 'relative',
        top: '95px'

    },
    personGettingVisitedTextField: {
        width: '270px'

    },
    dateTextFieldDiv: {
        position: 'relative',
        top: '110px'
    },
    timeTextFieldDiv: {
        position: 'relative',
        top: '130px'
    },
    buttonsDiv: {
        position: 'relative',
        top: '140px'
    },
    datePicker: {
        position: 'relative',
        right: '20px'
    },
    timePicker: {
        position: 'relative',
        left: '20px'
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

    // state for date and time
    const [ selectedDateAndTime, setSelectedDateAndTime ] = useState(new Date());
    //const [ selectedTime, handleTimeChange ] = useState();

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


    // handling form submit.
    const handleFormSubmit = ( event ) => {
        event.preventDefault()

        console.log(`visitor details = `)
        console.log(`full name = ${visitorFullName}`)
        console.log(`index number = ${visitorIndexNumber}`)
        console.log(`visiting room = ${visitingRoom}`)
        console.log(`person getting visited = ${roomMemberGettingVisited}`)
        console.log(`date of visit = ${ selectedDateAndTime.toDateString()}`)
        console.log(`time of visit = ${ selectedDateAndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}`)
        
    }



    return (
        <div style={{display: 'flex'}}>

            <PersistentDrawer />
            
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>

            <div className={ classes.parentContainer }>
                <form onSubmit={ handleFormSubmit }>
                <Typography variant='h6'>
                    Add a new visitor
                </Typography>

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

                <div className={ classes.buttonsDiv}>
                    <button type='submit' className='addVisitorButton'> Add Visitor </button>

                    <button type='button' className='cancelAddVisitorButton'> Cancel </button>

                </div>

            </form>
            </div>

        </MuiPickersUtilsProvider>

        </div>
    )
}
