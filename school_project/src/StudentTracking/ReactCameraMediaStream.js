import React from 'react'
import { RCamera } from  'react-camera-media-stream'
import  'react-camera-media-stream/dist/index.css'

import { projectStorage } from '../firebaseSetup/firebaseConfig'



export default function ReactCameraMediaStream() {

    var metadata = {
        contentType: 'image/jpeg',
      };



    return (
        <div>
            <RCamera
  //model={('./images/model.png')}
  isConfirm={true}
  onTakePicture={(data) => {
      console.log(data)
    projectStorage.ref('Pictures Taken From Device').put( data, 'data_url' )
        .then((snapshot) => {
            console.log(`picture uploaded`)
        })
        .catch(error => {
            console.log(`failed to upload picture due to ${ error }`)
        })
  }}
//onClose={() =>  setTest(false)}
  isFullscreen={false}
  namePicture="test"
  isTorch={true}
/>
            
        </div>
    )
}
