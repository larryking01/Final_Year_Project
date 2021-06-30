import React from 'react'

// static files.
import surpariseImage from './images/suparise-logo.png'
import illustrationSurparise from './images/illustration-suparise-helps-you.png'





export default function OpeningLandingPage() {

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a href="#" class="navbar-brand" href="#"><img class="logo" src={ surpariseImage }/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
               <li class="nav-item active">
                  <a class="nav-link" href="index.html">Home<span class="sr-only">(current)</span></a>
               </li>
               <li class="nav-item">
                    <a href="#" class="nav-link">Contact Us</a>
                </li>
            </ul>

           <form class="form-inline my-2 my-lg-0">
               <a id="btn" class="btn btn-outline-success my-2 my-sm-0" href="#">Student</a>
               <a id="btn" class="btn btn-outline-success my-2 my-sm-0" href="#">Staff</a>
            </form>
       </div>
        </nav>

         <div class="container">
              <div class="row">
               <div class="col-sm-6 banner-image">
                    <img src={illustrationSurparise} class="img-responsive"/>
                </div>
                <div id="note" class="col-sm-6 banner-info">
                    <h1>Welcome To</h1>
                    <p class="big-text">STUDENT TRACKING</p>
                     <p>COMPLAINT SUBMISSION and ACCOMODATION FINDER SYSTEM</p>
                     <a class="btn btn-first" href="Student.html">STUDENT</a>
                     <a class="btn btn-second" href="Staff.html">STAFF</a>
                </div>
            </div>
        </div>

            
        </div>
       
    )
}
