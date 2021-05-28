import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import PersistentDrawer from './PersistentDrawer'
//import SwipeableDrawer from './SwipeableDrawer'

import { projectFirestore } from '../firebaseSetup/firebaseConfig'




export default function ManageVisitors() {

    // handling state.
    const [ visitorsArray, setVisitorsArray ] = useState([])
    const [ selectedRow, setSelectedRow ] = useState(null)


    // the useEffect to fetch all added visitors.
    useEffect(() => {
        projectFirestore.collection('Added Visitors Collection').onSnapshot( snapshot => {
            let temporaryArray = []
            snapshot.forEach( document => {
                temporaryArray.push({ id: document.id, ...document.data() })
            })
            setVisitorsArray( temporaryArray )
        })

    }, [ ])

    
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
        <div style={{display: 'flex'}}>
            <PersistentDrawer />
            
            <div style={{ flexDirection: 'column'}}>
                <MaterialTable 
                    title='List Of Visitors'
                    data={ visitorsArray }
                    columns={ tableColumns }
                    onRowClick={ ((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                    options={{
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        rowStyle: rowData => ({
                            backgroundColor: ( selectedRow === rowData.tableData.id) ? 'darkgrey' : '#FFF'
                            //color: ( selectedRow === rowData.tableData.id) ? 'black' : 'black'
                        }),
                        actionsColumnIndex: -1
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
                                   timeOfVisit: updatedData.timeOfVisit
                                }).then(() => {
                                    // modal goes here later.
                                    alert(`document with id ${oldData.id} updated successfully`)
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
                                alert(`document with the id ${selectedRow.id} deleted successfully`)
                            }).catch(error => {
                                alert('failed to delete document due to error')
                                console.log(`error = ${error}`)
                            })

                            setTimeout(()=>{
                                resolve()
                            }, 700)
                        })
                    }}
                    


















                />
            </div>

            

        </div>
    )
}
