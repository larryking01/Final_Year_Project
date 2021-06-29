import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextFIeld'
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Typography from '@material-ui/core/Typography'

// for styling
import { makeStyles } from '@material-ui/styles'

// for styling.
import './css/Login.css'
import waveImage from './assets/undraw.png'
import profileImage from './assets/profile.png'



// setting up styling
const useStyles = makeStyles( theme => ({
    parentContainer: {
        height: '400px',
        width: '360px',
        position: 'relative',
        top: '110px',
        left: '500px'
    },
    signInForm: {
        textAlign: 'center'
    },
    emailTextField: {
        /*position: 'relative',
        top: '30px', */
        width: '350px'
    },
    passwordTextField:{
        position: 'relative',
        top: '30px', 
        width: '350px'
    },
    signInButtonDiv: {
        position: 'relative',
        top: '110px'
    },
    signInButton: {
        backgroundColor: '#01579b',
        width: '250px',
        color: 'white',
        height: '35px',
        border: 'none',
        cursor: 'pointer'
    },
    signUpLink: {
        position: 'relative',
        top: '105px',
        left: '100px'
    },
    typographyText: {
        position: 'relative',
        top: '130px',
        right: '40px'
    },
    headerText: {
        position: 'relative',
        top: '20px',
        color: '#01579b',
        fontSize: '18px'
    },
    emailErrorSpan: {
        position: 'relative',
        top: '10px',
        fontSize: '13px',
        color: 'red'
    },
    passwordErrorSpan: {
        position: 'relative',
        top: '70px',
        fontSize: '13px',
        color: 'red'
    }

})
)







export default function StudentComplaintLogin( props ) {

    // destructuring all the props.
    const { 
        signInEmail, 
        setSignInEmail, 
        signInPassword, 
        setSignInPassword, 
        handleLogin, 
        emailError, 
        passwordError,
        user ,
        clearErrors
    } = props



    // for styling.
    const classes = useStyles()

    // for routing
    const router = useHistory()


    // Showing and hiding the password
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword)
    }


    // handling form submission
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        handleLogin()
        if( user ) {
            router.push('/studentlandingpage')
        } else {
            router.push('/login')
        }
    }









    return (
        <div>
            <img className="wave" src={ waveImage } />
            <div className="container">
                 <div className="login-container">
                     <form onSubmit={ handleFormSubmit }>
                        <img className="avatar" src={ profileImage } />
                        <h2>Welcome</h2>

                      

                        <div> 
                           <TextField variant='outlined'
                           type='email'
                           required={ true }
                           label='Email'
                           onChange={ (event) => {
                               setSignInEmail( event.target.value )
                               clearErrors()
                           } }
                           value={ signInEmail } 
                           className={ classes.emailTextField }
                           //error={ emailError ? true : false }
                           //helperText={ emailError } 
                        />

                        { emailError && <div className={classes.emailErrorSpan}> { emailError } </div> }

                        </div>


            
                    <div>
                        <TextField variant='outlined'
                                   label='Password'
                                   className={ classes.passwordTextField }
                           type={ showPassword ? "text" : "password"}
                           required={ true }
                           label='Password'
                           onChange={ (event) => {
                               setSignInPassword(event.target.value)
                               clearErrors() 
                             }}
                           value={ signInPassword }
                           className={ classes.passwordTextField }
                           //error={ passwordError ? true : false }
                           //helperText={ passwordError }
                           InputProps={{ 
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={ handleClickShowPassword }
                                  onMouseDown={ handleMouseDownPassword }
                                >
                                  { showPassword ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                           
                        />
                            { passwordError && <div className={classes.passwordErrorSpan}> { passwordError } </div> }

                      </div>


                   <div style={{position: 'relative', top: '80px'}}>
			        <button className='login-btn'
	                        type="submit" >
                                    Log in
                    </button> 

                    <div>
                    <Typography >
                        Don't have an account? 
                    </Typography>

                    <Link to='/signup'   >
                              Register now
                    </Link>
                      </div>

                      </div>




                     </form>



                </div>




            </div>


        </div>
    )
}
