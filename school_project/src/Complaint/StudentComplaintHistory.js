import React, { useState, useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { useHistory } from 'react-router-dom'
import StudentComplaintNavBar from '../Drawers/StudentComplaintNavBar'
//import StudentComplaintSwipeableDrawer from '../Drawers/StudentComplaintSwipeableDrawer'
//import StudentComplaintPersistentDrawer from '../Drawers/PersistentDrawer'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'
import Rotate from 'react-reveal/Rotate'






// setting up styling.
const useStyles = makeStyles(theme => ({
    complaintStatusPendingButtons: {
        backgroundColor: '#01579b',
        color: 'white',
        border: 'none',
        width: '100px',
        height: '40px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    },
    complaintStatusResolvedButtons: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        width: '100px',
        height: '40px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    }
}))




export default function StudentComplaintHistory( props ) {

    // destructuring the props.
    const { handleLogout, user } = props

    // handling state.
    const [ studentComplaintsArray, setStudentComplaintsArray ] = useState([ ])
    const [ totalComplaintsSubmitted, setTotalComplaintsSubmitted ] = useState( 0 )
    const [ totalResolvedComplaints, setTotalResolvedComplaints ] = useState( 0 )
    const [ totalPendingComplaints, setTotalPendingComplaints ] = useState( 0 )
    const [ selectedRow, setSelectedRow ] = useState(null)


    // initializing styling.
    const classes = useStyles()

    // initializing router
    const router = useHistory()


     // function to push sign in.
     const goToSignIn = () => {
        // modal here later.
        //alert('You are logging out')
        router.push('/studentsignin')
    }

    


    // the useEffect to fetch all complaints.
    const [ fetchAllComplaintsMounted, setFetchAllComplaintsMounted ] = useState( true )

    useEffect(() => {
        if( fetchAllComplaintsMounted && user ) {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection').where('studentEmail', '==', user.email)
        fetchComplaints.onSnapshot( snapshot => {
            setTotalComplaintsSubmitted( snapshot.size )
            let temporaryArray = []
            snapshot.forEach( document => {
                temporaryArray.push({ id : document.id, ...document.data()})
            })

            setStudentComplaintsArray(temporaryArray)
            //studentComplaintsArray.forEach( complaint => console.log(complaint))
        })

        }

        // the clean up.
        return () => {
            setFetchAllComplaintsMounted( false )
        }

    }, [ fetchAllComplaintsMounted ])



    // the useEffect to fetch all resolved complaints.
    const [ fetchAllResolvedMounted, setFetchAllResolvedMounted ] = useState( true )

    useEffect(() => {
        if( fetchAllResolvedMounted && user ) {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection')
        .where('studentEmail', '==', user.email).where('complaintStatus', '==', 'Resolved')
        fetchComplaints.onSnapshot( snapshot => {
            setTotalResolvedComplaints( snapshot.size )
        })

        }

        // the clean up.
        return () => {
            setFetchAllResolvedMounted( false )
        }

    }, [ fetchAllResolvedMounted ])



    // the useEffect to fetch all pending complaints.
    const [ fetchAllPendingMounted, setFetchAllPendingMounted ] = useState( true )

    useEffect(() => {
        if( fetchAllPendingMounted && user) {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection')
        .where('studentEmail', '==', user.email).where('complaintStatus', '==', 'Pending')
        fetchComplaints.onSnapshot( snapshot => {
            setTotalPendingComplaints( snapshot.size )
        })

        }

        // the clean up.
        return () => {
            setFetchAllPendingMounted( false )
        }

    }, [ fetchAllPendingMounted ])




    // setting up the table columns.
    let tableColumns = [
        { title: 'Student Index Number', field: 'studentIndexNumber' },
        { title: 'Student Full Name', field: 'studentFullName' },
        { title: 'Room Number', field: 'roomNumber' },
        { title: 'Complaint Type', field: 'complaintTypeInputValue' },
        { title: 'Complaint Description', field: 'complaintDescription'},
        { title: 'Student Mobile Number', field: 'mobileNumber' },
        { title: 'Date Submitted', field: 'date'},
        { title: 'Complaint Status', field: 'complaintStatus',
                  render: item => <button className={ item.complaintStatus === 'Pending' ? classes.complaintStatusPendingButtons : classes.complaintStatusResolvedButtons}> {item.complaintStatus} </button>
    }

    ]



    return (
        <div>
            {
                user ?
            
            <div>
           <StudentComplaintNavBar user={ user } handleLogout={ handleLogout } />
            
            <Rotate top left>
            <div style={{ marginTop: '100px' }}>
            <MaterialTable 
                title='Submitted Complaints'
                data={ studentComplaintsArray }
                columns={ tableColumns }
                onRowClick={ ((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                options={{
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        rowStyle: rowData => ({
                            //backgroundColor: ( selectedRow === rowData.tableData.id) ? 'darkgrey' : '#FFF',
                            //color: ( selectedRow === rowData.tableData.id) ? 'black' : 'black'
                            backgroundColor: ( rowData.tableData.id % 2 === 1 ) ? '#b3b3ff' : '#FFF'
                            
                        }),
                        actionsColumnIndex: -1,
                        exportButton: true
    
                }}
                components={{
                    Toolbar: props => (
                        <div style={{ backgroundColor: 'white', color: 'black' }}>
                            <MTableToolbar {...props} /> 

                        </div>
                    )
                }}
            
            />
            </div>
            </Rotate>

            </div>

            : goToSignIn()   }
            


        </div>
    )
}
