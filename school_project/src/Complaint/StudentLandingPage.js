import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
import StudentComplaintPersistentDrawer from '../Drawers/StudentComplaintPersistentDrawer'
import StudentComplaintSwipeableDrawer from '../Drawers/StudentComplaintSwipeableDrawer'
import Typography from '@material-ui/core/Typography'


// icons
import { BsPeopleFill } from "react-icons/bs"
import { BiBookOpen } from 'react-icons/bi'
import { IoIosPerson } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsCheckAll } from 'react-icons/bs'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import { BsBookHalf } from 'react-icons/bs'
import { VscLoading } from 'react-icons/vsc'



// setting up styling.
const useStyles = makeStyles( theme => ({
    parentContainer: {
        display: 'flex'
    },
    headerTextDiv: {
        backgroundColor: 'white',
        width: '800px',
        height: '80px',
        //borderRadius: '50%'
        boxShadow: '2px 2px 8px grey',
        position: 'relative',
        top: '30px',
        left: '60px'
    },
    headerText: {
        position: 'relative',
        left: '260px',
        top: '20px'
    },
    totalComplaintsDiv: {
        position: 'relative',
        top: '50px',
        left:'60px',
        backgroundColor: 'blue',
        width: '250px',
        height: '110px',
        borderRadius: '3%',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '2px 2px 8px grey'
    },
    totalResolvedComplaintsDiv: {
        position: 'relative',
        bottom: '60px',
        left:'333px',
        backgroundColor: 'green',
        width: '254px',
        height: '110px',
        borderRadius: '3%',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '2px 2px 8px grey'
    },
    totalPendingComplaintsDiv: {
        position: 'relative',
        bottom: '170px',
        left:'607px',
        backgroundColor: 'red',
        width: '254px',
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
    }




}))





export default function StudentLandingPage(props) {

    // destructuring props.
    const { user, handleLogin, handleLogout } = props

    // initializing styling.
    const classes = useStyles()

    // for routing.
    const router = useHistory() 


    // the function to push users to sign in when they log out.
    const goToStudentSignIn = () => {
        alert('you are logging out')

        router.push('/signin')
    }



    // handling state.
    const [ totalComplaintsNumber, setTotalComplaintsNumber ] = useState(0)
    const [ totalResolvedComplaintsNumber, setTotalResolvedComplaintsNumber ] = useState(0)
    const [ totalPendingComplaintsNumber, setTotalPendingComplaintsNumber ] = useState(0)


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










    return (
       <div>
           {
               user ? 
           
        <div className={ classes.parentContainer }>
            <StudentComplaintPersistentDrawer user={ user } handleLogout={ handleLogout } />

            <div style={{ position: 'relative', top: '20'}}>
               <div className={ classes.headerTextDiv }>
                     <Typography className={ classes.headerText } variant='h6' >
                           Student Complaint Submission
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





            </div>


        </div>
                : 
                goToStudentSignIn()
           }

        </div>

    )
}
