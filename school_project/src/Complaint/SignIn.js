import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextFIeld'
import Button from '@material-ui/core/Button'
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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
    signInForm: {
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
    signInButtonDiv: {
        position: 'relative',
        top: '140px'
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
        color: '#01579b',
        fontSize: '18px'
    }


})
)




export default function SignIn(props) {

    // destructuring all the props.
    const { 
            signInEmail, 
            setSignInEmail, 
            signInPassword, 
            setSignInPassword, 
            handleLogin, 
            handleSignUp, 
            hasAccount, 
            person, 
            setHasAccount, 
            emailError, 
            passwordError,
            user } = props


    // initializing styling.
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
            router.push('/submitcomplaint')
        } else {
            router.push('/signin')
        }
    }
    

    return (
        <div className={ classes.parentContainer }>
            <form className={ classes.signInForm } onSubmit={ handleFormSubmit } >

                <Typography className={ classes.headerText }>
                    Sign In
                </Typography>


                <TextField variant='outlined'
                           type='email'
                           required={ true }
                           label='Email'
                           onChange={ (event) => setSignInEmail(event.target.value) }
                           value={ signInEmail }
                           className={ classes.emailTextField }
                           error={ false }
                           //helperText='Enter a valid email address'
                />

                <TextField variant='outlined'
                           type={ showPassword ? "text" : "password"}
                           required={ true }
                           label='Password'
                           onChange={ (event) => setSignInPassword(event.target.value) }
                           value={ signInPassword }
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


                <div className={ classes.signInButtonDiv }>
                    <button type='submit' className={ classes.signInButton } >
                            Sign In
                     </button>
                </div>

                <div>
                    <Typography className={ classes.typographyText }>
                        Don't have an account? 
                    </Typography>

                    <Link to='/signup' className={ classes.signUpLink }  >
                              Register now
                    </Link>
                </div>



            </form>

        </div>
    )
}
