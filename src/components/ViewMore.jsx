import React from 'react'
import { Link } from 'react-router-dom'

const ViewMore = (props) => {
  return (
    <div>
      <div className="card" style={{ minWidth: "18rem", minHeight: "22rem" }}> {/* Set height to 100% */}
        <div className="card-body d-flex flex-column justify-content-center align-items-center"> {/* Flex column for vertical alignment */}
          <Link to={props.path}>View More</Link>

        </div>
      </div>
    </div>
  )
}

export default ViewMore
