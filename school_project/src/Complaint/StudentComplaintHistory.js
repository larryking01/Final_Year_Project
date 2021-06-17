import React, { useState, useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import StudentComplaintSwipeableDrawer from '../Drawers/StudentComplaintSwipeableDrawer'
//import StudentComplaintPersistentDrawer from '../Drawers/PersistentDrawer'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import { makeStyles } from '@material-ui/core/styles'


// setting up styling.
const useStyles = makeStyles(theme => ({
    complaintStatusPendingButtons: {
        backgroundColor: '#01579b',
        color: 'white',
        border: 'none',
        width: '70px',
        height: '30px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    },
    complaintStatusResolvedButtons: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        width: '70px',
        height: '30px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    }
}))




export default function StudentComplaintHistory( props ) {

    // destructuring the props.
    const { handleLogout, user } = props

    // handling state.
    const [ studentComplaintsArray, setStudentComplaintsArray ] = useState([ ])
    const [ selectedRow, setSelectedRow ] = useState(null)


    // initializing styling.
    const classes = useStyles()

    


    // the useEffect to fetch all complaints.
    const [ fetchAllComplaintsMounted, setFetchAllComplaintsMounted ] = useState( true )

    useEffect(() => {
        if( fetchAllComplaintsMounted ) {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection').where('studentEmail', '==', user.email)
        fetchComplaints.onSnapshot( snapshot => {
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
        <div >
            <div>
                  <StudentComplaintSwipeableDrawer handleLogout={ handleLogout } user={ user }  />
            </div>
           
                
            <MaterialTable 
                title='Submitted Complaints'
                data={ studentComplaintsArray }
                columns={ tableColumns }
                onRowClick={ ((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                options={{
                        headerStyle: {
                            backgroundColor: '#2E2A3B',
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
    )
}
