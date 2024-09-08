import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Home = () => {
    const location = useLocation()

  return (
    <div className='HomePage'>
        <h1>Hello {location.state.id}, Welcome to Home</h1>
        
    </div>
  )
}

module.exports = Home
