import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { projectFirestore, projectStorage } from '../firebaseSetup/firebaseConfig'
import './addStudentBtnStyles.css'
import { Form, Col, Row, Button } from 'react-bootstrap'
import StudentTrackingNavBar from '../Drawers/StudentTrackingNavBar'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'




// setting up styling.
const useStyles = makeStyles(theme => ({
    addStudentForm: {
        position: 'relative',
        left: '280px',
        width: '60vw'
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
    imageErrorMessage: {
        marginTop: '7px'
    },
    ButtonsRow: {
        marginTop: '-22px'
    },
    secondaryButtonsRow: {
        marginTop: '-35px'
    },
    addingStudentMessage: {
        marginTop: '13px',
        fontSize: '16px'
    }

}))





export default function AddNewStudent( props ) {

    // destructuring props.
    const { staffID } = props

    // handling state for each of the form components.
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ indexNumber, setIndexNumber ] = useState('')
    const [ roomNumber, setRoomNumber ] = useState('')
    const [ course, setCourse ] = useState('')
    const [ mobileNumber, setMobileNumber ] = useState('')
    const [ addStudentComplete, setAddStudentComplete ] = useState(true)



    
    // handling state for the uploaded student picture.
    const [ studentPicture, setStudentPicture ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ pictureUploadError, setPictureUploadError ] = useState(null)
    const [ imageUrl, setImageUrl ] = useState(null)
    const [ progress, setProgress ] = useState( 0 ) 

    let acceptedImageTypes = [ 'image/png', 'image/jpeg', 'image/jpg'] 

    const handlePictureSelected = ( event ) => {
        let selectedPicture = event.target.files[0]

        if( selectedPicture && acceptedImageTypes.includes(selectedPicture.type) ) {
            setError('')
            setStudentPicture( selectedPicture )
            //console.log(`selected picture = ${selectedPicture.data}`)

        } else {
            // modal may go here later.
            setStudentPicture(null)
            setError('Please select an image file (with a .png or .jpg extension)')
        }

    }

    

    // handling the state for the sex autocomplete component.
    const [ sexValue, setSexValue ] = useState('Male')
    const [ sexInputValue, setSexInputValue ] = useState('')


    // handling state for the level autocomplete component.
    const [ levelValue, setLevelValue ] = useState('100')
    const [ levelInputValue, setLevelInputValue ] = useState('')


    // updating state for the first name component.
    const handleFirstNameComponentState = ( event ) => {
        setFirstName(event.target.value)
    }

    // updating state for the last name component.
    const handleLastNameComponent = ( event ) => {
        setLastName(event.target.value)
    }

    // updating the index number component.
    const handleIndexNumberComponent = ( event ) => {
        setIndexNumber(event.target.value)
    }

    // updating room number component.
    const handleRoomNumberComponent = ( event ) => {
        setRoomNumber(event.target.value)
    }

    // resetting all components when cancel button is clicked.
    const handleCancelBtnClick = ( ) => {
        setFirstName('')
        setLastName('')
        setCourse('')
        setIndexNumber('')
        setRoomNumber('')
        setMobileNumber('')
        setSexInputValue('')
        setLevelInputValue('')
        setStudentPicture('')
        setStudentPicture(null)
    } 

    
    // updating the course component.
    const handleCourseComponent = ( event ) => {
        setCourse(event.target.value)
    }

    // updating the mobile number component.
    const handleMobileNumberComponent = ( event ) => {
        setMobileNumber(event.target.value)
    }


    // handling form submission.
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        setAddStudentComplete(false) 
        

            // the reference to the image file.
            let storageReference = projectStorage.ref()
            let uploadTask = storageReference.child(`Uploaded Student Pictures/${studentPicture.name}`).put(studentPicture)
            uploadTask.on('state_changed', ( snapshot ) => {
                let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
                setProgress(percentage)
            }, (err) => {
                setPictureUploadError(err)
                console.log(`failed to upload picture due to error: ${error}`)
            }, async () => {
                await uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                    setImageUrl(downloadUrl)
                    console.log(`progress = ${progress}`)
                    console.log(`image url = ${downloadUrl}`)
                    

                
        // initializing the firebase collection to store added students.
        if( imageUrl  ) {
        // the student to store in the database.
        let newStudent = {
            firstName: firstName[0].toUpperCase() + firstName.substring(1).trim(),
            lastName: lastName[0].toUpperCase() + lastName.substring(1).trim(),
            indexNumber: indexNumber.trim(),
            roomNumber: roomNumber.trim(),
            course: course[0].toUpperCase() + course.substring(1).trim(),
            mobileNumber: mobileNumber.trim(),
            sexInputValue,
            levelInputValue,
            imageUrl,
            checkInStatus : 'Checked In'
        }


        let addedStudentsCollection = projectFirestore.collection('Added Students Collection')
        // preventing the addition of duplicate records
        addedStudentsCollection.where('indexNumber', '==', indexNumber)
        .get().then( querySnapshot => {
            if(querySnapshot.empty) {
                addedStudentsCollection.add( newStudent ).then(doc => {
                    console.log(`document added with id ${doc.id} `)
                    setAddStudentComplete(true)
                    alert('Student Added Successfully') 
                    //the dialog.
                    //showConfirmationDialog()

                    //resetting all components.
                    handleCancelBtnClick()
                })
                .catch(error => {
                    console.log(`failed to add student due to error: ${error}`)
                })
                    }
            else {
                // modal goes here later.
                alert(`Failed to add student. Student with the id ${indexNumber} already exists`)
            }
        })
        .catch( error => {
            // modal here later
            alert('failed to add student due to error')
            console.log(`failed to add student due to error: ${error}`)
        })
       } 
       else {
        // modal here later
           alert('Student picture took too long to upload. This is most likely due to slow internet connection. \nClick Add Student again to complete the process.')
           //showConfirmationDialog()
       }
        
        }) 

    })

    }

          
    // initializing styling
    const classes = useStyles()

    // for routing
    const router = useHistory()

    // the array to hold the sex values.
    let sexValuesArray = [
        { gender: 'Male' },
        { gender: 'Female'}
    ]

    // the array to hold the values of the level.
    let levelValuesArray = [
        { level: '100' },
        { level: '200'},
        { level: '300'},
        { level: '400'}
    ]
    

    return (
        <div>

            <StudentTrackingNavBar staffID={ staffID } />

            <div style={{flex: 'column', marginTop: '140px'}}>
          
            
            {/* the form for adding a new student */}
            <div >
                {
                    /*
                
                    {/* the level and sex div 
                    <div className={classes.levelAndSexDiv}>
                        <Autocomplete 
                            id='sex autocomplete'
                            options={ sexValuesArray }
                            getOptionLabel = { (option) => option.gender }
                            renderInput = { (params) => (
                                <TextField {...params} required={true} label='Sex' variant='filled' />
                            ) }
                            style={{width: 300}}
                            className={classes.sexAutocomplete}
                            size='small'
                            value={ sexValue }
                            onChange={(event, newValue) => {
                                setSexValue(newValue)
                            }}
                            inputValue={ sexInputValue }
                            onInputChange={(event, newInputValue) => {
                                setSexInputValue(newInputValue)
                            }}
                            
                                
                        />

                        <Autocomplete 
                            id='level autocomplete'
                            options={ levelValuesArray }
                            getOptionLabel={ (option) => option.level }
                            renderInput={ (params) => (
                                <TextField {...params} required={true} label='Level' variant='filled' />
                            )}
                            style={{width: 300}}
                            className={classes.levelAutocomplete}
                            size='small'
                            value={ levelValue }
                            onChange={(event, newValue) => {
                                setLevelValue(newValue)
                            }}
                            inputValue={ levelInputValue }
                            onInputChange={(event, newInputValue) => {
                                setLevelInputValue(newInputValue)
                            }}
                              
                        />

                    </div>

                   

                    {/* the upload picture div 
                    
                   
                        
                 
                </form>

                    */ }

                <Form className={ classes.addStudentForm } onSubmit={ handleFormSubmit }>
                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' required placeholder='Student First Name' onChange={ handleFirstNameComponentState } value={ firstName } />
                        </Col>

                        <Col>
                            <Form.Control type='text' required placeholder='Student Last Name' onChange={ handleLastNameComponent } value={ lastName } />
                        </Col>
                    </Row>

                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' required placeholder='Index Number' onChange={ handleIndexNumberComponent } value={ indexNumber } />
                        </Col>

                        <Col>
                            <Form.Control type='text' required placeholder='Room Number' onChange={ handleRoomNumberComponent }  value={ roomNumber } />
                        </Col>
                    </Row>

                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' required placeholder='Gender Combobox'  />
                        </Col>

                        <Col>
                            <Form.Control type='text' required placeholder='Level Combobox' />
                        </Col>
                    </Row>

                    <Row className={ classes.formRow }>
                        <Col>
                            <Form.Control type='text' required placeholder='Course' onChange={ handleCourseComponent } value={ course } />
                        </Col>

                        <Col>
                            <Form.Control type='text' required placeholder='Mobile Number' onChange={ handleMobileNumberComponent } value={ mobileNumber } />
                        </Col>
                    </Row>

                    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                    <Row className={ classes.fileRow }>
                        <Col>
                            <Form.File name='Upload student picture' onChange={ handlePictureSelected } required />
                        </Col>
                    </Row>

                    <Row className={ classes.imageErrorMessage }>
                        { error && <Col> { error } </Col> } 
                    </Row>

                    <Row>
                        <Col>
                            <DatePicker 
                                 disableToolbar
                                 variant="inline"
                                 required
                                 format="MM / dd / yyyy"
                                 margin="normal"
                                 id="date-picker-inline"
                                 label="Select Date"
                                 //value={ selectedDateAndTime }
                                 //onChange={ updateDateAndTime }
                                 //className={ classes.datePicker }
                                 KeyboardButtonProps={{
                                  'aria-label': 'change date'
                                
                                 }} /> 
                        </Col>

                    </Row>
                    </MuiPickersUtilsProvider>


                    

                    <Row className={ error? classes.secondaryButtonsRow : classes.ButtonsRow }>
                        <Col>
                            <Button type='submit' variant='primary' size='md' className={ classes.submitBtn }> Add Student </Button>
                        </Col>

                        <Col>
                            <Button type='button' variant='primary' size='md' className={ classes.cancelBtn } onClick={ handleCancelBtnClick }> Cancel </Button>
                        </Col>
                    </Row>

                    <Row className={ classes.addingStudentMessage }>
                          { !addStudentComplete && <Col> Adding student... </Col>}
                    </Row>









                </Form>








                
                
            </div>
            </div>

        </div>
    )
}
