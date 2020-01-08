import React from 'react'
import unlocked from './unlocked.png'; 

const ErrorPage = props => {

  return (
    <>
      <div className='errorPage__container'>
        <img style={{margin: `auto`, height: `90px`, width: `90px`}}src = {unlocked}></img>
        <div style={{position: `relative`, top: `-250px`}}>Error!</div>

      </div>
    </>
  )
}

export default ErrorPage