import React from 'react'
import { useHistory } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
//import DeleteIcon from '@material-ui/icons/Delete'
import BookIcon from '@material-ui/icons/Book'
import { AiFillNotification } from 'react-icons/ai'
import { HiUserGroup } from 'react-icons/hi'
import { AiOutlineHome } from 'react-icons/ai'





// setting up styling.
const useStyles = makeStyles(theme => ({
    paper: {
        width: 280,
        opacity: 1,
        color: 'white',
        backgroundColor: '#2E2A3B'
    },
    listItem: {
        height: '60px',
        '&:hover': {
            backgroundColor: '#13131A'
        }
    }, 
    listItemIcon: {
        color: 'white'
    }
}))




export default function PersistentDrawer() {

     // initializing styling
     const classes = useStyles()

     // for routing
     const router = useHistory()
 
    return (
        <div>
            <Drawer variant='persistent'
                    anchor='left'
                    open={true}
                    //style={{width: '280px'}}
                    //classes={{paper: classes.paper }}
             >
                 <div className={ classes.paper }>
                 <List>
                     <div onClick={() => router.push('/viewallstudents')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                             <HiUserGroup size={ 30 } />
                         </ListItemIcon>
                         <ListItemText primary={'View all students'} />
                     </ListItem>
                     </div>
                     <hr />
                     
                    <div onClick={() => router.push('/addnewstudent')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <PersonAddIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Add new student'} />
                     </ListItem>
                     </div>
                     <hr />

                    <div onClick={() => router.push('/newvisitor')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <PersonAddIcon />
                         </ListItemIcon>
                         <ListItemText primary={'New Visitor'} />
                     </ListItem>
                     </div>
                     <hr />

                    <div onClick={() => router.push('/managevisitors')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <PersonIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Manage Visitors'} />
                     </ListItem>
                     </div>
                     <hr />

                     <div onClick={() => router.push('/viewallcomplaints')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'View All Complaints'} />
                     </ListItem>
                     </div>
                     <hr />

                     <div onClick={() => router.push('/postannouncement')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <AiFillNotification size={ 25 } />
                         </ListItemIcon>
                         <ListItemText primary={'Post An Announcement'} />
                     </ListItem>
                     </div>
                     <hr />

                     <div onClick={() => router.push('/manageannouncements')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <AiFillNotification size={ 25 } />
                         </ListItemIcon>
                         <ListItemText primary={'Manage Announcements'} />
                     </ListItem>
                     </div>
                     <hr />

                     

                    <div onClick={() => router.push('/nssaccomodationfinder')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <AiOutlineHome size={ 30 } />
                         </ListItemIcon>
                         <ListItemText primary={'Looking for NSS accomodation? Click here'} />
                     </ListItem>
                    </div>

                 </List>
                 </div>
                 
            </Drawer>
            
        </div>
    )
}
