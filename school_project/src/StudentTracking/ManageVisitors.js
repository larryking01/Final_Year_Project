import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import StudentTrackingNavBar from '../Drawers/StudentTrackingNavBar'
//import PersistentDrawer from '../Drawers/PersistentDrawer'
//import SwipeableDrawer from '../Drawers/SwipeableDrawer'
import CheckIcon from '@material-ui/icons/Check'


import { projectFirestore } from '../firebaseSetup/firebaseConfig'






export default function ManageVisitors( props ) {

    // destructuring props.
    const { staffID } = props

    // handling state.
    const [ visitorsArray, setVisitorsArray ] = useState([])
    const [ selectedRow, setSelectedRow ] = useState(null)



    // the useEffect to fetch all added visitors.
    const [ fetchAllVisitorsMounted, setfetchAllVisitorsMounted ] = useState( true )
    useEffect(() => {
        if( fetchAllVisitorsMounted ) {
        projectFirestore.collection('Added Visitors Collection').onSnapshot( snapshot => {
            let temporaryArray = []
            snapshot.forEach( document => {
                temporaryArray.push({ id: document.id, ...document.data() })
            })
            setVisitorsArray( temporaryArray )
            console.log('all visitors effect')
        })

        }

        // the clean up.
        return () => {
            setfetchAllVisitorsMounted( false )
        }


    }, [ fetchAllVisitorsMounted ])

    
    // defining the columns to use for material table.
    let tableColumns = [
        { title: 'Visitor Index Number', field: 'visitorIndexNumber'},
        { title: 'Visitor Full Name', field: 'visitorFullName' },
        { title: 'Room Of Visit', field: 'visitingRoom'},
        { title: 'Room Member Visited', field: 'roomMemberGettingVisited'},
        { title: 'Date Of Visit', field: 'dateOfVisit'},
        { title: 'Time Of Visit', field: 'timeOfVisit'},
        { title: 'Time Of Departure', field: 'timeOfDeparture'}
        
    ]



    return (
        <div style={{display: 'column'}}>

            <StudentTrackingNavBar staffID={ staffID } />
            
            
            <div style={{ marginTop: '100px' }}>
                <MaterialTable 
                    title='List Of Visitors'
                    data={ visitorsArray }
                    columns={ tableColumns }
                    onRowClick={ ((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                    options={{
                        headerStyle: {
                            backgroundColor: '#01579b', /*'#01579b' */ 
                            color: '#FFF'
                        },
                        rowStyle: rowData => ({
                            backgroundColor: ( rowData.tableData.id % 2 === 1 ) ? '#b3b3ff' : '#FFF'
                            //color: ( selectedRow === rowData.tableData.id) ? 'black' : 'black'
                        }),
                        actionsColumnIndex: -1,
                        exportButton: true
                    }}
                    editable={{
                        onRowUpdate: ( updatedData, oldData ) => new Promise((resolve, reject) => {
                            let docToUpdate = projectFirestore.collection('Added Visitors Collection').doc(oldData.id)
                                docToUpdate.update({
                                   visitorFullName: updatedData.visitorFullName,
                                   visitorIndexNumber: updatedData.visitorIndexNumber,
                                   visitingRoom: updatedData.visitingRoom,
                                   roomMemberGettingVisited: updatedData.roomMemberGettingVisited,
                                   dateOfVisit: updatedData.dateOfVisit,
                                   timeOfVisit: updatedData.timeOfVisit,
                                   timeOfDeparture: updatedData.timeOfDeparture
                                }).then(() => {
                                    // modal goes here later.
                                    console.log(`document with id ${oldData.id} updated successfully`)
                                }).catch(error => {
                                    // modal goes here later.
                                    alert('failed to update document')
                                    console.log(`update failed due to error: ${error}`)
                                })
                                
                             setTimeout(()=>{
                                 resolve()
                             }, 700)
                         }),
                         onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                            let docToDelete = projectFirestore.collection('Added Visitors Collection').doc(selectedRow.id)
                            docToDelete.delete().then(() => {
                                console.log(`document with the id ${selectedRow.id} deleted successfully`)
                            }).catch(error => {
                                alert('failed to delete document due to error')
                                console.log(`error = ${error}`)
                            })

                            setTimeout(()=>{
                                resolve()
                            }, 700)
                        })
                    }}

                    actions={
                        [
                            {
                                icon: () => ( <CheckIcon /> ),
                                tooltip: 'Mark Visiting Complete',
                                onClick: ( event, rowData ) => {
                                    // setting up the time.
                                    let currentTime = new Date()
                                    
                                    // updating the document to show time of departure.
                                    let docToUpdate = projectFirestore.collection('Added Visitors Collection').doc( rowData.id )
                                    docToUpdate.update({
                                            timeOfDeparture : currentTime.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                    }).then(() => {
                                        // modal goes here later.
                                        console.log(`document with id ${rowData.id} updated successfully`)
                                    }).catch( error => {
                                        // modal goes here later.
                                        alert('failed to update document')
                                        console.log(`update failed due to error: ${error}`)
                                    })


                                }
                            }
                        ]
                    }
                    

                />
            </div>

        </div>
    )
}
