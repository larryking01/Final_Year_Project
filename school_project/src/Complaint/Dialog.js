import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogCOntentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import PersonIcon from '@material-ui/icons/Person'
import Avatar from '@material-ui/core/Avatar'





export default function () {

    const [ open, setOpen ] = useState( false )

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };




    return (
        <div>
            Dialog here
            <Dialog open={open} onClose={ handleClose } >

                <DialogTitle style={{ backgroundColor: 'blue', color: 'white'}} > 
                         {"Use Google's location service?"} 
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>

                    <Box>
                        <img src='https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' style={{ width: '500px'}}  /> 
                    </Box>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary" style={{ backgroundColor: 'pink'}}>
                                  Disagree
                    </Button>
                   <Button onClick={handleClose} color="primary" autoFocus>
                                  Agree
                    </Button>
                </DialogActions>

            </Dialog>

            <Button variant='contained' color='primary' onClick={ handleClickOpen }>
                Open Dialog
            </Button>
            
        </div>
    )
}
