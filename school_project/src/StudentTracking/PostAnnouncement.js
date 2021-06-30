import React, { useState, useEffect } from 'react'
import { projectFirestore, timestamp } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
import StudentTrackingNavBar from '../Drawers/StudentTrackingNavBar'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

//import { AiFillNotification } from 'react-icons/ai'




// setting up styling.
const useStyles = makeStyles( theme => ({

    addVisitorForm: {
        position: 'relative',
        left: '280px',
        width: '60vw'
    },
    announcementTitle: {
        marginBottom: '40px',
    },
    announcementBody: {
        marginBottom: '20px',
    },
    postAnnouncementsColumn: {
        marginTop: '32px'
    },
    cancelAnnouncementsColumn: {
        marginTop: '32px',
        paddingLeft: '30px',
        position: 'relative',
        left: '70px'
        
    },
    postBtn: {
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
    buttonsRow: {
        marginTop:'-40px'
    },
    textArea: {
        resize: 'none'
    }
   
}))




export default function PostAnnouncement( props ) {

    // destructuring props.
    const { staffID } = props

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
        <div style={{display: 'flex', marginTop: '160px'}}>

            <StudentTrackingNavBar staffID={ staffID } />

            <Fade top>
            <Form className={ classes.addVisitorForm } onSubmit={ formSubmit } >
                <Row className={ classes.announcementTitle }>
                    <Col>
                        <Form.Control type='text' placeholder='Announcement Title' required onChange={ handleAnnouncementTitleChange }  value={ announcementTitle } />
                    
                    </Col>
                </Row>

                <Row className={ classes.announcementBody }>
                    <Col>
                        <Form.Control as='textarea' placeholder='Announcement Body' rows={ 11 } required className={ classes.textArea } onChange={ handleAnnouncementBodyChange }  value={ announcementBody } />
                    </Col>

                </Row>

                <Row className={ classes.buttonsRow}>
                    <Col>
                        <Button type='submit' className={ classes.postBtn }> Post Announcement </Button>
                    </Col>

                    <Col>
                        <Button type='button' className={ classes.cancelBtn } onClick={ resetInputs }> Cancel </Button>
                    </Col>

                </Row>

            </Form>
            </Fade>


           













           
        </div>
    )
}
