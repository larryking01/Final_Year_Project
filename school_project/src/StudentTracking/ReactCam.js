import React, { Fragment, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Camera } from 'react-cam';








export default function ReactCam() {

    function capture(imgSrc) {
        console.log(imgSrc);
      }
      
    const cam = useRef(null);
  return (
    <Fragment>
      <Camera
        showFocus={true}
        front={false}
        capture={capture}
        ref={cam}
        width="80%"
        height="auto"
        focusWidth="80%"
        focusHeight="60%"
        btnColor="white"
      />
      <button onClick={img => cam.current.capture(img)}>Take image</button>
    </Fragment>
  );
}
