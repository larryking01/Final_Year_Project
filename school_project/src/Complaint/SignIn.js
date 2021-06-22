import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextFIeld'
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
        top: '110px',
        left: '500px',
        borderRadius: '5%',
        boxShadow: '2px 2px 8px' 
    },
    signInForm: {
        textAlign: 'center'
    },
    emailTextField: {
        position: 'relative',
        top: '30px',
        width: '250px'
    },
    passwordTextField:{
        position: 'relative',
        top: '65px',
        width: '250px'
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
        top: '40px',
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




export default function SignIn(props) {


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
            router.push('/studentlandingpage')
        } else {
            router.push('/signin')
        }
    }
    


    return (
        <div className={ classes.parentContainer } >
            <form className={ classes.signInForm } onSubmit={ handleFormSubmit } >

                <Typography className={ classes.headerText }>
                    Sign In
                </Typography>


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


                <TextField variant='outlined'
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
