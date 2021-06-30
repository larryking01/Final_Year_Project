import React, { useState } from 'react'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import StudentTrackingNavBar from '../Drawers/StudentTrackingNavBar'
import { makeStyles } from '@material-ui/core/styles'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

//import './addVisitorBtnStyles.css'



// setting up styles.
const useStyles = makeStyles( theme => ({
    addVisitorForm: {
        position: 'relative',
        left: '280px',
        width: '60vw'
    },
    visitorAddStatus: {
        position: 'relative',
        top: '115px'
    },
    formRow: {
        marginBottom: '30px'
    },
    submitBtn: {
        width: '390px',
        marginTop: '60px',
        marginLeft: '5px',
        paddingLeft: '140px'
    },
    cancelBtn: {
        width: '390px',
        marginTop: '60px',
        marginLeft: '10px',
        paddingLeft: '160px'
    },
    Buttons: {
        marginTop: '-40px'
    },
    secondaryButtons: {
        marginTop: '-40px'
    }

}))




export default function NewVisitor( props ) {

    // destructuring props.
    const { staffID } = props

    // initializing styling.
    let classes = useStyles()

    // for date and time.
    let visitingDate = new Date()


    // for whether or not visitor is a UG student
    // handling the state for the sex autocomplete component.
    const [ visitorUGStudentValue, setVisitorUGStudentValue ] = useState('Yes')
    const [ visitorUGStudentInputValue, setVisitorUGStudentInputValue ] = useState('')

    let visitorStudentStatus = [
        { UGStudent: 'Yes'},
        { UGStudent: 'No'}
    ]


    // handling state.
    const [ visitorFullName, setVisitorFullName ] = useState('')
    const [ visitorIndexNumber, setVisitorIndexNumber ] = useState('')
    const [ visitingRoom, setVisitingRoom ] = useState('')
    const [ roomMemberGettingVisited, setRoomMemberGettingVisited ] = useState('')
    //const [ visitorUGStudent, setVisitorUGStudent ] = useState( true )
    const [ visitorAddedComplete, setVisitorAddedComplete ] = useState( true )
    const [ visitorMobileNumber, setVisitorMobileNumber ] = useState('')


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

    const updateVisitorMobileNumber = ( event ) => {
        setVisitorMobileNumber( event.target.value )
    }


    // handling cancel button click.
    const handleCancelBtnClick = ( ) => {
        setVisitorFullName('')
        setVisitorIndexNumber('')
        setRoomMemberGettingVisited('')
        setVisitingRoom('')
        setVisitorUGStudentInputValue('')
        setVisitorMobileNumber('')
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
            dateOfVisit: visitingDate.toDateString(),
            timeOfVisit: visitingDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            timeOfDeparture: 'Not available yet',
            visitorUGStudentStatus: visitorUGStudentInputValue,
            visitorMobileNumber
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
        <div>

            <StudentTrackingNavBar staffID={ staffID } />

            <div style={{display: 'column', marginTop: '210px'}}>
            
        <Form className={ classes.addVisitorForm } onSubmit={ handleFormSubmit }>
            <Row className={ classes.formRow }>
                <Col>
                    <Form.Control type='text' placeholder='Visitor full name' required onChange={ updateVisitorFullName } value={ visitorFullName } />
                </Col>

                <Col>
                    <Form.Control type='text' placeholder='Index Number' required onChange={ updateVisitorIndexNumber } value={ visitorIndexNumber } disabled={ visitorUGStudentInputValue === 'Yes' || visitorUGStudentInputValue === ''  ? false : true } />
                </Col>
            </Row>

            <Row className={ classes.formRow }>
                <Col>
                    <Form.Control type='text' placeholder='Room of visit' required  onChange={ updateVisitingRoom } value={ visitingRoom } />
                </Col>

                <Col>
                     <Form.Control type='text' placeholder='Person being visited' required  onChange={ updateRoomMemberGettingVisited } value={ roomMemberGettingVisited } />
                </Col>
            </Row>

            <Row className={ classes.formRow }>
                <Col>
                <Autocomplete 
                            id='visitor student status'
                            options={ visitorStudentStatus }
                            getOptionLabel = { (option) => option.UGStudent }
                            renderInput = { (params) => (
                                <TextField {...params} required label='Is the visitor a UG student?' variant='filled' />
                            ) }
                            style={{width: 395}}
                            size='small'
                            value={ visitorUGStudentValue }
                            onChange={(event, newValue) => {
                                setVisitorUGStudentValue(newValue)
                            }}
                            inputValue={ visitorUGStudentInputValue }
                            onInputChange={(event, newInputValue) => {
                                setVisitorUGStudentInputValue(newInputValue)
                            }}
                                
                        />
                </Col>
                <Col>
                    <Form.Control type='text' placeholder='Mobile number' style={{ height: 50}} required onChange={ updateVisitorMobileNumber } value={ visitorMobileNumber } />
                </Col>
            </Row>


            { /* 
            <MuiPickersUtilsProvider utils={ DateFnsUtils } >
                <Row className={ classes.formRow }>
                    <Col>
                        <DatePicker 
                            disableToolbar
                            variant="inline"
                            required
                            format="MM / dd / yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select Date"
                            value={ selectedDateAndTime }
                            onChange={ updateDateAndTime }
                            //className={ classes.datePicker }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} /> 

                    </Col>

                    <Col>
                         <TimePicker 
                            margin="normal"
                            id="time-picker"
                            label="Pick Time"
                            required
                            value={ selectedDateAndTime }
                            onChange={ updateDateAndTime }
                            //className={ classes.timePicker }
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                    
                            /> 
                    
                    </Col>

                </Row>

            </MuiPickersUtilsProvider>

                        */ }


            <Row>
            { !visitorAddedComplete && <Col>
                     Saving visitor... Please wait
                </Col>
             }
            </Row>

            <Row className={ visitorAddedComplete? classes.secondaryButtons : classes.Buttons  }>
                <Col>
                    <Button type='submit' variant='primary' size='md' className={ classes.submitBtn }> Add Student </Button>{''}
                </Col>

                <Col>
                    <Button type='button' variant='primary' size='md' className={ classes.cancelBtn } onClick={ handleCancelBtnClick }> Cancel </Button>
                </Col>

            </Row>
            

            

        </Form>
        </div>


        </div>
    )
}
