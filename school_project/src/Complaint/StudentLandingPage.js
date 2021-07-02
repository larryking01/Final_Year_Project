import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
import StudentComplaintNavBar from '../Drawers/StudentComplaintNavBar'
import Rotate from 'react-reveal/Rotate'




// icons
/*
import { BsCheckAll } from 'react-icons/bs'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import { BsBookHalf } from 'react-icons/bs'
import { AiFillNotification } from 'react-icons/ai'
*/


/* for slider.
import './complaintSliderStyling.css'
import Carousel from 'react-elastic-carousel'
*/




// setting up styling.
const useStyles = makeStyles( theme => ({
    totalSubmittedComplaints: {
        width: '400px',
        height: '180px',
        backgroundColor: '#ffffff',
        marginLeft: '60px',
        position: 'relative',
        top: '20px',
        boxShadow: '1px 1px 1px grey',
        borderRadius: '5%'
    },
    totalPendingComplaints: {
        width: '400px',
        height: '180px',
        backgroundColor: '#ffffff',
        marginLeft: '20px',
        position: 'relative',
        top: '20px',
        boxShadow: '1px 1px 1px grey',
        borderRadius: '5%'
    },
    totalResolvedComplaints: {
        width: '400px',
        height: '180px',
        backgroundColor: '#ffffff',
        marginLeft: '20px',
        position: 'relative',
        top: '20px',
        boxShadow: '1px 1px 1px grey',
        borderRadius: '5%'
    },
    announcements: {
        width: '820px',
        height: '340px',
        backgroundColor: '#ffffff',
        marginLeft: '60px',
        position: 'relative',
        top: '40px',
        boxShadow: '1px 1px 1px grey',
        borderRadius: '5%'
    }


}))





export default function StudentLandingPage(props) {

    // destructuring props.
    const { user, handleLogin, handleLogout } = props

    // initializing styling.
    const classes = useStyles()

    // for routing.
    const router = useHistory() 


    // announcements slider settings.
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
      };



    // the function to push users to sign in when they log out.
    const goToStudentSignIn = () => {
      
        router.push('/studentsignin')  
    }



    //announcements object.
    let announcementStructure = {
        announcementTitle: 'Fetching',
        announcementBody: 'Fetching'
    }


    // handling state.
    const [ totalComplaintsNumber, setTotalComplaintsNumber ] = useState(0)
    const [ totalResolvedComplaintsNumber, setTotalResolvedComplaintsNumber ] = useState(0)
    const [ totalPendingComplaintsNumber, setTotalPendingComplaintsNumber ] = useState(0)
    const [ totalAnnouncementsNumber, setTotalAnnouncementsNumber ] = useState(0)
    const [ totalAnnouncementsArray, setTotalAnnouncementsArray ] = useState([])



    // the use effect to get the total number of complaints submitted.
    const [ totalComplaintsMounted, setTotalComplaintsMounted ] = useState( true )

    useEffect(() => {

        if( totalComplaintsMounted && user ) {
        projectFirestore.collection('Submitted Complaints Collection')
        .where('studentEmail', '==', user.email)
        .onSnapshot(snapshot => {
            setTotalComplaintsNumber( snapshot.size )
        })
        console.log(` total complaints = ${ totalComplaintsNumber }`)
      }

      // the clean up.
      return () => {
        setTotalComplaintsMounted( false )
      }

     }, [ totalComplaintsNumber, totalComplaintsMounted ])



    // the use effect to get the total number of resolved complaints.
    const [ totalResolvedComplaintsMounted, setTotalResolvedComplaintsMounted ] = useState( true )

    useEffect(() => {

        if( totalResolvedComplaintsMounted && user ) {
        projectFirestore.collection('Submitted Complaints Collection')
        .where('studentEmail', '==', user.email)
        .where('complaintStatus', '==', 'Resolved')
        .onSnapshot(snapshot => {
            setTotalResolvedComplaintsNumber( snapshot.size )
        })
        console.log(` total resolved complaints = ${ totalResolvedComplaintsNumber }`)
      }

      // the clean up.
      return () => {
        setTotalResolvedComplaintsMounted( false )
      }

     }, [ totalResolvedComplaintsNumber, totalResolvedComplaintsMounted ])



     // the use effect to get the total number of pending complaints.
    const [ totalPendingComplaintsMounted, setTotalPendingComplaintsMounted ] = useState( true )

    useEffect(() => {

        if( totalPendingComplaintsMounted && user ) {
        projectFirestore.collection('Submitted Complaints Collection')
        .where('studentEmail', '==', user.email)
        .where('complaintStatus', '==', 'Pending')
        .onSnapshot(snapshot => {
            setTotalPendingComplaintsNumber( snapshot.size )
        })
        console.log(` total pending complaints = ${ totalPendingComplaintsNumber }`)
      }

      // the clean up.
      return () => {
        setTotalPendingComplaintsMounted( false )
      }

     }, [ totalPendingComplaintsNumber, totalPendingComplaintsMounted ])



    // the use effect to get the total number of announcements.
    const [ totalAnnouncementsMounted, setTotalAnnouncementsMounted ] = useState( true )

    useEffect(() => {

        if( totalAnnouncementsMounted && user ) {
        projectFirestore.collection('Posted Announcements')
        .onSnapshot(snapshot => {
            setTotalAnnouncementsNumber( snapshot.size )
        })
        console.log(` total announcements = ${ totalAnnouncementsNumber }`)
      }

      // the clean up.
      return () => {
        setTotalAnnouncementsMounted( false )
      }

     }, [ totalAnnouncementsNumber, totalAnnouncementsMounted ])



    // use effect to fetch all announcements.
    const [ totalAnnouncementsPostedMounted, setTotalAnnouncementsPostedMounted ] = useState( true )

    useEffect(() => {
        if( totalAnnouncementsPostedMounted ) {
            projectFirestore.collection('Posted Announcements').onSnapshot( snapshot => {
                let temporaryArray = []
                snapshot.forEach( document => {
                    temporaryArray.push({ id: document.id, ...document.data() })
                })
                setTotalAnnouncementsArray( temporaryArray )
                console.log('all announcements fetched')
                totalAnnouncementsArray.forEach( post => {
                    console.log(`announcement = ${ post.announcementTitle }` )
                })
            })
    
        }

      // the clean up.
      return () => {
        setTotalAnnouncementsPostedMounted( false )
      }

     }, [ totalAnnouncementsPostedMounted, totalAnnouncementsArray ])










    return (
       <div style={{ backgroundColor: '#f2f2f2'}}>
           {
               user ? 
           
        <div>
            <StudentComplaintNavBar  user={ user } handleLogout={ handleLogout } />



            <div style={{ marginTop: '95px'/* backgroundColor: '#eff1f3' */, height: '85vh' }}>
                <div style={{ display: 'flex' }}> 

                <Rotate top left>
                <div className={ classes.totalSubmittedComplaints }>
                    Total complaints

                </div>
                </Rotate>

                <Rotate top left>
                <div className={ classes.totalPendingComplaints }>
                    Pending

                </div>
                </Rotate>

                <Rotate top left>
                <div className={ classes.totalResolvedComplaints }>
                    Resolved

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
                : 
                goToStudentSignIn()
           }

        </div>

    )
}
