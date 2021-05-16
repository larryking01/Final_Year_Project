import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'


import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RoomIcon from '@material-ui/icons/Room'
import MaterialTable from 'material-table'


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
    }
}))




export default function MainPage() {

    // initializing styling
    const classes = useStyles()

    // for routing
    const router = useHistory()

    // handling state.
    const [ addedStudentsArray, setAddedStudentsArray ] = useState([])

    // the use effect to fetch all added students.
    useEffect(() => {
        projectFirestore.collection('Added Students Collection').onSnapshot(snapShot => {
            let temporaryArray = []
            snapShot.forEach(document => {
                temporaryArray.push({ id: document.id, ...document.data()})
            })
            setAddedStudentsArray(temporaryArray)
        })
        
    }, [ ])


    // setting up the columns of the table.
    const tableColumns = [
        { title: 'Index Number', field: 'indexNumber'},
        { title: 'First Name', field: 'firstName'},
        { title: 'Last Name', field: 'lastName'},
        { title: 'Sex', field: 'sexInputValue'},
        { title: 'Room Number', field: 'roomNumber'},
        { title: 'Course', field: 'course'},
        { title: 'Level', field: 'levelInputValue'},
        { title: 'Mobile Number', field: 'mobileNumber'}
    ]







    return (
        <div style={{ display: 'flex'}}>
            <Drawer variant='persistent'
                    anchor='left'
                    open={true}
                    style={{width: '220px'}}
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
                     <ListItem button className={classes.listItem} >
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

            <div style={{flexDirection: 'column', marginLeft: 100}}>
                <MaterialTable 
                    title='List Of Students'
                    data={ addedStudentsArray }
                    columns={ tableColumns } 
                />
            </div>
                
            
        </div>
    )
}
