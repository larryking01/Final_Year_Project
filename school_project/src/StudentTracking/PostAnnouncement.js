import React, { useState, useEffect } from 'react'
import { projectFirestore, timestamp } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
import PersistentDrawer from '../Drawers/PersistentDrawer'
//import SwipeableDrawer from '../Drawers/SwipeableDrawer'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { AiFillNotification } from 'react-icons/ai'




// setting up styling.
const useStyles = makeStyles( theme => ({
    parentContainer: {
        display: 'flex'
    },
    headerTextDiv: {
        backgroundColor: '#2E2A3B',
        color: 'white',
        width: '800px',
        height: '80px',
        //borderRadius: '50%'
        boxShadow: '2px 2px 8px grey',
        position: 'relative',
        top: '30px',
        left: '400px'
    },
    headerText: {
        position: 'relative',
        left: '260px',
        top: '20px'
    },
    postAnnouncementDiv: {
        height: '400px',
        position: 'relative',
        top: '130px',
        right: '320px',
        //boxShadow: '2px 2px 8px grey',
        borderRadius: '5%',
        alignItems: 'center'


    },
    postAnnouncementForm: {
        width: '550px'
        
    },
    announcementTitleTextField: {
        position: 'relative',
        left: '90px',
        top: '60px',
        width: '400px'
    },
    textareaAutosize: {
        position: 'relative',
        top:'100px',
        left: '90px',
        width: '400px'
    },
    postAnnouncementBtn: {
        position: 'relative',
        top: '140px',
        left: '90px',
        width: '180px',
        height: '40px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#2E2A3B',
        color: 'white'
    },
    cancelAnnouncementBtn: {
        position: 'relative',
        top: '140px',
        left: '140px',
        width: '180px',
        height: '40px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#2E2A3B',
        color: 'white'
    }



}))




export default function PostAnnouncement() {

    // initializing styling.
    const classes = useStyles()


    // handling state.
    const [ announcementTitle, setAnnouncementTitle ] = useState('')
    const [ announcementBody, setAnnouncementBody ] = useState('')


    // handling announcement title change
    const handleAnnouncementTitleChange = ( event ) => {
        setAnnouncementTitle( event.target.value )
    }


    // handling announcement body change.
    const handleAnnouncementBodyChange = ( event ) => {
        setAnnouncementBody( event.target.value )
    }



    // form submit.
    const formSubmit = ( event ) => {
        event.preventDefault()

        let announcementDate = new Date()
        
        // saving announcements to firebase.
        projectFirestore.collection('Posted Announcements').add({
            announcementTitle,
            announcementBody,
            datePosted: announcementDate.toDateString(),
            timePosted : announcementDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
        })
        .then( announcement => {
            // modal here later.
            alert(`announcement posted with id ${announcement.id}`)
            resetInputs()
        })
        .catch( error => {
            alert('failed to upload assignment due to error')
            console.log(`error = ${ error }`)
            resetInputs()
        })


        
    }


    // resetting all inputs.
    const resetInputs = ( ) => {
        setAnnouncementTitle('')
        setAnnouncementBody('')
    }










    return (
        <div className={ classes.parentContainer }>
            <PersistentDrawer />


            <div style={{ position: 'relative', top: '20' }}>
            <div className={ classes.headerTextDiv }>
                <Typography className={ classes.headerText } variant='h6' >
                    Post An Announcement <AiFillNotification style={{ paddingLeft: '10px', color: '#2E2A3B', paddingTop: '7px'}}/>
                </Typography>
            </div>

            </div>


            <div className={ classes.postAnnouncementDiv }>
                <form className={ classes.postAnnouncementForm } onSubmit={ formSubmit }>
                    <div>
                        <TextField 
                             className={ classes.announcementTitleTextField }
                             variant='outlined'
                             label='Announcement title'
                             required
                             onChange={ handleAnnouncementTitleChange }
                             value={ announcementTitle }
                        />



                    </div>

                    <div>
                        <TextareaAutosize  
                            variant='outlined'
                            label='Announcement Body'
                            required
                            className={ classes.textareaAutosize }
                            placeholder='Announcement Body'
                            rowsMin={ 8 }
                            rowsMax={ 9 }
                            onChange={ handleAnnouncementBodyChange }
                            value={ announcementBody }
                        />
                    </div>


                    
                        <button type='submit' className={ classes.postAnnouncementBtn }> Post Announcement </button>
                        <button type='button' onClick={ resetInputs } className={ classes.cancelAnnouncementBtn }> Cancel </button>

                  
                </form>
            </div>













           
        </div>
    )
}
