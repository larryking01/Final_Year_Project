import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import StudentComplaintNavBar from '../Drawers/StudentComplaintNavBar'
import { Form, Col, Row, FormControl, Button } from 'react-bootstrap'
import Rotate from 'react-reveal/Rotate'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'




// for firebase.
import { projectFirestore } from '../firebaseSetup/firebaseConfig'


// for styling.
import { makeStyles } from '@material-ui/core/styles'
import './complaintFormBtns.css'




const useStyles = makeStyles( theme => ({
    formWrapper: {
        width: '80vw',
        height: '600px',
        marginLeft: '120px',
        boxShadow: '2px 4px 8px grey'
    },
    complaintForm: {
        position: 'relative',
        left: '280px',
        width: '60vw'
    },
    formRow: {
        marginBottom: '30px'
    },
    datePicker: {
        marginLeft: '140px',
        marginTop: '-5px'
    },
    timePicker: {
        marginLeft: '100px',
        marginTop: '-5px'
    },
    submitBtn: {
        width: '230px',
        marginTop: '-8px',
        marginLeft: '90px',
        paddingLeft: '50px'
    },
    cancelBtn: {
        width: '230px',
        marginTop: '-8px',
        marginLeft: '100px',
        paddingLeft: '90px'
    },
    textArea: {
        resize: 'none'
    }


}))





export default function SubmitComplaint(props) {

    // destructuring props.
    const { handleLogout, user } = props 

    // initializing styling
    const classes = useStyles()


    // initializing routing
    const router = useHistory()


    // handling state.
    const [ specifyOtherComplaintType, setSpecifyOtherComplaintType ] = useState(false)
    const [ otherComplaintType, setOtherComplaintType ] = useState('')

    // the autocomplete.
    //const [ complaintType, setComplaintType ] = useState('Electrical')
    const [ complaintTypeInputValue, setComplaintTypeInputValue ] = useState('')


    const [ selectedDateAndTime, setSelectedDateAndTime ] = useState(new Date());

    const updateDateAndTime = ( date ) => {
        setSelectedDateAndTime( date )
    }


    // the remaining components.
    const [ studentFullName, setStudentFullName ] = useState('')
    const [ studentIndexNumber, setStudentIndexNumber ] = useState('')
    const [ roomNumber, setRoomNumber ] = useState('')
    const [ mobileNumber, setMobileNumber ] = useState('')
    const [ complaintDescription, setComplaintDescription ] = useState('')
    const [ complaintSubmitting, setComplaintSubmitting ] = useState( false )
    const [ studentEmail, setStudentEmail ] = useState('')


    // the onChange handlers.
    const handleStudentFullNameChange = ( event ) => {
        setStudentFullName( event.target.value )
    }

    const handleStudentIndexNumberChange = ( event ) => {
        setStudentIndexNumber( event.target.value )
    }

    const handleRoomNumberChange = ( event ) => {
        setRoomNumber( event.target.value )
    }

    const handleMobileNumberChange = ( event ) => {
        setMobileNumber( event.target.value )
    }

    const handleComplaintTypeChange = ( event ) => {
        setComplaintTypeInputValue( event.target.value )
    }

    const handleComplaintDescriptionChange = ( event ) => {
        setComplaintDescription( event.target.value )
    }

    const updateSelectedDateAndTime = ( date ) => {
        setSelectedDateAndTime( date )
    }

    const handleOtherComplaintTypeChange = ( event ) => {
        setOtherComplaintType( event.target.value )
    }

    const handleStudentEmailChange = ( event ) => {
        setStudentEmail( event.target.value )
    }




    // handling cancel Btn click.
    const handleCancelButtonClick = ( event ) => {
        setStudentFullName('')
        setStudentIndexNumber('')
        setRoomNumber('')
        setMobileNumber('')
        setComplaintTypeInputValue('')
        setOtherComplaintType('')
        setComplaintDescription('')
        setStudentEmail('')

    }


    // submitting the form.
    const handleFormSubmit = ( event ) => {
        event.preventDefault()

        setComplaintSubmitting( true )
        console.log(`full name = ${studentFullName}`)
        console.log(`index number = ${studentIndexNumber}`)
        console.log(`room number = ${roomNumber}`)
        console.log(`mobile number = ${mobileNumber}`)
        console.log(`complaint type = ${specifyOtherComplaintType ? otherComplaintType : complaintTypeInputValue}`)
        console.log(`complaint description = ${complaintDescription.trim()}`)
        console.log(`other complaint type = ${otherComplaintType}`)
        console.log(` date = ${selectedDateAndTime.toDateString()}`)
        console.log(`time = ${ selectedDateAndTime.toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}`)
        console.log(`student email = ${studentEmail}`)


        // saving the complaint details into the firestore database.
        let complaintSubmitted = {
            studentFullName,
            studentIndexNumber : studentIndexNumber.trim(),
            roomNumber : roomNumber.trim(),
            mobileNumber : mobileNumber.trim(),
            complaintTypeInputValue : specifyOtherComplaintType ? otherComplaintType : complaintTypeInputValue,
            complaintDescription : complaintDescription.trim(),
            date: selectedDateAndTime.toDateString(),
            time: selectedDateAndTime.toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            complaintStatus : 'Pending',
            studentEmail
        }

        
        // making sure the sign in email matches entered email before complaint is submitted.

        if ( user.email === studentEmail ) {
            projectFirestore.collection('Submitted Complaints Collection').add(complaintSubmitted)
            .then(doc => {
                console.log(`complaint submitted with id ${ doc.id }`)
                // modal here later.
                alert(`complaint submitted`)
                setComplaintSubmitting( false )
                handleCancelButtonClick()
            })
            .catch(error => {
                // modal here later
                alert('failed to submit complaint due to error ', error)
                setComplaintSubmitting( false )
            })

        }
        else {
            // modal goes here later.
            alert(`You need to enter the same email you used to sign in before you can submit your complaint, ${user.email}`)
        }
    
    }


    // specifying the possible types of complaints
    let complaintTypesArray = [
        { complaintType: 'Electrical' },
        { complaintType: 'Carpentry' },
        { complaintType: 'Plumbing' },
        { complaintType: 'Other' }
    ]



    // useEffect to determine if Other is selected as complaint type.
    useEffect(() => {
        if( complaintTypeInputValue === 'Other'){
            setSpecifyOtherComplaintType(true)
            //console.log( specifyOtherComplaintType )
        } else {
            setSpecifyOtherComplaintType(false)
            setOtherComplaintType('')
        }
    }, [ complaintTypeInputValue ]) 

    

    
    // function to push sign in.
    const goToSignIn = () => {
        // modal here later.
        //alert('You are logging out')
        router.push('/studentsignin')
    }





    
    return (
        <div>
            {
                user ? 
            
        <div>
            
            <StudentComplaintNavBar user={ user } handleLogout={ handleLogout } />

            <div style={{ marginTop: '140px'}}>
                <div>
                <Fade top>
                <Form className={ classes.complaintForm } onSubmit={ handleFormSubmit } >
                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' placeholder='Student full name' required onChange={ handleStudentFullNameChange } value={ studentFullName } />
                        </Col>
                        <Col>
                             <Form.Control type='text' placeholder='Student index number' required onChange={ handleStudentIndexNumberChange } value={ studentIndexNumber } />
                        </Col>
                    </Row>

                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' placeholder='Room number' required onChange={ handleRoomNumberChange }  value={ roomNumber } />
                        </Col>
                        <Col>
                             <Form.Control type='text' placeholder='Mobile number' required onChange={ handleMobileNumberChange } value={ mobileNumber } />
                        </Col>
                    </Row>

                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' placeholder='Complaint type' onChange={ handleComplaintTypeChange } required value={ complaintTypeInputValue } />
                        </Col>
                        <Col>
                             <Form.Control type='email' placeholder='Email' required onChange={ handleStudentEmailChange }  value={ studentEmail } />
                        </Col>
                    </Row>

                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' placeholder='Specify other complaint type' required onChange={ handleOtherComplaintTypeChange }  value={ otherComplaintType } />
                        </Col>
                    </Row>

                    <Row className={ classes.formRow }>
                        <Col>
                            <FormControl as='textarea' placeholder='Complaint description' rows={ 3 } required  onChange={ handleComplaintDescriptionChange }  value={ complaintDescription } className={ classes.textArea } />
                        </Col>
                    </Row>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                        className={ classes.datePicker }
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
                            className={ classes.timePicker }
                                KeyboardButtonProps={{
                                  'aria-label': 'change time',
                                }}
                        /> 
                        </Col>
                    </Row>
                </MuiPickersUtilsProvider>

                <Row>
                    <Col>
                        <Button type='submit' variant='primary' size='md' className={ classes.submitBtn }> Submit Complaint </Button>{' '}
                    </Col>
                    <Col>
                        <Button type='button' variant='primary' size='md' className={ classes.cancelBtn } onClick={ handleCancelButtonClick }> Cancel </Button>
                    </Col>
                </Row>
            


                </Form>
                </Fade>
                </div>
            
    
        </div>

        </div>

        : goToSignIn() }


        </div>
    )
    




}
