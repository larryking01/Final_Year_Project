import React, { Component, useState } from 'react'

import Webcam from "react-webcam"

import { projectStorage } from '../firebaseSetup/firebaseConfig'



const WebcamComponent = () => <Webcam />


const videoConstraints = {
    width: 260,
    height: 200,
    facingMode: "user"
  }



export default function WebcamCapture () {

    const webcamRef = React.useRef(null)

    const [src,setSrc]=useState('')

    var metadata = {
        contentType: 'image/jpeg',
      };
      


    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot()

        setSrc(imageSrc)
        console.log( ` image source = ${imageSrc}`)
        projectStorage.ref('Pictures Taken From Device').put( src, metadata )
        .then((snapshot) => {
            console.log(`picture uploaded`)
        })
        .catch(error => {
            console.log(`failed to upload picture due to ${ error }`)
        })

      },
  
      [webcamRef]
    )


  
    return (
      <>
        {
            src=='' ? <div> 
                        <Webcam audio={false} 
                                height={200} 
                                ref={webcamRef} 
                                screenshotFormat="image/jpeg" 
                                width={260} 
                                videoConstraints={videoConstraints}/>
                         <button 
                            onClick={(event) => {
                                event.preventDefault()
                                capture()
                            }}>
                            Capture
                         </button>  
                        </div> : 
                        <img src={src} /> 

        }

       
      </>
    );
  }