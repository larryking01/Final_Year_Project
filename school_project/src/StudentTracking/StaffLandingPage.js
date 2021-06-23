import React, { useState, useEffect } from 'react'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
import PersistentDrawer from '../Drawers/PersistentDrawer'
//import SwipeableDrawer from '../Drawers/SwipeableDrawer'
import Typography from '@material-ui/core/Typography'



// icons
import { BsPeopleFill } from "react-icons/bs"
import { BiBookOpen } from 'react-icons/bi'
import { IoIosPerson } from 'react-icons/io'
import { AiOutlineForm } from 'react-icons/ai'
import { AiFillNotification } from 'react-icons/ai'
import { HiUserGroup } from 'react-icons/hi'



// date picker.
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

/*import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'*/


/*import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment' */






// setting up styling.
const useStyles = makeStyles( theme => ({
    parentContainer: {
        display: 'flex'
    },
    headerTextDiv: {
        backgroundColor: '#2E2A3B',
        color: 'white',
        width: '900px',
        height: '80px',
        //borderRadius: '50%'
        boxShadow: '2px 2px 8px grey',
        position: 'relative',
        top: '30px',
        left: '120px'
    },
    headerText: {
        position: 'relative',
        left: '260px',
        bottom: '30px'
    },
    totalStudentsDiv: {
        position: 'relative',
        top: '50px',
        left:'118px',
        backgroundColor: 'red',
        width: '270px',
        height: '110px',
        borderRadius: '3%',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '2px 2px 8px grey'
    },
    totalVisitorsDiv: {
        position: 'relative',
        bottom: '60px',
        left:'433px',
        backgroundColor: 'green',
        width: '274px',
        height: '110px',
        borderRadius: '3%',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '2px 2px 8px grey'
    },
    totalComplaintsDiv: {
        position: 'relative',
        bottom: '170px',
        left:'743px',
        backgroundColor: 'blue',
        width: '274px',
        height: '110px',
        borderRadius: '3%',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '2px 2px 8px grey'
    },
    totalStudentsIcon: {
        height: '200px'
    },
    totalStudentsText: {
        position: 'relative',
        top: '20px',
        right: '70px'
    },
    totalVisitorsText: {
        position: 'relative',
        top: '20px',
        right: '70px'
    },
    totalComplaintsText: {
        position: 'relative',
        top: '20px',
        right: '70px'
    },
    totalVisitorsNumber: {
        position: 'relative',
        bottom: '50px',
        left: '150px'
    },
    totalComplaintsNumber: {
        position: 'relative',
        bottom: '50px',
        left: '150px'
    },
    totalStudentsNumber: {
        position: 'relative',
        bottom: '50px',
        left: '150px'
    },
    manageAnnouncementsDiv: {
        position: 'relative',
        left: '117px',
        bottom: '130px',
        backgroundColor: ' green',
        height: '110px',
        width: '270px',
        borderRadius: '3%',
        color: 'white',
        cursor: 'pointer'
    },
    totalAnnouncementsText : {
        position: 'relative',
        top:'10px',
        left: '20px'

    },
    totalAnnouncementsNumber: {
        position: 'relative',
        bottom: '90px',
        left: '170px'
    },
    datePickerDiv : {
        position: 'relative',
        bottom: '260px',
        left: '420px',
        height: '400px',
        width: '700px',
        borderWidth: 3,
        borderColor: 'black'
    }




}))




export default function StaffLandingPage() {

    // initializing styling.
    const classes = useStyles()

    // handling state.
    const [ totalStudentsNumber, setTotalStudentsNumber ] = useState(0)
    const [ totalVisitorsNumber, setTotalVisitorsNumber ] = useState(0)
    const [ totalComplaintsNumber, setTotalComplaintsNumber ] = useState(0)




    // the use effect to get the total number of students added.
    const [ totalAddedStudentsMounted, setTotalAddedStudentsMounted ] = useState( true )

    useEffect(() => {

        if( totalAddedStudentsMounted ) {
        projectFirestore.collection('Added Students Collection').onSnapshot(snapshot => {
            setTotalStudentsNumber( snapshot.size )
        })
        console.log(` total students = ${ totalStudentsNumber }`)
      }

      // the clean up.
      return () => {
            setTotalAddedStudentsMounted( false )
      }

     }, [ totalStudentsNumber, totalAddedStudentsMounted ])



     // the use effect to get the total number of visitors added.
    const [ totalAddedVisitorsMounted, setTotalAddedVisitorsMounted ] = useState( true )

    useEffect(() => {

        if( totalAddedVisitorsMounted ) {
        projectFirestore.collection('Added Visitors Collection').onSnapshot(snapshot => {
            setTotalVisitorsNumber( snapshot.size )
        })
        console.log(` total visitors = ${ totalVisitorsNumber }`)
      }

      // the clean up.
      return () => {
        setTotalAddedVisitorsMounted( false )
      }

     }, [ totalVisitorsNumber, totalAddedVisitorsMounted ])




    // the use effect to get the total number of complaints submitted.
    const [ totalComplaintsMounted, setTotalComplaintsMounted ] = useState( true )

    useEffect(() => {

        if( totalComplaintsMounted ) {
        projectFirestore.collection('Submitted Complaints Collection').onSnapshot(snapshot => {
            setTotalComplaintsNumber( snapshot.size )
        })
        console.log(` total complaints = ${ totalComplaintsNumber }`)
      }

      // the clean up.
      return () => {
        setTotalComplaintsMounted( false )
      }

     }, [ totalComplaintsNumber, totalComplaintsMounted ])


     // state for date and time
    const [ selectedDateAndTime, setSelectedDateAndTime ] = useState(new Date());
    

    const updateDateAndTime = ( date ) => {
        setSelectedDateAndTime( date )
    }






















    return (
        <div className={ classes.parentContainer }>
            <PersistentDrawer />

        
            <div style={{ position: 'relative', top: '20', left: '240px'}}>

            <div className={ classes.headerTextDiv }>
                <HiUserGroup size={ 50 } style={{ position: 'relative', left: '70px', top: '15px'}}/>
                <Typography className={ classes.headerText } variant='h6' >
                    Resident Student Tracking System
                </Typography>
            </div>


            <div className={ classes.totalStudentsDiv }>
                <BsPeopleFill size={ 70 } style={{ paddingLeft: '20px'}} />

                <Typography variant='h7' className={ classes.totalStudentsText }>
                    Total Students
                </Typography>

                <Typography variant='h4' className={ classes.totalStudentsNumber }>
                    { totalStudentsNumber }
                </Typography>
                
            </div>


            <div className={ classes.totalVisitorsDiv}>
                <IoIosPerson size={ 70 } style={{ paddingLeft: '20px'}} />

                <Typography variant='h7' className={ classes.totalVisitorsText }>
                    Total Visitors
                </Typography>

                <Typography variant='h4' className={ classes.totalVisitorsNumber }>
                    { totalVisitorsNumber }
                </Typography>

            </div>


            <div className={ classes.totalComplaintsDiv}>
                 <AiOutlineForm size={ 70 } style={{ paddingLeft: '20px'}} />

                <Typography variant='h7' className={ classes.totalComplaintsText }>
                        Total Complaints
                </Typography>

                <Typography variant='h4' className={ classes.totalComplaintsNumber }>
                    { totalComplaintsNumber }
                </Typography>

            </div>

            <div className={ classes.manageAnnouncementsDiv }>
                <AiFillNotification size={ 60 } style={{ paddingLeft: '30px', paddingTop: '10px'}} />

                <Typography variant='h6' className={ classes.totalAnnouncementsText } >
                    Posted Announcements 
                </Typography>

                <Typography variant='h4' className={ classes.totalAnnouncementsNumber }>
                    7
                </Typography>

            </div>

            
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                <div className={ classes.datePickerDiv }>
                        <DatePicker 
                                disableToolbar
                                variant="static"
                                //required={ true }
                                format="MM / dd / yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select Date"
                                value={ selectedDateAndTime }
                                onChange={ updateDateAndTime }
                                
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }} /> 
                </div>

            </MuiPickersUtilsProvider>



            
            </div>

      
        </div>
    )
}
