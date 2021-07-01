import React from 'react'
import { useHistory } from 'react-router-dom'

import './css/style.css'
import bubble from './assets/bubble.png'




export default function StartUpLandingPage() {

    // setting up routing.
    const router = useHistory()


    // handle student button clicked.
    const handleStudentButtonClicked = () => {
        router.push('/studentsignin')
    }


    
    // handle staff button clicked.
    const handleStaffButtonClicked = () => {
        router.push('/stafflogin')
    }



    // handle NSS btn clicked.
    const handleNSSAccomBtnClicked = ( ) => {
        router.push('/nssaccomodationfinder')
    }


    return (

        <div className='parentContainer' >

            <div className="content">
	            <small>Welcome to the </small>
	            <h1>Student Tracking,</h1> 
                <h1>Complaint Submission And</h1> 
                <h1>NSS Accommodation Finder</h1> <br/>



	            <ul className="btn">
                  <li style={{padding: '10px', listStyle: 'none'}} className="nav-item">
         	        <button type="button" onClick={ handleStudentButtonClicked }> Sign in as a student</button>
                 </li>

                 <li style={{padding: '10px', liststyle: 'none'}} className="nav-item">
                	<button type="button" onClick={ handleStaffButtonClicked }> Sign in as a staff </button>
                </li>

                <li style={{padding: '10px', liststyle: 'none'}} className="nav-item">
                	<button type="button" onClick={ handleNSSAccomBtnClicked }> Access NSS accommodation   </button>
                </li>

                </ul>

            </div>


            <div className="bubbles">
	            <img src={ bubble } alt='image'/>
	            <img src={ bubble } alt='image'/>
	            <img src={ bubble } alt='image'/>
	            <img src={ bubble } alt='image'/>
	            <img src={ bubble } alt='image'/>
	            <img src={ bubble } alt='image'/>
	            <img src={ bubble } alt='image'/>
	            <img src={ bubble } alt='image'/>
            </div>








        </div>
    )
}
