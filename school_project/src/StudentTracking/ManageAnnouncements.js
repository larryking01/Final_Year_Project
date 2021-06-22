import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
//import PersistentDrawer from '../Drawers/PersistentDrawer'
import SwipeableDrawer from '../Drawers/SwipeableDrawer'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'



export default function ManageAnnouncements() {

    // handling state.
    const [ totalAnnouncementsArray, setTotalAnnouncementsArray ] = useState([])
    const [ selectedRow, setSelectedRow ] = useState(null)




    // the use effect to fetch all the announcements.
    const [ totalAnnouncementsMounted, setTotalAnnouncementsMounted ] = useState( true )
    useEffect(() => {
        if( totalAnnouncementsMounted ) {
            projectFirestore.collection('Posted Announcements')
            .onSnapshot( snapshot => {
                let temporaryArray = []
                snapshot.forEach( document => {
                    temporaryArray.push({ id: document.id, ...document.data() })
                })
                setTotalAnnouncementsArray( temporaryArray )
                console.log('all announcements fetched')
                totalAnnouncementsArray.forEach( announcement => {
                    console.log(`title = ${announcement.announcementTitle}`)
                    console.log(`body = ${announcement.announcementBody}`)
                })
            })
    
            }
    
            // the clean up.
            return () => {
                setTotalAnnouncementsMounted( false )
            }

         }, [ totalAnnouncementsArray, totalAnnouncementsMounted ])



         // defining the table columns
         const tableColumns = [
             { title: 'Announcement Title', field: 'announcementTitle' },
             { title: 'Announcement Body', field: 'announcementBody'},
             { title: 'Date Submitted', field: 'datePosted'},
             { title: 'Time Submitted', field: 'timePosted'}
         ]




    return (
        <div style={{display: 'column'}}>
            <SwipeableDrawer />

            <div style={{ flexDirection: 'column'}}>
                <MaterialTable 
                    title='Manage Announcements'
                    data={ totalAnnouncementsArray }
                    columns={ tableColumns }
                    onRowClick={ ((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                    options={{
                        headerStyle: {
                            backgroundColor: '#2E2A3B', /*'#01579b' */ 
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
                            let docToUpdate = projectFirestore.collection('Posted Announcements').doc(oldData.id)
                                docToUpdate.update({
                                   announcementTitle: updatedData.announcementTitle,
                                   announcementBody: updatedData.announcementBody
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
                            let docToDelete = projectFirestore.collection('Posted Announcements').doc(selectedRow.id)
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
