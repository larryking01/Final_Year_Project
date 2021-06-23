import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { projectFirestore, projectStorage } from '../firebaseSetup/firebaseConfig'
import './addStudentBtnStyles.css'
import PersistentDrawer from '../Drawers/PersistentDrawer'
//import SwipeableDrawer from '../Drawers/SwipeableDrawer'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'



// the dialog.
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'




// setting up styling.
const useStyles = makeStyles(theme => ({

    headerTextDiv: {
        backgroundColor: '#2E2A3B',
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
    addNewStudentForm: {
        width:'850px',
        height: '540px',
        position: 'relative',
        top: '40px',
        left: '400px',
        /*boxShadow: '2px 2px 8px',
        borderRadius: '3%' */
        
    },
    actualForm: {
        textAlign: 'center',
        marginTop: '10px'
    },
    firstNameLastNameDiv: {
        marginTop: '15px'
    },
    firstNameTextField: {
        position: 'relative',
        right: '90px',
        width: '300px'
    },
    lastNameTextField: {
        position: 'relative',
        left: '40px',
        width: '300px'
    },
    idNumberAndRoomNumberDiv: {
        marginTop: '30px'
    },
    levelAndSexDiv: {
        marginTop: '30px'
    },
    courseAndMobileNumberDiv: {
        marginTop: '-10px'
    },
    pictureDiv: {
        position: 'relative',
        top: '20px',
        right: '170px'
    },
    addStudentButton: {
        width: '200px',
        position: 'relative',
        top: '55px'
    },
    cancelAddStudentButton: {
        width: '200px',
        position: 'relative',
        top: '55px',
        marginLeft: '30px'
    },
    uploadPictureText: {
        position: 'relative',
        right: '12px',
        top: '5px'
    },
    sexAutocomplete: {
        position: 'relative',
        left: '35px'
        
    },
    levelAutocomplete: {
        position: 'relative',
        left: '462px',
        bottom: '50px'
        
    },
    errorSpan: {
        color: 'red',
        position: 'relative',
        left: '70px',
        top: '5px',
        fontSize: '13px'
    }
}))





export default function AddNewStudent() {

    // handling state for each of the form components.
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ indexNumber, setIndexNumber ] = useState('')
    const [ roomNumber, setRoomNumber ] = useState('')
    const [ course, setCourse ] = useState('')
    const [ mobileNumber, setMobileNumber ] = useState('')
    const [ addStudentComplete, setAddStudentComplete ] = useState(true)


    // handling state for the dialog.
    const [ open, setOpen ] = useState( false )

    const handleDialogOpen = () => {
        setOpen(true)
    }

    const handleDialogClose = () => {
        setOpen(false)
    }


    // function to return the dialog.
    const showConfirmationDialog = () => {
        setOpen(true)
        console.log(`open = ${open}`)
        console.log('show confirmation dialog executing')
        return(
            <Dialog open={ open } onClose={ handleDialogClose }>
                <DialogTitle> Confirmation Message </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Student added successfully !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>
                        OK
                    </Button>
                </DialogActions>

            </Dialog>
        )
        
    }



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
        setOpen( true )

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
        <div style={{display: 'flex'}}>

            <PersistentDrawer />

            <div style={{flex: 'column'}}>
            <div className={ classes.headerTextDiv }>
                <Typography  variant='h6' className={ classes.headerText} >
                    Add a new student
                </Typography>
            </div>
            
            {/* the form for adding a new student */}
            <div className={classes.addNewStudentForm}>
                <form onSubmit={ handleFormSubmit } className={classes.actualForm}>
                    <Typography variant='h14'>
                        Enter the details of the student.
                    </Typography>

                    {/* the first name and last name div */}
                    <div className={classes.firstNameLastNameDiv}>
                       <TextField 
                          variant='outlined'
                          label='First Name'
                          required={ true }
                          className={classes.firstNameTextField}
                          onChange={ handleFirstNameComponentState }
                          value={ firstName }
                       />

                       <TextField 
                        variant='outlined'
                        label='Last Name'
                        required={ true }
                        className={classes.lastNameTextField}
                        onChange={ handleLastNameComponent } 
                        value={ lastName }
                       />

                    </div>

                    {/* the id number and room number div */}
                    <div className={classes.idNumberAndRoomNumberDiv}>
                       <TextField 
                          variant='outlined'
                          label='Index Number'
                          required={ true }
                          className={classes.firstNameTextField}
                          onChange={ handleIndexNumberComponent }
                          value={ indexNumber }
                       />

                        <TextField 
                          variant='outlined'
                          label='Room Number'
                          required={ true }
                          className={classes.lastNameTextField}
                          onChange={ handleRoomNumberComponent }
                          value={ roomNumber }
                       />
                       
                    </div>

                    {/* the level and sex div */}
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

                    {/* the course and mobile number div */}
                    <div className={classes.courseAndMobileNumberDiv}>
                       <TextField 
                          variant='outlined'
                          label='Course'
                          required={ true }
                          className={classes.firstNameTextField}
                          onChange={ handleCourseComponent }
                          value={ course }
                       />

                       <TextField 
                        variant='outlined'
                        label='Mobile Number'
                        required={ true }
                        className={classes.lastNameTextField}
                        onChange={ handleMobileNumberComponent }
                        value={ mobileNumber }
                       />

                    </div>

                    {/* the upload picture div */}
                    <div className={classes.pictureDiv}>
                        <input type='file' onChange={ handlePictureSelected } required={ true } style={{ position: 'relative', right: '100px' }} />
                        <div className={classes.uploadPictureText}>
                        <Typography variant='h9' >
                            Upload student picture.
                        </Typography>
                        </div>
                        { error && <span className={classes.errorSpan}> { error } </span> } 
                        { !addStudentComplete && <span> Adding student... </span>}
                        
                    </div>


                    <div className='actionButtonsDiv'>
                        <button type='submit' className='addStudentBtn'> Add student  </button>

                        <button type='button' className='cancelAddStudentBtn' onClick={ handleCancelBtnClick }>
                             Cancel  
                        </button>
                    </div>
                        
                 
                </form>
                
            </div>
            </div>

        </div>
    )
}
