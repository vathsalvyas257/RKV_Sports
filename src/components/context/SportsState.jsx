import SportsContext from "./SportsContext";
import React from 'react'

const SportsState = (props) => {
  return (
    <SportsContext.Provider value={{add}}>
      {props.children}
    </SportsContext.Provider>
  )
}

export default SportsState
