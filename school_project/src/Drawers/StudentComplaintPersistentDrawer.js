import React from 'react'
import { useHistory } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import BookIcon from '@material-ui/icons/Book'


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




export default function StudentComplaintPersistentDrawer() {

     // initializing styling
     const classes = useStyles()

     // for routing
     const router = useHistory()
 
    return (
        <div>
            <Drawer variant='persistent'
                    anchor='left'
                    open={true}
                    style={{width: '220px'}}
                    classes={{paper: classes.drawerPaper }}
             >
                 <List>
                     <div onClick={() => router.push('/submitcomplaint')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                             <EditIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Submit a complaint'} />
                     </ListItem>
                     </div>
                     
                    <div onClick={() => router.push('/viewallcomplaints')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'View Complaint History'} />
                     </ListItem>
                     </div>

                    <div>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <EditIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Email Here'} />
                     </ListItem>
                     </div>
            

                    <div onClick={() => router.push('/submitcomplaint')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Sign Out'} />
                     </ListItem>
                     </div>

                     
                     <hr />
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Looking for NSS accomodation? Click here'} />
                     </ListItem>

                 </List>
                 
            </Drawer>
            
        </div>
    )
}
