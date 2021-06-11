import React from 'react'
import { useHistory } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import BookIcon from '@material-ui/icons/Book'
import PersonIcon from '@material-ui/icons/Person'


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




export default function StudentComplaintPersistentDrawer(props) {

    // destructuring props.
    const { handleLogout, user } = props 

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
                     
                    <div onClick={() => router.push('/studentcomplainthistory')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'View Complaint History'} />
                     </ListItem>
                     </div>

                    <div onClick={() => console.log(`current user = ${ user.email }`)}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <PersonIcon />
                         </ListItemIcon> 
                         <ListItemText primary={ `${user.email}`} />
                     </ListItem>
                     </div>
            

                    <div onClick={ handleLogout }>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Sign Out'} />
                     </ListItem>
                     </div>

                     
                     <hr />
                     <div onClick={() => router.push('/nssaccomodationfinder')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Looking for NSS accomodation? Click here'} />
                     </ListItem>
                     </div>

                 </List>
                 
            </Drawer>
            
        </div>
    )
}
