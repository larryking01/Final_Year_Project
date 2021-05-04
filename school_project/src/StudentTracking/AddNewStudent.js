import React from 'react'
import { useHistory, Link } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, 
         Typography, TextField, Button } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RoomIcon from '@material-ui/icons/Room'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'


// setting up styling.
const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: 'inherit',
        opacity: 1,
        color: 'white',
        backgroundColor: '#2E2A3B'
    },
    listItem: {
        '&:hover': {
            backgroundColor: '#13131A'
        }
    }, 
    listItemIcon: {
        color: 'white'
    },
    addNewStudentForm: {
        width:'790px',
        height: '530px',
        position: 'relative',
        top: '20px',
        left: '60px',
        boxShadow: '2px 2px 8px',
        borderRadius: '3%'
        
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
        right: '90px'
    },
    lastNameTextField: {
        position: 'relative',
        left: '40px'
    },
    idNumberAndRoomNumberDiv: {
        marginTop: '30px'
    },
    levelAndSexDiv: {
        marginTop: '30px'
    },
    courseAndMobileNumberDiv: {
        marginTop: '30px'
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
    }
}))





export default function AddNewStudent() {

    // initializing styling
    const classes = useStyles()

    // for routing
    const router = useHistory()


    return (
        <div style={{display: 'flex'}}>
            <Drawer variant='persistent'
                    anchor='left'
                    open={true}
                    style={{width: '200px'}}
                    classes={{paper: classes.drawerPaper }}
             >
                 <List>
                     <div onClick={() => router.push('/viewallstudents')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                             <PersonIcon />
                         </ListItemIcon>
                         <ListItemText primary={'View all students'} />
                     </ListItem>
                     </div>
                     
                    <div onClick={() => router.push('/addnewstudent')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <PersonAddIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Add new student'} />
                     </ListItem>
                     </div>

                    <div onClick={() => router.push('/editstudentdetails')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <EditIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Edit student details'} />
                     </ListItem>
                     </div>

                    <div onClick={() => router.push('/deletestudent')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <DeleteIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Delete student'} />
                     </ListItem>
                     </div>
                     <hr />

                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <RoomIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Looking for NSS accomodation? Click here'} />
                     </ListItem>

                 </List>
            </Drawer>



            {/* the form for adding a new student */}
            <div className={classes.addNewStudentForm}>
                <form onSubmit={() => {}} className={classes.actualForm}>
                    <Typography variant='h14'>
                        Enter the details of the student and click Add.
                    </Typography>

                    {/* the first name and last name div */}
                    <div className={classes.firstNameLastNameDiv}>
                       <TextField 
                          variant='outlined'
                          label='First Name'
                          required={ true }
                          className={classes.firstNameTextField}
                       />

                       <TextField 
                        variant='outlined'
                        label='Last Name'
                        required={ true }
                        className={classes.lastNameTextField}
                       />

                    </div>

                    {/* the id number and room number div */}
                    <div className={classes.idNumberAndRoomNumberDiv}>
                       <TextField 
                          variant='outlined'
                          label='Index Number'
                          required={ true }
                          className={classes.firstNameTextField}
                       />

                        <TextField 
                          variant='outlined'
                          label='Room Number'
                          required={ true }
                          className={classes.lastNameTextField}
                       />

                       

                    </div>

                    {/* the level and sex div */}
                    <div className={classes.levelAndSexDiv}>
                       <TextField 
                          variant='outlined'
                          label='Level'
                          required={ true }
                          className={classes.firstNameTextField}
                       />

                        <TextField 
                          variant='outlined'
                          label='Sex'
                          required={ true }
                          className={classes.lastNameTextField}
                       />

                    </div>

                    {/* the course and mobile number div */}
                    <div className={classes.courseAndMobileNumberDiv}>
                       <TextField 
                          variant='outlined'
                          label='Course'
                          required={ true }
                          className={classes.firstNameTextField}
                       />

                       <TextField 
                        variant='outlined'
                        label='Mobile Number'
                        required={ true }
                        className={classes.lastNameTextField}
                       />

                    </div>

                    {/* the upload picture div */}
                    <div className={classes.pictureDiv}>
                        <input type='file' />
                        <div className={classes.uploadPictureText}>
                        <Typography variant='h9'>
                            Upload student picture.
                        </Typography>
                        </div>
                    </div>


                    { /* the div for the button to add the student to database */}
                        <Button 
                            className={classes.addStudentButton}
                            variant='contained'
                            size='medium'
                            color='primary'
                            startIcon={ <SaveIcon /> }
                            onClick={() => {}}
                        >
                            Add Student
                        </Button>
                   

                    { /* the cancel button  */}
                        <Button
                            className={classes.cancelAddStudentButton}
                            variant='contained'
                            size='medium'
                            color='primary'
                            startIcon={ <CancelIcon /> }
                            onClick={() => {}}
                        
                        >
                            Cancel
                        </Button>
                 
                </form>
                
            </div>

        </div>
    )
}
