import React from "react"

export const inputStyling = (width : string,visibility : any) => {
  const styles :React.CSSProperties =  {
    width : width,
    transition:"0.6s", 
    visibility:visibility,
    padding : "5px",
    borderRadius:"5px",
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor : "#3b5998",
    color : "white"
  }
  return styles
}