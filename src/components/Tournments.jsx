import React from 'react'

export default function Tournments() {
  const handleRegister=()=>{
    
  }
  return (
    <div className='container'>
      <div>
        <h2>cricket</h2>
        <p>the new cricket tournment is live register now.....</p>
        <button class="btn btn-primary" type="submit" onSubmit={handleRegister}>register</button>
      </div>
    </div>
  )
}
