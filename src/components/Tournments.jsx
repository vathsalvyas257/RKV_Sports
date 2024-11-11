import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Tournaments() {
  const user = "admin"; // Set the user role
  const handleEventUpdate = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  // Add deleteEvent function
  const handleEventDelete = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
  };

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Soccer Tournament",
      date: "2023-11-12",
      description: "Annual soccer tournament for all skill levels.",
      imgUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      sport: "Soccer"
    },
    {
      id: 2,
      title: "Basketball Match",
      date: "2023-11-15",
      description: "Friendly match between senior and junior teams.",
      imgUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      sport: "Basketball"
    },
    {
      id: 3,
      title: "Cricket Finals",
      date: "2023-11-20",
      description: "Cricket finals between top two teams of the season.",
      imgUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      sport: "Cricket"
    },
    {
      id: 4,
      title: "Badminton Open",
      date: "2023-11-25",
      description: "Open badminton tournament for doubles.",
      imgUrl: "https://images.unsplash.com/photo-1534438327276-c2b7d84b14a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      sport: "Badminton"
    },
    {
      id: 4,
      title: "Cricket Finals",
      date: "2023-11-20",
      description: "Cricket finals between top two teams of the season.",
      imgUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      sport: "hockey"
    },
    {
      id: 5,
      title: "Cricket Finals",
      date: "2023-11-20",
      description: "Cricket finals between top two teams of the season.",
      imgUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      sport: "kabaddi"
    },
    {
      id: 6,
      title: "Cricket Finals",
      date: "2023-11-20",
      description: "Cricket finals between top two teams of the season.",
      imgUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      sport: "kabaddi"
    }
  ]);

  const sports = ["Cricket", "hockey", "Basketball", "Badminton","kabaddi"];
  const scrollAmount = 300;
  const scrollRefs = useRef([]);
  const [isScrollable, setIsScrollable] = useState([]);

  useEffect(() => {
    setIsScrollable(sports.map((_, index) => {
      const ref = scrollRefs.current[index];
      return ref && ref.scrollWidth > ref.clientWidth;
    }));
  }, [events]);

  const scrollLeft = (index) => {
    scrollRefs.current[index].scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollRight = (index) => {
    scrollRefs.current[index].scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-5'>Upcoming Tournaments</h2>
      {sports.map((sport, index) => (
        <div key={index} className="mb-5">
          <h3>{sport}</h3>
          <div className="position-relative">
            {isScrollable[index] && (
              <button
                className="btn btn-light position-absolute start-0 top-50 translate-middle-y"
                onClick={() => scrollLeft(index)}
                style={{ zIndex: 1, padding: "0.5rem", borderRadius: "50%", marginRight: "10px" }}
              >
                <FaChevronLeft />
              </button>
            )}

            <div
              className="d-flex overflow-hidden"
              ref={(el) => (scrollRefs.current[index] = el)}
              style={{ gap: "20px", paddingBottom: "10px" }}
            >
              {events
                .filter(event => event.sport === sport)
                .map(event => (
                  <div className="col-md-4 flex-shrink-0" key={event.id} style={{ width: '300px' }}>
                    <Card event={event} sport={sport} user={user} onUpdate={handleEventUpdate} onDelete={handleEventDelete} />
                  </div>
                ))}
            </div>

            {isScrollable[index] && (
              <button
                className="btn btn-light position-absolute end-0 top-50 translate-middle-y"
                onClick={() => scrollRight(index)}
                style={{ zIndex: 1, padding: "0.5rem", borderRadius: "50%", marginLeft: "10px" }}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
