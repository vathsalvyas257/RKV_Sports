import React, { useState } from 'react'
import Card from './Card'
export default function Tournments() {
  const [events,setEvents]=useState([
    {
      id: 1,
      title: "Soccer Tournament",
      date: "2023-11-12",
      description: "Annual soccer tournament for all skill levels.",
      imgUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      id: 2,
      title: "Basketball Match",
      date: "2023-11-15",
      description: "Friendly match between senior and junior teams.",
      imgUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      id: 3,
      title: "Cricket Finals",
      date: "2023-11-20",
      description: "Cricket finals between top two teams of the season.",
      imgUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      id: 4,
      title: "Badminton Open",
      date: "2023-11-25",
      description: "Open badminton tournament for doubles.",
      imgUrl: "https://images.unsplash.com/photo-1534438327276-c2b7d84b14a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    }
  ])
  const handleRegister=()=>{
    
  }
  return (
    <div className='container my-2'>
      <h2 className='text-center my-3'>Upcoming Tournaments</h2>
      <div className="row">
        {/* Render events using the Card component */}
        {events.map(event => (
          <div className="col-md-4">
          <Card key={event.id} event={event} />
          </div>
          
        ))}

      </div>
    </div>
  )
}
