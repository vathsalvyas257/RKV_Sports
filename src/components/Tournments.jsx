import React, { useState, useRef } from 'react';
import Card from './Card';
// Import FontAwesome icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Tournaments() {
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
    },
    {
      id: 5,
      title: "Basketball Match",
      date: "2023-11-15",
      description: "Friendly match between senior and junior teams.",
      imgUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    }
  ]);

  const sports = ["Cricket", "Hockey", "Basketball", "Kabaddi", "Badminton"];
  const scrollAmount = 300; // Adjust the scroll amount as needed
  const scrollRefs = useRef([]);

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
            {/* Left Scroll Button */}
            <button
              className="btn btn-light position-absolute start-0 top-50 translate-middle-y"
              onClick={() => scrollLeft(index)}
              style={{ zIndex: 1 }}
            >
              <FaChevronLeft />
            </button>

            {/* Tournaments Row */}
            <div
              className="d-flex overflow-hidden"
              ref={(el) => (scrollRefs.current[index] = el)}
              style={{ gap: "20px", paddingBottom: "10px" }}
            >
              {events.map(event => (
                <div className="col-md-4 flex-shrink-0" key={event.id} style={{ width: '300px' }}>
                  <Card event={event} sport={sport}/>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              className="btn btn-light position-absolute end-0 top-50 translate-middle-y"
              onClick={() => scrollRight(index)}
              style={{ zIndex: 1 }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
