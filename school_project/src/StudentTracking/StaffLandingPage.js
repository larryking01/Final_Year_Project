import React, { useState, useEffect } from 'react'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
//import PersistentDrawer from '../Drawers/PersistentDrawer'
//import SwipeableDrawer from '../Drawers/SwipeableDrawer'
import Typography from '@material-ui/core/Typography'
import StudentTrackingNavBar from '../Drawers/StudentTrackingNavBar'
import Rotate from 'react-reveal/Rotate'
import Bounce from 'react-reveal/Bounce'




// icons
import { BsPeopleFill } from "react-icons/bs"
import { IoIosPerson } from 'react-icons/io'
import { AiOutlineForm } from 'react-icons/ai'
import { AiFillNotification } from 'react-icons/ai'



// date picker.
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';



// setting up styling.
const useStyles = makeStyles( theme => ({
    totalStudents: {
        width: '400px',
        height: '180px',
        backgroundColor: '#ffffff',
        marginLeft: '60px',
        position: 'relative',
        top: '20px',
        /*boxShadow: '1px 1px 1px grey', */
        borderRadius: '5%'
    },
    totalVisitors: {
        width: '400px',
        height: '180px',
        backgroundColor: '#ffffff',
        marginLeft: '20px',
        position: 'relative',
        top: '20px',
        /*boxShadow: '1px 1px 1px grey', */
        borderRadius: '5%'
    },
    totalComplaints: {
        width: '400px',
        height: '180px',
        backgroundColor: '#ffffff',
        marginLeft: '20px',
        position: 'relative',
        top: '20px',
        /*boxShadow: '1px 1px 1px grey', */
        borderRadius: '5%'
    },
    announcements: {
        width: '820px',
        height: '340px',
        backgroundColor: '#ffffff',
        marginLeft: '60px',
        position: 'relative',
        top: '40px',
        /*boxShadow: '1px 1px 1px grey', */
        borderRadius: '5%'
    }
}))




export default function StaffLandingPage( props ) {

    // destructuring props.
    const { staffID, staffPIN } = props






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
        <div style={{ backgroundColor: '#f2f2f2'}} >
         
           <StudentTrackingNavBar staffID={ staffID } staffPIN={ staffPIN } />

        
            <div style={{ marginTop: '95px'/* backgroundColor: '#eff1f3' */, height: '85vh' }}>

            
                <div style={{ display: 'flex' }}> 

                <Rotate top left>
                <div className={ classes.totalStudents }>
                    Total Students

                </div>
                </Rotate>

                <Rotate top left>
                <div className={ classes.totalVisitors }>
                    Total Visitors

                </div>
                </Rotate>

                <Rotate top left>
                <div className={ classes.totalComplaints }>
                    Total Complaints

                </div>
                </Rotate>

                </div>


                <Rotate top left>
                <div className={ classes.announcements }>
                    Announcements

                </div>
                </Rotate>
                
                
                        
            </div>


        </div>

      


    
    )
}
