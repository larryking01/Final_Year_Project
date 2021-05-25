import React, { useState, useEffect } from 'react'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import MaterialTable from 'material-table'

import SwipeableDrawer from './SwipeableDrawer'
//import PersistentDrawer from './PersistentDrawer'



export default function MainPage() {

    // handling state.
    const [ addedStudentsArray, setAddedStudentsArray ] = useState([])
    const [ selectedRow, setSelectedRow ] = useState(null)
    

    // the use effect to fetch all added students.
    useEffect(() => {
        projectFirestore.collection('Added Students Collection').onSnapshot(snapShot => {
            let temporaryArray = []
            snapShot.forEach(document => {
                temporaryArray.push({ id: document.id, ...document.data()})
            })
            setAddedStudentsArray(temporaryArray)
            //addedStudentsArray.forEach(student => console.log(student))
            
        })
        
    }, [ ])


    // setting up the columns of the table.
    const tableColumns = [
        { title: 'Student Picture', field: 'imageUrl', editable : 'never',
        render: item => <img src={item.imageUrl} alt='' border='1' width='90'  /> },
        { title: 'Index Number', field: 'indexNumber'},
        { title: 'First Name', field: 'firstName'},
        { title: 'Last Name', field: 'lastName'},
        { title: 'Sex', field: 'sexInputValue'},
        { title: 'Room Number', field: 'roomNumber'},
        { title: 'Course', field: 'course'},
        { title: 'Level', field: 'levelInputValue'},
        { title: 'Mobile Number', field: 'mobileNumber'}
        
    ]


    return (
        <div style={{ display: 'flex'}}>
            
            <SwipeableDrawer /> 

            <div style={{flexDirection: 'column', marginLeft: 20}}>
                <MaterialTable 
                    title='List Of Students'
                    data={ addedStudentsArray }
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
                           let docToUpdate = projectFirestore.collection('Added Students Collection').doc(oldData.id)
                               docToUpdate.update({
                                  firstName: updatedData.firstName,
                                  lastName: updatedData.lastName,
                                  indexNumber: updatedData.indexNumber,
                                  course: updatedData.course,
                                  levelInputValue: updatedData.levelInputValue,
                                  mobileNumber: updatedData.mobileNumber,
                                  roomNumber: updatedData.roomNumber,
                                  sexInputValue: updatedData.sexInputValue
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
                            let docToDelete = projectFirestore.collection('Added Students Collection').doc(selectedRow.id)
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
