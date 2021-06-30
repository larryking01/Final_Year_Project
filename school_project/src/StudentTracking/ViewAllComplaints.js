import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import StudentTrackingNavBar from '../Drawers/StudentTrackingNavBar'
//import SwipeableDrawer from '../Drawers/SwipeableDrawer'
//import PersistentDrawer from '../Drawers/PersistentDrawer'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import RestoreIcon from '@material-ui/icons/Restore'
import Fade from 'react-reveal/Fade'

import { makeStyles } from '@material-ui/styles'


// setting up styling.
const useStyles = makeStyles( theme => ({
    complaintStatusPendingButtons: {
        backgroundColor: '#01579b',
        color: 'white',
        border: 'none',
        width: '100px',
        height: '30px',
        paddingBottom: '4px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    },
    complaintStatusResolvedButtons: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        width: '100px',
        height: '30px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    },
    totalComplaintsText: {
        position: 'relative',
        bottom: '50px',
        left: '700px',
        color: 'white'

    },
    totalResolvedComplaintsText: {
        position: 'relative',
        bottom: '88px',
        left: '940px',
        color: 'white'
    },
    totalPendingComplaintsText: {
        position: 'relative',
        bottom: '127px',
        left: '1170px',
        color: 'white'
    }




}))





export default function ViewAllComplaints( props ) {

    // destructuring props.
    const { staffID } = props


    // handling state.
    const [ complaintsArray, setComplaintsArray ] = useState([ ])
    const [ selectedRow, setSelectedRow ] = useState(null)
    const [ totalComplaints, setTotalComplaints ] = useState( 0 )
    const [ totalResolved, setTotalResolvedComplaints ] = useState( 0 )
    const [ totalPending, setTotalPendingComplaints ] = useState( 0 )





    let complaintResolvedStatus = 'Pending'
    const [ complaintAttended, setComplaintAttended ] = useState( false )


    // initializing styling.
    const classes = useStyles()


    // the useEffect to fetch all complaints.
    const [ fetchAllComplaintsMounted, setFetchAllComplaintsMounted ] = useState( true )
    useEffect(() => {
        if( fetchAllComplaintsMounted ) {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection')
        fetchComplaints.onSnapshot( snapshot => {
            setTotalComplaints( snapshot.size )
            let temporaryArray = []
            snapshot.forEach( document => {
                temporaryArray.push({ id : document.id, ...document.data()})
            })

            setComplaintsArray(temporaryArray)
            //complaintsArray.forEach( complaint => console.log(complaint))
        })
            }

        // the clean up.
        return () => {
            setFetchAllComplaintsMounted( false )
        }

    }, [ fetchAllComplaintsMounted ])



    // the useEffect to fetch all resolved complaints.
    const [ fetchAllResolvedMounted, setFetchAllResolvedComplaintsMounted ] = useState( true )
    useEffect(() => {
        if( fetchAllResolvedMounted ) {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection')
        .where('complaintStatus', '==', 'Resolved')
        fetchComplaints.onSnapshot( snapshot => {
           setTotalResolvedComplaints( snapshot.size )
        })

        }

        // the clean up.
        return () => {
            setFetchAllResolvedComplaintsMounted( false )
        }

    }, [ fetchAllResolvedMounted ])




    // the useEffect to fetch all pending complaints.
    const [ fetchAllPendingMounted, setFetchAllPendingComplaintsMounted ] = useState( true )
    useEffect(() => {
        if( fetchAllPendingMounted ) {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection')
        .where('complaintStatus', '==', 'Pending')
        fetchComplaints.onSnapshot( snapshot => {
           setTotalPendingComplaints( snapshot.size )
        })

        }

        // the clean up.
        return () => {
            setFetchAllPendingComplaintsMounted( false )
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

            <StudentTrackingNavBar staffID={ staffID } />
            
            <Fade top>
            <div style={{ marginTop: '100px' }}>
            <MaterialTable 
                title='Submitted Complaints'
                data={ complaintsArray }
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
                    editable={{
                        onRowDelete : ( selectedRow ) => new Promise((resolve, reject) => {
                                   if( selectedRow.complaintStatus === 'Pending'){
                                       // modal here later
                                       alert('You cannot delete a complaint that is yet to be attended to !!')
                                       setTimeout(() => {
                                           resolve()
                                       }, 300)
                                   }
                                   else {
                                       // modal here later.
                                       let docToDelete = projectFirestore.collection('Submitted Complaints Collection').doc( selectedRow.id )
                                       docToDelete.delete()
                                       .then(() => {
                                           // modal here later.
                                           alert(`document with id ${ selectedRow.id } deleted successfully`)
                                       })
                                       .catch( error => {
                                           // modal here later.
                                           alert('failed to delete document.')
                                           console.log(`failed to delete document due to error: ${ error }`)
                                       })
                                       setTimeout(() => {
                                        resolve()
                                         }, 300)

                                        } 
                        })
                    }}
                    actions={[
                        {
                          icon: () => ( <CheckCircleOutlineIcon/> ),
                          tooltip: 'Mark Complaint As Resolved',
                          onClick: (event, rowData) => {
                            projectFirestore.collection('Submitted Complaints Collection').doc( rowData.id )
                            .update({
                                complaintStatus : 'Resolved'
                            })
                            .then(() => {
                                // modal here later.
                                alert(`document with id ${ rowData.id } updated successfully`)
                            })
                            .catch( error => {
                                // modal here later.
                                alert(`failed to update document due to error: ${ error }`)
                            })

                          }

                        },

                        {
                            icon: () => ( <RestoreIcon /> ),
                            tooltip: 'Reset Complaint Status',
                            onClick: (event, rowData) => {
                              projectFirestore.collection('Submitted Complaints Collection').doc( rowData.id )
                              .update({
                                  complaintStatus : 'Pending'
                              })
                              .then(() => {
                                  // modal here later.
                                  alert(`document with id ${ rowData.id } updated successfully`)
                              })
                              .catch( error => {
                                  // modal here later.
                                  alert(`failed to update document due to error: ${ error }`)
                              })
  
                            }
  
                          }
                      ]}

            />
            </div>
            </Fade>




            
            
        </div>
    )
}
