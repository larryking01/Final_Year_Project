import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Typography from '@material-ui/core/Typography'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

// for styling.
import { makeStyles } from '@material-ui/core/styles'
import './complaintFormBtns.css'



const useStyles = makeStyles( theme => ({
    submitComplaintForm: {
        width:'790px',
        height: '500px',
        position: 'relative',
        top: '30px',
        left: '180px',
        boxShadow: '2px 2px 8px',
        borderRadius: '3%',
        textAlign: 'center'
    },
    fullNameAndIndexNumberDiv: {
        position: 'relative',
        top: '20px'
    },
    fullNameTextField: {
        width: '240px',
        position: 'relative',
        right: '80px'
    },
    indexNumberTextField: {
        width: '180px',
        position: 'relative',
        left: '30px'
    },
    roomNumberAndMobileNumberDiv: {
        position: 'relative',
        top: '40px'
    },
    roomNumberTextField: {
        width: '240px',
        position: 'relative',
        right: '80px'
    },
    mobileNumberTextField: {
        width: '180px',
        position: 'relative',
        left: '30px'
    },
    complaintType: {
        position: 'relative',
        top: '60px',
        left: '105px'
    },
    specifyOtherComplaintTypeTextField: {
        width: '240px',
        position: 'relative',
        bottom: '47px',
        left: '74px'
    },
    complaintDescription: {
        position: 'relative',
        top: '110px',
        right: '20px'
    },
    secondaryComplaintDescription: {
        position: 'relative',
        top: '60px',
        right: '5px'
    },
    complaintDescriptionTextarea: {
        width: '530px'
    },
    secondaryComplaintDescriptionTextarea : {
        width: '570px'
    },
    dateAndTimePickerDiv: {
        position: 'relative',
        top: '120px'
    },
    datePicker: {
        position: 'relative',
        right: '110px'
    },
    timePicker: {
        position: 'relative',
        left: '78px'
    },
    formButtonsDiv: {
        position: 'relative',
        top: '140px'
    },
    secondaryDateAndTimePickerDiv: {
        position: 'relative',
        top: '60px'
    },
    secondaryFormButtonsDiv: {
        position: 'relative',
        top: '90px'
    }

}))





export default function SubmitComplaint() {

    // initializing styling
    const classes = useStyles()


    // handling state.
    const [ specifyOtherComplaintType, setSpecifyOtherComplaintType ] = useState(false)

    // the autocomplete.
    const [ complaintType, setComplaintType ] = useState('Electrical')
    const [ complaintTypeInputValue, setComplaintTypeInputValue ] = useState('')

    // state for date and time
    const [ selectedDateAndTime, setSelectedDateAndTime ] = useState(new Date());


    // specifying the possible types of complaints
    let complaintTypesArray = [
        { complaintType: 'Electrical' },
        { complaintType: 'Carpentry' },
        { complaintType: 'Plumbing' },
        { complaintType: 'Other' }
    ]



    // useEffect to determine if Other is selected as complaint type.
    useEffect(() => {
        if( complaintTypeInputValue === 'Other'){
            setSpecifyOtherComplaintType(true)
            //console.log( specifyOtherComplaintType )
        } else {
            setSpecifyOtherComplaintType(false)
        }
    }, [ complaintTypeInputValue ]) 





    return (
        <div className={ classes.submitComplaintForm }>
            <form>
                <MuiPickersUtilsProvider utils={ DateFnsUtils }>

               
                 <Typography variant='h6'>
                        Submit Complaint
                 </Typography>

                 <div className={ classes.fullNameAndIndexNumberDiv}>
                        <TextField
                            variant='standard'
                            label='Student Full Name'
                            required={ true }
                            className={ classes.fullNameTextField }
                            

                        />

                        <TextField
                            variant='standard'
                            label='Student Index Number'
                            required={ true }
                            className={ classes.indexNumberTextField }

                        />

                 </div>

                 <div className={ classes.roomNumberAndMobileNumberDiv }>
                       <TextField
                            variant='standard'
                            label='Room Number'
                            required={ true }
                            className={ classes.roomNumberTextField }

                        />

                        <TextField
                            variant='standard'
                            label='Mobile Number'
                            required={ true }
                            className={ classes.mobileNumberTextField }

                        />


                 </div>


                 <div className={ classes.complaintType }>
                        <Autocomplete 
                            id='complaint type autocomplete'
                            options={ complaintTypesArray }
                            getOptionLabel={ (option) => option.complaintType }
                            renderInput={ (params) => (
                                <TextField {...params} required={true} label='Complaint Type' variant='standard' />
                            )}
                            style={{ width: 200 }}
                            className={ classes.complaintTypeAutocomplete }
                            size='small'
                            onChange={( event, newComplaint ) => {
                                setComplaintType(newComplaint)
                                console.log('value = ', complaintType )
                            }}
                            value={ complaintType }
                            onInputChange={( event, newInputValue ) => {
                                setComplaintTypeInputValue(newInputValue)
                                console.log('input change = ', complaintTypeInputValue)
                            }}
                            inputValue={ complaintTypeInputValue }
                        />


                        { specifyOtherComplaintType && <TextField
                                                         variant='standard'
                                                         label='Please specify complaint type'
                                                         required={ true }
                                                         className={ classes.specifyOtherComplaintTypeTextField }   
                                                /> 
                        }
                 </div>


                 <div className={ specifyOtherComplaintType? classes.secondaryComplaintDescription : classes.complaintDescription }>
                     <TextareaAutosize className={ specifyOtherComplaintType? classes.secondaryComplaintDescriptionTextarea : classes.complaintDescriptionTextarea }
                                       required={ true }
                                       placeholder='Complaint Description'
                                       rowsMin={ 3 }
                                       onChange={(event) => console.log(event.target.value)}
                     />
                 </div>


                 <div className={ specifyOtherComplaintType? classes.secondaryDateAndTimePickerDiv : classes.dateAndTimePickerDiv }>
                    <DatePicker 
                                disableToolbar
                                variant="inline"
                                required={ true }
                                format="MM / dd / yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select Date"
                                //value={ selectedDateAndTime }
                                //onChange={ updateDateAndTime }
                                className={ classes.datePicker }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }} /> 

                            <TimePicker 
                                margin="normal"
                                id="time-picker"
                                label="Pick Time"
                                required={ true }
                                //value={ selectedDateAndTime }
                                //onChange={ updateDateAndTime }
                                className={ classes.timePicker }
                                KeyboardButtonProps={{
                                  'aria-label': 'change time',
                                }}
                    
                              /> 
            
                </div>


                <div className={ specifyOtherComplaintType? classes.secondaryFormButtonsDiv : classes.formButtonsDiv}>
                <button type='submit' className='submitComplaintButton' > Submit Complaint </button>

                <button type='button' className='cancelButton'> Cancel </button>

                </div>
















                </MuiPickersUtilsProvider>
            </form>
            
            
        </div>
    )
}
