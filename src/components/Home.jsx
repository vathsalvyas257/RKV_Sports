import React, { useState } from 'react';
import Card from "./Card";
import ViewMore from "./ViewMore";
export default function Home() {
  const [events, setEvents] = useState([
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
  ]);

  return (
    <div className='container my-2'>
      <div className="row">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="1500"
          style={{ maxHeight: '500px' }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ height: '500px' }}>
              <img
                src="https://images.unsplash.com/photo-1721332153370-56d7cc352d63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                className="d-block w-100"
                alt="..."
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item" style={{ height: '500px' }}>
              <img
                src="https://images.unsplash.com/photo-1721332153370-56d7cc352d63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                className="d-block w-100"
                alt="..."
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item" style={{ height: '500px' }}>
              <img
                src="https://images.unsplash.com/photo-1728467459756-211f3c738697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                className="d-block w-100"
                alt="..."
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>      
      </div>
      <h2 className='my-3 text-center'>Upcoming Tournaments</h2>
      <div className="row">
        {/* Render events using the Card component */}
        <div className='d-flex my-3'>
        {events.slice(0,2).map(event => (
          <div className="col-md-4 m-1">
          <Card key={event.id} event={event} />
          </div>
          
        ))}
        <div className='col-md-4'>
        <ViewMore path="/tournments"></ViewMore>
        </div>
        </div>
        <div className="container">
        </div>
      </div>

      {/* news */}
      <h2 className='my-3 text-center'>Latest News</h2>
      <div className="row">
        {/* Render events using the Card component */}
        <div className='d-flex my-3'>
        {events.slice(0,2).map(event => (
          <div className="col-md-4 m-1">
          <Card key={event.id} event={event} />
          </div>
          
        ))}
        <div className='col-md-4'>
        <ViewMore path="/news"></ViewMore>
        </div>
        </div>
        <div className="container">
        </div>
        
      </div>
    </div>
  );
}
