import React, { useState, useEffect } from 'react'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/styles'
import SwipeableDrawer from '../Drawers/SwipeableDrawer'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
//import PersistentDrawer from '../Drawers/PersistentDrawer'

// the Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogCOntentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'



// setting up styling.
const useStyles = makeStyles( theme => ({
    checkInButton: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        width: '84px',
        height: '37px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    },
    checkOutButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        width: '84px',
        height: '37px',
        cursor: 'pointer',
        boxShadow: '2px 8px 6px grey'
    },
    totalStudentsDiv: {
        backgroundColor: '#01579b',
        height: '40px',
        width: '200px',
        position: 'relative',
        left: '60px',
        bottom: '60px',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: '2px 4px 8px'
    },
    totalStudentsText: {
        paddingTop: '5px'
    },
    totalCheckedInStudentsDiv: {
        backgroundColor: '#01579b',
        height: '40px',
        width: '200px',
        position: 'relative',
        left: '300px',
        bottom: '122px',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center'
    },
    totalCheckInStudentsText: {
        paddingTop: '5px'
    },
    totalCheckedOutStudentsDiv: {
        backgroundColor: '#01579b',
        height: '40px',
        width: '200px',
        position: 'relative',
        left: '540px',
        bottom: '183px',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center'
    },
    totalCheckOutStudentsText: {
        paddingTop: '5px'
    }


}))







export default function MainPage() {

    // handling state.
    const [ addedStudentsArray, setAddedStudentsArray ] = useState([])
    const [ selectedRow, setSelectedRow ] = useState(null)


    // state for the total number of students.
    const [ totalStudents, setTotalStudents ] = useState(0)
    const [ totalCheckedInStudents, setTotalCheckedInStudents ] = useState(0)
    const [ totalCheckedOutStudents, setTotalCheckedOutStudents ] = useState(0)


    // for the dialog.
    const [showDialog, setShowDialog] = useState(false)
    const [rowData, setRowData] = useState('')


    // dialog transition.
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });






    // initializing styling.
    const classes = useStyles()

    
    // the use effect to fetch all added students.
    const [ addedStudentsMounted, setAddedStudentsMounted ] = useState( true )
    
    useEffect(() => {

        if( addedStudentsMounted ) {
        projectFirestore.collection('Added Students Collection').onSnapshot(snapShot => {
            let temporaryArray = []
            snapShot.forEach(document => {
                temporaryArray.push({ id: document.id, ...document.data()})
            })
            setAddedStudentsArray(temporaryArray)
            //addedStudentsArray.forEach(student => console.log(student))
            console.log(`added students use effect`)
        })
        }

        // the clean up.
        return () => {
            setAddedStudentsMounted( false )
        }

    }, [ addedStudentsMounted ])






    // the use effect to get the total number of students added.
    const [ totalAddedStudentsMounted, setTotalAddedStudentsMounted ] = useState( true )

    useEffect(() => {

        if( totalAddedStudentsMounted ) {
        projectFirestore.collection('Added Students Collection').onSnapshot(snapshot => {
            setTotalStudents( snapshot.size )
        })
        console.log(` total students = ${ totalStudents }`)
      }

      // the clean up.
      return () => {
            setTotalAddedStudentsMounted( false )
      }


     }, [ totalStudents, totalAddedStudentsMounted ])






    // the use effect to get the total number of students who are checked in.
    const [ totalCheckedInStudentsMounted, setTotalCheckedInStudentsMounted ] = useState( true )

    useEffect(() => {
        // total checked in students.
        if( totalCheckedInStudentsMounted ) {

        projectFirestore.collection('Added Students Collection').where('checkInStatus', '==', 'Checked In')
        .onSnapshot(snapshot => {
            setTotalCheckedInStudents( snapshot.size )
        })
        console.log(` total checked in students = ${ totalCheckedInStudents }`)

        }

        // the clean up.
        return () => {
            setTotalCheckedInStudentsMounted( false )
        }

    }, [ totalCheckedInStudents, totalCheckedInStudentsMounted ])





    // the use effect to get the total number of students who are checked out.
    const [ totalCheckedOutStudentsMounted, setTotalCheckedOutStudentsMounted ] = useState( true )
    
    useEffect(() => {
        // total checked in students.
        if( totalCheckedOutStudentsMounted ) {
        projectFirestore.collection('Added Students Collection').where('checkInStatus', '==', 'Checked Out')
        .onSnapshot(snapshot => {
            setTotalCheckedOutStudents( snapshot.size )
        })
        console.log(` total checked out students = ${ totalCheckedOutStudents }`)
        }

        // the cleanup.
        return () => {
            setTotalCheckedOutStudentsMounted( false )
        }

    }, [ totalCheckedOutStudents, totalCheckedOutStudentsMounted ])


    







    // setting up the columns of the table.
    const tableColumns = [
        { title: 'Student Picture', field: 'imageUrl', editable: 'never',
        render: item => <img src={item.imageUrl} alt='' border='1' width='90' style={{ borderRadius: '50%' }}  /> },
        { title: 'Index Number', field: 'indexNumber'},
        { title: 'First Name', field: 'firstName'},
        { title: 'Last Name', field: 'lastName'},
        { title: 'Sex', field: 'sexInputValue'},
        { title: 'Room Number', field: 'roomNumber'},
        { title: 'Course', field: 'course'},
        { title: 'Level', field: 'levelInputValue'},
        { title: 'Mobile Number', field: 'mobileNumber'},
        { title: 'Check In Status', field: 'checkInStatus', editable: 'never',
                render: item => <button className={ item.checkInStatus === 'Checked In' ? classes.checkInButton : classes.checkOutButton }> { item.checkInStatus } </button>
        }
        
    ]


    return (
        <div >
            <div>
                 <SwipeableDrawer /> 
                 <div className={ classes.totalStudentsDiv }>
                          <h4 className={ classes.totalStudentsText }> {`Total Students: ${totalStudents}`} </h4>
                 </div>

                 <div className={ classes.totalCheckedInStudentsDiv }>
                          <h4 className={ classes.totalCheckInStudentsText }> {`Checked In: ${totalCheckedInStudents}`} </h4>
                 </div>

                 <div className={ classes.totalCheckedOutStudentsDiv }>
                          <h4 className={ classes.totalCheckOutStudentsText }> {`Checked Out: ${totalCheckedOutStudents}`} </h4>
                 </div>
            </div>
            

            <div style={{ position: 'relative', top: '-170px'}}>
                <MaterialTable 
                    title='List Of Resident Students'
                    data={ addedStudentsArray }
                    columns={ tableColumns } 
                    onRowClick={ ((event, selectedRow) => {
                        setSelectedRow(selectedRow.tableData.id) 
                        setRowData(selectedRow)
                        console.log(`image url = ${selectedRow.imageUrl} `)
                        setShowDialog(true)

                    })}
                    options={{
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        rowStyle: rowData => ({
                            //backgroundColor: ( selectedRow === rowData.tableData.id) ? 'darkgrey' : '#FFF'
                            //color: ( selectedRow === rowData.tableData.id) ? 'black' : 'black'
                            backgroundColor: ( rowData.tableData.id % 2 === 1 ) ? '#b3b3ff' : '#FFF'
                        }),
                        actionsColumnIndex: -1,
                        exportButton: true
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

                    actions={[
                        {
                            icon: () => ( <CheckCircleIcon /> ),
                            tooltip: 'Check student in',
                            onClick: ( event, rowData ) => {
                                let checkStudentIn = projectFirestore.collection('Added Students Collection').doc(rowData.id)
                                checkStudentIn.update({
                                    checkInStatus : 'Checked In'
                                })
                                .then(() => {
                                    // modal goes here later.
                                    alert(`document with id ${rowData.id} updated successfully`)
                                }) 
                                .catch(error => {
                                    alert('failed to delete document due to error')
                                    console.log(`error = ${error}`)
                                })
                                 }

                        },

                        {
                            icon: () => ( <CancelIcon /> ),
                            tooltip: 'Check student out',
                            onClick: ( event, rowData ) => {
                                let checkStudentIn = projectFirestore.collection('Added Students Collection').doc(rowData.id)
                                checkStudentIn.update({
                                    checkInStatus : 'Checked Out'
                                })
                                .then(() => {
                                    // modal goes here later.
                                    alert(`document with id ${rowData.id} updated successfully`)
                                })
                                .catch(error => {
                                    alert('failed to delete document due to error')
                                    console.log(`error = ${error}`)
                                })
                                 }

                        }

                    ]}

                />

                <Dialog open={showDialog} 
                        onClose={() => setShowDialog( false )} 
                        //TransitionComponent={ Transition }
                        //keepMounted
                >
                    <DialogTitle style={{backgroundColor: '#01579b', color: 'white'}}> {`${rowData.firstName} ${rowData.lastName}`} </DialogTitle>
                    
                    <Box>
                        <img src={ rowData.imageUrl} alt='' width={400}  />
                    </Box>

                </Dialog>




            </div>
                
            
        </div>
    )
}
