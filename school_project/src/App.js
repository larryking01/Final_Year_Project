import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './App.css'

import SelectUser from './SelectUserType/SelectUser'
import StaffLogin from './StudentTracking/StaffLogin'
import StudentLogin from './Complaint/StudentLogin'
import StudentSignUp from './Complaint/StudentSignUp'
import MainPage from './StudentTracking/MainPage'
import AddNewStudent from './StudentTracking/AddNewStudent'
import EditStudentDetails from './StudentTracking/EditStudentDetails'
import DeleteStudent from './StudentTracking/DeleteStudent'



function App() {
  return (
    <div className="App">
        <BrowserRouter> 
            <Switch>
                <Route exact path='/' component={SelectUser} />
                <Route exact path='/stafflogin' component={StaffLogin} />
                <Route exact path='/studentsignup' component={StudentSignUp} />
                <Route exact path='/studentLogin' component={StudentLogin} />
                <Route exact path='/viewallstudents' component={MainPage} />
                <Route exact path='/addnewstudent' component={AddNewStudent} />
                <Route exact path='/editstudentdetails' component={EditStudentDetails} />
                <Route exact path='/deletestudent' component={DeleteStudent} />
                <Route path='*' render={() => <h2> Sorry, page not found </h2>} />
            </Switch>

        </BrowserRouter>
    </div>
  );
}

export default App;
