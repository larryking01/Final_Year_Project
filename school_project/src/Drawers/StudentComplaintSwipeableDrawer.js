import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'


// styling
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import BookIcon from '@material-ui/icons/Book'
import { IoIosLogOut } from 'react-icons/io'
//import { AiFillHome } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai'





// setting up styling.
const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: '210',
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




export default function StudentComplaintSwipeabledrawer(props) {

    // destructuring props
    const { handleLogout, user } = props

    // handling state.
    const [ open, setOpen ] = useState(false)

    // initializing styling.
    const classes = useStyles()

    // routing
    const router = useHistory()


    return (
       <div>
           <IconButton 
                edge='end'
                color='red'
                aria-label='Open drawer'
                onClick={ () => setOpen(true)}
                style={{color: 'white'}}
                
           >
              <div onClick={() => setOpen(true)}>
                <MenuIcon> </MenuIcon>
              </div>
               
           </IconButton>
        

           <SwipeableDrawer
                anchor='left'
                open={ open }
                onOpen={ () => {} }
                onClose={ () => setOpen(false)}
           >
               <div className={classes.drawerPaper}>
                   <Box textAlign='center' p={2}>
                        Navigation
                   </Box>
                   <Divider />
                   <hr />


                   <List>
                   <div onClick={() => router.push('/submitcomplaint')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                             <EditIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Submit a complaint'} />
                     </ListItem>
                     </div>


                     <div onClick={() => router.push('/studentcomplainthistory') }>
                     <ListItem button className={classes.listItem} >
                         <ListItemIcon className={classes.listItemIcon}>
                                <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary={'View complaint history'} />
                     </ListItem>
                     </div>

                     
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <AiOutlineMail size={ 30 } />
                         </ListItemIcon>
                         <ListItemText primary={user.email} />
                     </ListItem>
                    

                     <div onClick={() => handleLogout }>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <IoIosLogOut size={ 30 } />
                         </ListItemIcon>
                         <ListItemText primary={'Sign out'} />
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

           </SwipeableDrawer>

       </div>
           
    )
}
