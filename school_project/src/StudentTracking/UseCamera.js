import React from "react";
import useCamera from "use-camera";






const size = { width: window.innerWidth, height: window.innerHeight };

export default function UseCamera () {
  const ref = useCamera();
  return <video ref={ref} autoPlay width={size.width} height={size.height} />;
};