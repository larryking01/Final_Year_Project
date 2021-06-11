import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import StudentComplaintSwipeableDrawer from '../Drawers/StudentComplaintSwipeableDrawer'
//import StudentComplaintPersistentDrawer from '../Drawers/PersistentDrawer'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'







export default function StudentComplaintHistory( props ) {

    // destructuring the props.
    const { handleLogout, user } = props

    // handling state.
    const [ studentComplaintsArray, setStudentComplaintsArray ] = useState([ ])
    const [ selectedRow, setSelectedRow ] = useState(null)

    


    // the useEffect to fetch all complaints.
    useEffect(() => {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection').where('studentEmail', '==', user.email)
        fetchComplaints.onSnapshot( snapshot => {
            let temporaryArray = []
            snapshot.forEach( document => {
                temporaryArray.push({ id : document.id, ...document.data()})
            })

            setStudentComplaintsArray(temporaryArray)
            //studentComplaintsArray.forEach( complaint => console.log(complaint))
        })

    }, [ ])


    // setting up the table columns.
    let tableColumns = [
        { title: 'Student Index Number', field: 'studentIndexNumber' },
        { title: 'Student Full Name', field: 'studentFullName' },
        { title: 'Room Number', field: 'roomNumber' },
        { title: 'Complaint Type', field: 'complaintTypeInputValue' },
        { title: 'Complaint Description', field: 'complaintDescription'},
        { title: 'Student Mobile Number', field: 'mobileNumber' },
        { title: 'Date Submitted', field: 'date'},
        { title: 'Complaint Status', field: 'complaintStatus'}

    ]








    return (
        <div style={{display: 'flex'}} >
            <StudentComplaintSwipeableDrawer handleLogout={ handleLogout } user={ user } />

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
            
            />


        </div>
    )
}
