import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './App.css'
import { firebaseAuthentication } from './firebaseSetup/firebaseConfig'



import SelectUser from './SelectUserType/SelectUser'
import SelectUserWithButtons from './SelectUserType/SelectUserWithButtons'
import StaffLogin from './StudentTracking/StaffLogin'
import StudentLogin from './Complaint/StudentLogin'
import StudentSignUp from './Complaint/StudentSignUp'
import SubmitComplaint from './Complaint/SubmitComplaint'
import MainPage from './StudentTracking/MainPage'
import AddNewStudent from './StudentTracking/AddNewStudent'
import NewVisitor from './StudentTracking/NewVisitor'
import ManageVisitors from './StudentTracking/ManageVisitors'
import ViewAllComplaints from './StudentTracking/ViewAllComplaints'
import SignUp from './Complaint/SignUp'
import SignIn from './Complaint/SignIn'
import StudentComplaintHistory from './Complaint/StudentComplaintHistory'

import ReactCameraMediaStream from './StudentTracking/ReactCameraMediaStream'




function App() {

  // handling authentication.
  // handling state.
  const [ user, setUser ] = useState(null)
  const [ person, setPerson ] = useState('')
  const [ signInEmail, setSignInEmail ] = useState('')
  const [ signUpEmail, setSignUpEmail ] = useState('') 
  const [ signInPassword, setSignInPassword ] = useState('')
  const [ signUpPassword, setSignUpPassword ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ passwordError, setPasswordError ] = useState('')
  const [ hasAccount, setHasAccount ] = useState( false )


  // clearing inputs.
  const clearInputs = () => {
    setSignInEmail('')
    setSignInPassword('')
    setSignUpEmail('')
    setSignUpPassword('')
  }


  // clearing errors.
  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }
  


  // handling login.
  const handleLogin = () => {
    clearErrors()
    firebaseAuthentication.signInWithEmailAndPassword( signInEmail, signInPassword )
    .then( userCredentials => {
      setPerson( userCredentials.user )
      alert('login successful')
    })
    .catch( error => {
      switch( error.code ) {
        case 'auth/invalid-email':
          setEmailError('Invalid Email. Please enter a valid email address to continue')
          console.log( error.message )
          break
        case 'auth/user-not-found':
          setEmailError('User does not exist. Please check your credentials and try again')
          console.log( error.message )
          break
        case 'auth/user-disabled':
          setEmailError( error.message )
          break
        case 'auth/email-already-exists':
          setEmailError('The provided email is already in use by an existing user. Each user must have a unique email')
          console.log( error.message )
          break
        case 'auth/wrong-password':
          setPasswordError('Wrong password')
          console.log( passwordError )
          break
        case 'auth/invalid-password' :
          setPasswordError('Invalid Password. Password should be a string of at least 6 characters')
          break
      }
    })

  }



  // handling sign up.
  const handleSignUp = () => {
    clearErrors()
    console.log(`email = ${signUpEmail}`)
    firebaseAuthentication.createUserWithEmailAndPassword( signUpEmail, signUpPassword )
    .then( userCredentials => {
      setPerson( userCredentials.user )
      alert('handle sign up')
      console.log(`person = ${person}`)
      clearInputs()
    }) 
    .catch( error => {
      switch( error.code ) {
        case 'auth/invalid-email':
        case 'auth/email-already-in-use':
          setEmailError( error.message )
          console.log( emailError )
          break
        case 'auth/weak-password':
          setPasswordError( error.message )
          console.log( passwordError )
          break
      }
    })

  }


  // handling log out.
  const handleLogOut = () => {
    firebaseAuthentication.signOut()
    console.log('executing signout')
    console.log(`user = ${ user }`)
  }


  // handling authentication listener.
  const handleAuthenticationListener = () => {
    firebaseAuthentication.onAuthStateChanged( user => {
      if( user ) {
        clearInputs()
        setUser( user )
        console.log( 'user = ', user) 
      }
      else {
        setUser(null)
      }
    })
  }


  // the useEffect to listen.
  useEffect(()=> {
    handleAuthenticationListener()
    
  }, [])

  






  return (
    <div className="App">
        <BrowserRouter> 
            <Switch>
                <Route exact path='/' component={ SelectUserWithButtons } />
                <Route exact path='/stafflogin' component={ StaffLogin } />
                <Route exact path='/studentsignup' component={ StudentSignUp } />
                <Route exact path='/studentLogin' component={ StudentLogin } />
                <Route exact path='/viewallstudents' component={ MainPage } />
                <Route exact path='/addnewstudent' component={ AddNewStudent } />
                <Route exact path='/newvisitor' component={ NewVisitor } />
                <Route exact path='/managevisitors' component={ ManageVisitors } />
                <Route exact path='/signup' >
                      <SignUp 
                            signImail={signInEmail} 
                            setSignInEmail={setSignInEmail}
                            signUpEmail={signUpEmail}
                            setSignUpEmail={setSignUpEmail}
                            signInpassword={signInPassword}
                            signUpPassword={signUpPassword}
                            setSignUpPassword={setSignUpPassword}
                            handleLogin={handleLogin}
                            handleSignUp={handleSignUp}
                            hasAccount={hasAccount}
                            person={person} 
                            setHasAccount={setHasAccount}
                            emailError={emailError}
                            passwordError={passwordError}
                       />
                </Route> 
                
                <Route exact path='/signin' >
                       <SignIn 
                            signImail={signInEmail} 
                            setSignInEmail={setSignInEmail}
                            signUpEmail={signUpEmail}
                            setSignUpEmail={setSignUpEmail}
                            signInpassword={signInPassword}
                            signUpPassword={signUpPassword}
                            setSignUpPassword={setSignUpPassword}
                            setSignInPassword={setSignInPassword}
                            handleLogin={handleLogin}
                            handleSignUp={handleSignUp}
                            hasAccount={hasAccount}
                            person={person} 
                            setHasAccount={setHasAccount}
                            emailError={emailError}
                            passwordError={passwordError} 
                            user={user}
                            clearErrors={clearErrors}
                       />

                </Route>
                  
                <Route exact path='/submitcomplaint'> 
                      <SubmitComplaint handleLogout={ handleLogOut } user={ user } />
                </Route>

                <Route exact path='/studentcomplainthistory'>
                      <StudentComplaintHistory handleLogout={ handleLogOut } user={ user } />
                </Route>

                <Route exact path='/viewallcomplaints' component={ ViewAllComplaints } />

                <Route exact path='/devicepicture' component={ ReactCameraMediaStream } />

                <Route exact path='/nssaccomodationfinder' render={() => (window.location = "http://nss-accom.herokuapp.com/")} />

                <Route path='*' render={() => <h2> Sorry, page not found </h2>} />


            </Switch>

        </BrowserRouter>
    </div>
  );
}

export default App;
