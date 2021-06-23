import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
import StudentComplaintPersistentDrawer from '../Drawers/StudentComplaintPersistentDrawer'
import Typography from '@material-ui/core/Typography'


// icons
import { BsCheckAll } from 'react-icons/bs'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import { BsBookHalf } from 'react-icons/bs'
import { AiFillNotification } from 'react-icons/ai'


// for slider.
import './complaintSliderStyling.css'
import Carousel from 'react-elastic-carousel'


// scroll bar
//import ScrollArea from 'react-scrollbar'
import { Scrollbars } from 'react-custom-scrollbars'
 



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
        top: '20px'
    },
    totalComplaintsDiv: {
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
    totalResolvedComplaintsDiv: {
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
    totalPendingComplaintsDiv: {
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
    totalComplaintsText: {
        position: 'relative',
        top: '20px',
        right: '70px'
    },
    totalResolvedComplaintsText: {
        position: 'relative',
        top: '20px',
        right: '70px'
    },
    totalPendingComplaintsText: {
        position: 'relative',
        top: '20px',
        right: '70px'
    },
    totalResolvedComplaintsNumber: {
        position: 'relative',
        bottom: '50px',
        left: '150px'
    },
    totalComplaintsNumber: {
        position: 'relative',
        bottom: '50px',
        left: '150px'
    },
    totalPendingComplaintsNumber: {
        position: 'relative',
        bottom: '50px',
        left: '150px'
    },
    totalAnnouncementsDiv: {
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
    totalAnnouncementsNumber: {
        position: 'relative',
        bottom: '60px',
        left: '140px'
    },
    showAnnouncementsSlide: {
        position: 'relative',
        bottom: '120px',
        backgroundColor: '#4d4dff',
        left: '110px',
        width: '200px',
        height: '350px',
        borderRadius: '3%',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '2px 2px 8px grey'
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
      
        router.push('/signin')  
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
       <div>
           {
               user ? 
           
        <div className={ classes.parentContainer }>
            <StudentComplaintPersistentDrawer user={ user } handleLogout={ handleLogout } />

            <div style={{ position: 'relative', top: '20', left: '240px'}}>
               <div className={ classes.headerTextDiv }>
                     <Typography className={ classes.headerText } variant='h6' >
                           Student Dashboard
                     </Typography>
                 </div>


                 <div className={ classes.totalComplaintsDiv }>
                     <BsBookHalf size={ 70 } style={{ paddingLeft: '20px', paddingTop: '5px'}} />

                     <Typography variant='h7' className={ classes.totalComplaintsText }>
                           Total Complaints 
                     </Typography>

                     <Typography variant='h4' className={ classes.totalComplaintsNumber }>
                          { totalComplaintsNumber }
                     </Typography>
                
                 </div>



                 <div className={ classes.totalResolvedComplaintsDiv}>
                    <BsCheckAll size={ 70 } style={{ paddingLeft: '20px'}} />

                    <Typography variant='h7' className={ classes.totalResolvedComplaintsText }>
                        Resolved
                    </Typography>

                    <Typography variant='h4' className={ classes.totalResolvedComplaintsNumber }>
                        { totalResolvedComplaintsNumber }
                    </Typography>

                 </div>



                 <div className={ classes.totalPendingComplaintsDiv}>
                     <BsArrowCounterclockwise size={ 70 } style={{ paddingLeft: '20px', paddingTop: '10px'}} />

                     <Typography variant='h7' className={ classes.totalPendingComplaintsText }>
                        Pending
                     </Typography>

                     <Typography variant='h4' className={ classes.totalPendingComplaintsNumber }>
                             { totalPendingComplaintsNumber }
                     </Typography>

                 </div>


      
            <Carousel className={ classes.showAnnouncementsSlide } 
                      itemsToShow={ 1 }
                      enableAutoPlay
                      autoPlaySpeed={ 5000 } // same time
            >
                    
                 { totalAnnouncementsArray.map(announcement => 
                  <Scrollbars >
                     <div key={announcement.announcementTitle} onClick={() => console.log(announcement.id)}>
                         
                         <div style={{alignItems: 'center'}}>
                             <h2 style={{ paddingLeft: '140px'}}> { announcement.announcementTitle } </h2> 
                             <AiFillNotification  size={ 30 } style={{ position: 'relative', left: '40px', bottom: '45px'}}  />
                             <hr style={{ color: 'white', width: '60vw', position: 'relative', bottom: '44px'}}/>
                         </div>

                         <div style={{ position:'relative', bottom: '30px', paddingLeft: '35px'}}>
                             { announcement.announcementBody }

                         </div>

                    </div>
                    </Scrollbars>
                    )
                }


            </Carousel>
           
        
              












            </div>


        </div>
                : 
                goToStudentSignIn()
           }

        </div>

    )
}
