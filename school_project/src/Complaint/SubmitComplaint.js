import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Typography from '@material-ui/core/Typography'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import StudentComplaintPersistentDrawer from '../Drawers/StudentComplaintPersistentDrawer'
//import StudentComplaintSwipeabledrawer from '../Drawers/StudentComplaintSwipeableDrawer'



// for firebase.
import { projectFirestore } from '../firebaseSetup/firebaseConfig'


// for styling.
import { makeStyles } from '@material-ui/core/styles'
import './complaintFormBtns.css'




const useStyles = makeStyles( theme => ({
    headerTextDiv: {
        backgroundColor: '#01579b',
        color: 'white',
        width: '850px',
        height: '80px',
        /*borderRadius: '50%' */
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
    submitComplaintForm: {
        width:'790px',
        height: '520px',
        position: 'relative',
        top: '60px',
        left: '400px',
        /*boxShadow: '2px 2px 8px',
        borderRadius: '3%', */
        textAlign: 'center'
    },
    fullNameAndIndexNumberDiv: {
        position: 'relative',
        top: '10px'
    },
    fullNameTextField: {
        width: '300px',
        position: 'relative',
        right: '80px'
    },
    indexNumberTextField: {
        width: '300px',
        position: 'relative',
        left: '30px'
    },
    roomNumberAndMobileNumberDiv: {
        position: 'relative',
        top: '27px'
    },
    roomNumberTextField: {
        width: '300px',
        position: 'relative',
        right: '80px'
    },
    mobileNumberTextField: {
        width: '300px',
        position: 'relative',
        left: '30px'
    },
    complaintType: {
        position: 'relative',
        top: '50px',
        left: '15px'
    },
    specifyOtherComplaintTypeTextField: {
        width: '300px',
        position: 'relative',
        bottom: '47px',
        left: '167px'
    },
    complaintDescription: {
        position: 'relative',
        top: '87px',
        right: '20px'
    },
    secondaryComplaintDescription: {
        position: 'relative',
        top: '40px',
        right: '20px'
    },
    complaintDescriptionTextarea: {
        width: '710px'
    },
    secondaryComplaintDescriptionTextarea : {
        width: '710px'
    },
    dateAndTimePickerDiv: {
        position: 'relative',
        top: '90px'
    },
    datePicker: {
        position: 'relative',
        right: '110px'
    },
    timePicker: {
        position: 'relative',
        left: '78px'
    },
    formButtonsDiv: {
        position: 'relative',
        top: '110px'
    },
    secondaryDateAndTimePickerDiv: {
        position: 'relative',
        top: '45px'
    },
    secondaryFormButtonsDiv: {
        position: 'relative',
        top: '70px'
    },
    complaintStatusSpan: {
        position: 'relative',
        top: '155px'
    },
    secondarycomplaintStatusSpan: {
        position: 'relative',
        top: '100px'
    },
    studentEmailTextFieldDiv: {
        position: 'relative',
        top: '60px',
        right: '230px'
    },
    secondaryStudentEmailTextFieldDiv: {
        position: 'relative',
        top: '13px',
        right: '-13px',
        width: '240px'
    },
    studentEmailTextField: {
        width: '300px'
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
    const [ complaintType, setComplaintType ] = useState('Electrical')
    const [ complaintTypeInputValue, setComplaintTypeInputValue ] = useState('')

    // state for date and time
    const [ selectedDateAndTime, setSelectedDateAndTime ] = useState(new Date());


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
        alert('You are logging out')
        router.push('/signin')
    }





    
    return (
        <div>
            {
                user ? 
            
        <div style={{ display: 'flex' }}>
            
            <StudentComplaintPersistentDrawer handleLogout={ handleLogout } 
                                              user={ user }
            />

            <div style={{flex: 'column'}}>
            <div className={ classes.headerTextDiv }>
                <Typography  variant='h6' className={ classes.headerText} >
                    Submit A Complaint
                </Typography>
            </div>
        
        <div className={ classes.submitComplaintForm }>
            <form onSubmit={ handleFormSubmit }>
                <MuiPickersUtilsProvider utils={ DateFnsUtils }>

                 <div className={ classes.fullNameAndIndexNumberDiv}>
                        <TextField
                            variant='outlined'
                            label='Student Full Name'
                            required={ true }
                            className={ classes.fullNameTextField }
                            onChange={ handleStudentFullNameChange }
                            value={ studentFullName }
                        />

                        <TextField
                            variant='outlined'
                            label='Student Index Number'
                            required={ true }
                            className={ classes.indexNumberTextField }
                            onChange={ handleStudentIndexNumberChange }
                            value={ studentIndexNumber }

                        />

                 </div>

                 <div className={ classes.roomNumberAndMobileNumberDiv }>
                       <TextField
                            variant='outlined'
                            label='Room Number'
                            required={ true }
                            className={ classes.roomNumberTextField }
                            onChange={ handleRoomNumberChange }
                            value={ roomNumber }

                        />

                        <TextField
                            variant='outlined'
                            label='Mobile Number'
                            required={ true }
                            className={ classes.mobileNumberTextField }
                            onChange={ handleMobileNumberChange }
                            value={ mobileNumber }
                        />


                 </div>


                 <div className={ classes.complaintType }>
                        <Autocomplete 
                            id='complaint type autocomplete'
                            options={ complaintTypesArray }
                            getOptionLabel={ (option) => option.complaintType }
                            renderInput={ (params) => (
                                <TextField {...params} required={true} label='Complaint Type' variant='outlined' />
                            )}
                            style={{ width: 300 }}
                            className={ classes.complaintTypeAutocomplete }
                            size='small'
                            onChange={( event, newComplaint ) => {
                                setComplaintType(newComplaint)
                                console.log('value = ', complaintType )
                            }}
                            value={ complaintType }
                            onInputChange={( event, newInputValue ) => {
                                setComplaintTypeInputValue(newInputValue)
                                console.log('input change = ', complaintTypeInputValue)
                            }}
                            inputValue={ complaintTypeInputValue }
                        />


                        { specifyOtherComplaintType && <TextField
                                                         variant='outlined'
                                                         label='Please specify complaint type'
                                                         required={ true }
                                                         className={ classes.specifyOtherComplaintTypeTextField } 
                                                         onChange={ handleOtherComplaintTypeChange }
                                                         value={ otherComplaintType }  
                                                /> 
                        }
                 </div>


                 <div className={ specifyOtherComplaintType ? classes.secondaryStudentEmailTextFieldDiv : classes.studentEmailTextFieldDiv }>
                     <TextField 
                        variant='outlined'
                        label='Email'
                        type='email'
                        required={ true }
                        className={ classes.studentEmailTextField }
                        onChange={ handleStudentEmailChange }
                        value={ studentEmail }
                     />

                 </div>


                 <div className={ specifyOtherComplaintType? classes.secondaryComplaintDescription : classes.complaintDescription }>
                     <TextareaAutosize className={ specifyOtherComplaintType? classes.secondaryComplaintDescriptionTextarea : classes.complaintDescriptionTextarea }
                                       required={ true }
                                       placeholder='Complaint Description'
                                       rowsMin={ 3 }
                                       onChange={ handleComplaintDescriptionChange }
                                       value={ complaintDescription }
                     />
                 </div>


                 <div className={ specifyOtherComplaintType? classes.secondaryDateAndTimePickerDiv : classes.dateAndTimePickerDiv }>
                    <DatePicker 
                                disableToolbar
                                variant='inline'
                                required={ true }
                                format="MM / dd / yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select Date"
                                value={ selectedDateAndTime }
                                onChange={ updateSelectedDateAndTime }
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
                                onChange={ updateSelectedDateAndTime }
                                className={ classes.timePicker }
                                KeyboardButtonProps={{
                                  'aria-label': 'change time',
                                }}
                    
                              /> 
            
                </div>


                <div className={ specifyOtherComplaintType? classes.secondaryFormButtonsDiv : classes.formButtonsDiv}>
                <button type='submit' className='submitComplaintButton' > Submit Complaint </button>

                <button type='button' className='cancelButton' onClick={ handleCancelButtonClick }> Cancel </button>

                </div>

                
                { complaintSubmitting && <span className={ specifyOtherComplaintType? classes.secondarycomplaintStatusSpan : classes.complaintStatusSpan}> 
                     Submitting complaint....</span> }
                
                </MuiPickersUtilsProvider>
            </form>
            
            
        </div>
        </div>

        </div>

        : goToSignIn() }


        </div>
    )
    




}
