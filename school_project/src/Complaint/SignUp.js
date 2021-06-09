import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextFIeld'
import { InputAdornment, IconButton } from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Typography from '@material-ui/core/Typography'


// for styling
import { makeStyles } from '@material-ui/styles'

// setting up styling
const useStyles = makeStyles( theme => ({
    parentContainer: {
        height: '400px',
        width: '360px',
        position: 'relative',
        top: '80px',
        left: '370px',
        borderRadius: '5%',
        boxShadow: '2px 2px 8px'
    },
    signUpForm: {
        textAlign: 'center'
    },
    emailTextField: {
        position: 'relative',
        top: '60px',
        width: '250px'
    },
    passwordTextField:{
        position: 'relative',
        top: '100px',
        width: '250px'
    },
    signUpButtonDiv: {
        position: 'relative',
        top: '140px'
    },
    signUpButton: {
        backgroundColor: 'green',
        width: '250px',
        color: 'white',
        height: '35px',
        border: 'none',
        cursor: 'pointer'
    },
    loginLink: {
        position: 'relative',
        top: '145px',
        left: '100px'
    },
    typographyText: {
        position: 'relative',
        top: '170px',
        right: '40px'
    },
    headerText: {
        position: 'relative',
        top: '20px',
        color: 'green',
        fontSize: '18px'
    }


})
)




export default function SignUp(props) {

    // destructuring all the props.
    const { 
        signUpEmail, 
        setSignUpEmail, 
        signUpPassword, 
        setSignUpPassword, 
        handleLogin, 
        handleSignUp, 
        hasAccount, 
        person, 
        setHasAccount, 
        emailError, 
        passwordError } = props


    // initializing styling.
    const classes = useStyles()

    // initializing routing
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
        handleSignUp()
    }


    

    return (
        <div className={ classes.parentContainer }>
            <form className={ classes.signUpForm } onSubmit={ handleFormSubmit } >
            <Typography className={ classes.headerText }>
                    Sign Up
                </Typography>


                <TextField variant='outlined'
                           type='email'
                           required={ true }
                           label='Email'
                           onChange={ (event) => setSignUpEmail(event.target.value) }
                           value={ signUpEmail }
                           className={ classes.emailTextField }
                           error={ false }
                           //helperText='Enter a valid email address'
                />

                <TextField variant='outlined'
                           type={ showPassword ? "text" : "password"}
                           required={ true }
                           label='Password'
                           onChange={ (event) => setSignUpPassword(event.target.value) }
                           value={ signUpPassword }
                           className={ classes.passwordTextField }
                           error={ false }
                           //helperText='Enter a valid email address'
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


                <div className={ classes.signUpButtonDiv }>
                    <button type='submit' className={ classes.signUpButton } > 
                            Sign Up
                     </button>
                </div>

                <div>
                    <Typography className={ classes.typographyText }>
                        Already have an account? 
                    </Typography>

                    <Link to='/signin' className={ classes.loginLink }  >
                              Login here
                    </Link>
                </div>
                
            </form>

        </div>
    )
}
